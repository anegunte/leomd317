from datetime import datetime, timezone
from uuid import uuid4

from flask import Blueprint, jsonify

from database import db
from routes.live import publish_live_event


celebration_bp = Blueprint("celebration", __name__)
collection = db["live_celebrations"]


@celebration_bp.route("", methods=["GET"])
def get_celebration():
    """Return the latest landing-page celebration signal."""
    signal = collection.find_one({"_type": "landing_confetti"}, {"_id": 0})
    return jsonify(signal or {"nonce": None})


@celebration_bp.route("/launch", methods=["POST"])
def launch_celebration():
    """Publish a one-time signal that open landing pages can react to."""
    signal = {
        "_type": "landing_confetti",
        "nonce": uuid4().hex,
        "launchedAt": datetime.now(timezone.utc).isoformat(),
    }
    collection.update_one(
        {"_type": "landing_confetti"},
        {"$set": signal},
        upsert=True,
    )
    publish_live_event("celebration", signal)
    return jsonify(signal)
