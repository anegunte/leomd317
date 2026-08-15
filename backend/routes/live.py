"""Low-overhead Server-Sent Events for live landing-page updates.

Each backend process opens one MongoDB change stream and fans messages out to
all of its connected browsers. Gunicorn's gevent workers then multiplex those
long-lived browser connections without dedicating a Python thread to each one.
"""

import json
from collections import deque
from datetime import datetime
from threading import Lock
from uuid import uuid4

from flask import Blueprint, Response, stream_with_context
from pymongo.errors import PyMongoError

from database import db

try:  # Production uses gevent; the standard queue keeps Flask development usable.
    from gevent import sleep, spawn
    from gevent.queue import Empty, Full, Queue

    _ASYNC_RUNTIME = True
except ImportError:  # pragma: no cover - used only outside the Docker runtime
    from queue import Empty, Full, Queue
    from threading import Thread
    from time import sleep

    _ASYNC_RUNTIME = False


live_bp = Blueprint("live", __name__)
updates_collection = db["live_updates"]
_KEEPALIVE_SECONDS = 20
_MAX_SUBSCRIBER_BACKLOG = 32


class LiveUpdateBroker:
    """Maintain one upstream watch and many lightweight browser subscribers."""

    def __init__(self) -> None:
        self._subscribers: set[Queue] = set()
        self._lock = Lock()
        self._started = False
        self._seen_ids: deque[str] = deque(maxlen=512)
        self._seen_lookup: set[str] = set()
        self._last_seen_at = datetime.utcnow()

    def ensure_started(self) -> None:
        with self._lock:
            if self._started:
                return
            self._started = True
            try:
                # Live signals are transient. Retaining one week provides
                # short outage tolerance without growing this collection
                # indefinitely in Atlas.
                updates_collection.create_index("createdAt", expireAfterSeconds=604800)
            except PyMongoError:
                pass
            if _ASYNC_RUNTIME:
                spawn(self._watch_forever)
            else:
                Thread(target=self._watch_forever, daemon=True).start()

    def subscribe(self) -> Queue:
        subscriber: Queue = Queue(maxsize=_MAX_SUBSCRIBER_BACKLOG)
        with self._lock:
            self._subscribers.add(subscriber)
        return subscriber

    def unsubscribe(self, subscriber: Queue) -> None:
        with self._lock:
            self._subscribers.discard(subscriber)

    def _remember(self, message_id: str) -> bool:
        """Return False for a message already delivered by this process."""
        with self._lock:
            if message_id in self._seen_lookup:
                return False
            if len(self._seen_ids) == self._seen_ids.maxlen:
                self._seen_lookup.discard(self._seen_ids[0])
            self._seen_ids.append(message_id)
            self._seen_lookup.add(message_id)
            return True

    def broadcast(self, message: dict) -> None:
        message_id = str(message.get("id") or "")
        if not message_id or not self._remember(message_id):
            return

        with self._lock:
            subscribers = list(self._subscribers)
        for subscriber in subscribers:
            try:
                subscriber.put_nowait(message)
            except Full:
                # A slow or disconnected browser does not block every other
                # visitor. The next EventSource reconnect gets current state
                # from the normal page APIs.
                pass

    def _deliver_document(self, document: dict) -> None:
        if document.get("_type") != "live_update":
            return
        created_at = document.get("createdAt")
        if isinstance(created_at, datetime):
            self._last_seen_at = max(self._last_seen_at, created_at)
        self.broadcast(
            {
                "id": str(document.get("id") or document.get("_id")),
                "event": document.get("event"),
                "payload": document.get("payload") or {},
            }
        )

    def _poll_once(self) -> None:
        """Development fallback for Mongo deployments without change streams."""
        documents = updates_collection.find(
            {"_type": "live_update", "createdAt": {"$gt": self._last_seen_at}}
        ).sort("createdAt", 1)
        for document in documents:
            self._deliver_document(document)

    def _watch_forever(self) -> None:
        while True:
            try:
                with updates_collection.watch(
                    [{"$match": {"operationType": "insert"}}],
                    max_await_time_ms=15_000,
                ) as stream:
                    while True:
                        change = stream.try_next()
                        if change:
                            self._deliver_document(change["fullDocument"])
            except PyMongoError:
                # Atlas supports change streams. A polling fallback preserves
                # live behavior in local standalone MongoDB development.
                try:
                    self._poll_once()
                except PyMongoError:
                    pass
                sleep(1)


broker = LiveUpdateBroker()


def publish_live_event(event_name: str, payload: dict | None = None) -> None:
    """Store a live signal once; every process fans it out to its browsers."""
    message = {
        "id": uuid4().hex,
        "_type": "live_update",
        "event": event_name,
        "payload": payload or {},
        "createdAt": datetime.utcnow(),
    }
    try:
        updates_collection.insert_one(message)
    except PyMongoError:
        # Keep same-process live behavior if a local development database is
        # temporarily unavailable. Cross-process delivery resumes on recovery.
        broker.broadcast(message)


@live_bp.route("/stream", methods=["GET"])
def stream_live_updates():
    """Open one lightweight SSE subscription for a landing-page visitor."""
    broker.ensure_started()
    subscriber = broker.subscribe()

    @stream_with_context
    def generate():
        yield "retry: 3000\n\n"
        try:
            while True:
                try:
                    message = subscriber.get(timeout=_KEEPALIVE_SECONDS)
                    yield (
                        f"id: {message['id']}\n"
                        f"event: {message['event']}\n"
                        f"data: {json.dumps(message['payload'])}\n\n"
                    )
                except Empty:
                    yield ": keepalive\n\n"
        finally:
            broker.unsubscribe(subscriber)

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
