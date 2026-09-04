from flask import Blueprint, request, jsonify
from database import db

site_settings_bp = Blueprint("site_settings", __name__)
collection = db["site_settings"]


@site_settings_bp.route("", methods=["GET"])
def get_settings():
    """Return all site settings as a single document."""
    settings = collection.find_one({"_type": "site_settings"}, {"_id": 0})
    if not settings:
        return jsonify({})
    return jsonify(settings)


@site_settings_bp.route("", methods=["PUT"])
def update_settings():
    """Update the single site_settings document (upsert)."""
    data = request.get_json()
    data["_type"] = "site_settings"
    data.pop("_id", None)
    collection.update_one(
        {"_type": "site_settings"},
        {"$set": data},
        upsert=True,
    )
    updated = collection.find_one({"_type": "site_settings"}, {"_id": 0})
    return jsonify(updated)


# --- Impact Counters ---
counters_col = db["impact_counters"]


@site_settings_bp.route("/counters", methods=["GET"])
def get_counters():
    counters = list(counters_col.find({}, {"_id": 0}))
    return jsonify(counters)


@site_settings_bp.route("/counters", methods=["PUT"])
def update_counters():
    """Replace all counters with the provided array."""
    data = request.get_json()
    if not isinstance(data, list):
        return jsonify({"error": "Expected a JSON array of counters"}), 400
    counters_col.delete_many({})
    if data:
        counters_col.insert_many(data)
    counters = list(counters_col.find({}, {"_id": 0}))
    return jsonify(counters)


# --- Activity Ticker ---
ticker_col = db["ticker_items"]


@site_settings_bp.route("/ticker", methods=["GET"])
def get_ticker():
    items = list(ticker_col.find({}, {"_id": 0}))
    return jsonify(items)


@site_settings_bp.route("/ticker", methods=["PUT"])
def update_ticker():
    """Replace all ticker items with the provided array."""
    data = request.get_json()
    if not isinstance(data, list):
        return jsonify({"error": "Expected a JSON array of ticker items"}), 400
    ticker_col.delete_many({})
    if data:
        ticker_col.insert_many(data)
    items = list(ticker_col.find({}, {"_id": 0}))
    return jsonify(items)


# --- Stories ---
stories_col = db["stories"]


def _story_payload(data, story_id=None):
    """Keep home-page stories consistent, complete, and safe to render."""
    if not isinstance(data, dict) or not str(data.get("title", "")).strip() or not str(data.get("image", "")).strip():
        return None
    return {
        "id": story_id or data.get("id"),
        "tag": str(data.get("tag", "Service Story")).strip(),
        "title": str(data["title"]).strip(),
        "image": str(data["image"]).strip(),
        "description": str(data.get("description", "")).strip(),
        "impactOutcome": str(data.get("impactOutcome", "")).strip(),
        "readLink": str(data.get("readLink", "")).strip(),
    }


@site_settings_bp.route("/stories", methods=["GET"])
def get_stories():
    stories = list(stories_col.find({}, {"_id": 0}))
    return jsonify(stories)


@site_settings_bp.route("/stories", methods=["POST"])
def add_story():
    data = request.get_json() or {}
    story = _story_payload(data)
    if not story:
        return jsonify({"error": "title and image are required"}), 400
    import time
    story["id"] = f"story-{int(time.time() * 1000)}"
    stories_col.insert_one(story)
    # insert_one adds MongoDB's ObjectId to this dictionary; it is not JSON serializable.
    story.pop("_id", None)
    return jsonify(story), 201


@site_settings_bp.route("/stories/<story_id>", methods=["PUT"])
def update_story(story_id):
    story = _story_payload(request.get_json() or {}, story_id=story_id)
    if not story:
        return jsonify({"error": "title and image are required"}), 400
    result = stories_col.update_one({"id": story_id}, {"$set": story})
    if result.matched_count == 0:
        return jsonify({"error": "Story not found"}), 404
    updated = stories_col.find_one({"id": story_id}, {"_id": 0})
    return jsonify(updated)


@site_settings_bp.route("/stories/<story_id>", methods=["DELETE"])
def delete_story(story_id):
    result = stories_col.delete_one({"id": story_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Story not found"}), 404
    return jsonify({"message": "Story deleted"})
