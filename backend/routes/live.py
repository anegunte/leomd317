"""Lightweight Server-Sent Events broadcaster for live landing-page updates."""

import json
from queue import Empty, Queue
from threading import Lock

from flask import Blueprint, Response, stream_with_context


live_bp = Blueprint("live", __name__)
_subscribers: set[Queue] = set()
_subscribers_lock = Lock()


def publish_live_event(event_name: str, payload: dict | None = None) -> None:
    """Broadcast a small update to every connected landing page."""
    message = {"event": event_name, "payload": payload or {}}
    with _subscribers_lock:
        subscribers = list(_subscribers)
    for subscriber in subscribers:
        subscriber.put(message)


@live_bp.route("/stream", methods=["GET"])
def stream_live_updates():
    """Keep one low-cost event stream open per landing page."""
    subscriber: Queue = Queue()
    with _subscribers_lock:
        _subscribers.add(subscriber)

    @stream_with_context
    def generate():
        yield "retry: 3000\n\n"
        try:
            while True:
                try:
                    message = subscriber.get(timeout=20)
                    yield f"event: {message['event']}\ndata: {json.dumps(message['payload'])}\n\n"
                except Empty:
                    # Keep the connection alive through development proxies.
                    yield ": keepalive\n\n"
        finally:
            with _subscribers_lock:
                _subscribers.discard(subscriber)

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
