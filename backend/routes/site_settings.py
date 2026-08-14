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


@site_settings_bp.route("/stories", methods=["GET"])
def get_stories():
    stories = list(stories_col.find({}, {"_id": 0}))
    return jsonify(stories)


@site_settings_bp.route("/stories", methods=["POST"])
def add_story():
    data = request.get_json()
    import time
    data.setdefault("id", f"story-{int(time.time() * 1000)}")
    stories_col.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@site_settings_bp.route("/stories/<story_id>", methods=["PUT"])
def update_story(story_id):
    data = request.get_json()
    data.pop("_id", None)
    result = stories_col.update_one({"id": story_id}, {"$set": data})
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
