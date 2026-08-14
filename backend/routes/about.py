from flask import Blueprint, request, jsonify
from database import db

about_bp = Blueprint("about", __name__)
collection = db["about_content"]


@about_bp.route("", methods=["GET"])
def get_about():
    """Return the about page content document."""
    content = collection.find_one({"_type": "about"}, {"_id": 0})
    if not content:
        return jsonify({})
    return jsonify(content)


@about_bp.route("", methods=["PUT"])
def update_about():
    """Update the about page content (upsert)."""
    data = request.get_json()
    data["_type"] = "about"
    data.pop("_id", None)
    collection.update_one(
        {"_type": "about"},
        {"$set": data},
        upsert=True,
    )
    updated = collection.find_one({"_type": "about"}, {"_id": 0})
    return jsonify(updated)


# --- Theme Pillars ---
pillars_col = db["theme_pillars"]


@about_bp.route("/pillars", methods=["GET"])
def get_pillars():
    pillars = list(pillars_col.find({}, {"_id": 0}))
    return jsonify(pillars)


@about_bp.route("/pillars", methods=["PUT"])
def update_pillars():
    """Replace all theme pillars with the provided array."""
    data = request.get_json()
    if not isinstance(data, list):
        return jsonify({"error": "Expected a JSON array of pillars"}), 400
    pillars_col.delete_many({})
    if data:
        pillars_col.insert_many(data)
    pillars = list(pillars_col.find({}, {"_id": 0}))
    return jsonify(pillars)
