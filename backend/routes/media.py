from flask import Blueprint, request, jsonify
from database import db
from security import can_manage_scoped_record, scoped_access_error

media_bp = Blueprint("media", __name__)
collection = db["media"]


@media_bp.route("", methods=["GET"])
def get_media():
    category = request.args.get("category")
    district = request.args.get("district")
    query = {}
    if category:
        query["category"] = category
    if district:
        query["district"] = district
    media = list(collection.find(query, {"_id": 0}))
    return jsonify(media)


@media_bp.route("/<media_id>", methods=["GET"])
def get_media_item(media_id):
    item = collection.find_one({"id": media_id}, {"_id": 0})
    if not item:
        return jsonify({"error": "Media item not found"}), 404
    return jsonify(item)


@media_bp.route("", methods=["POST"])
def create_media():
    data = request.get_json() or {}
    if not data.get("title"):
        return jsonify({"error": "title is required"}), 400
    if not can_manage_scoped_record(None, data, district_field="district"):
        return scoped_access_error()
    import time
    data.setdefault("id", f"med-{int(time.time() * 1000)}")
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@media_bp.route("/<media_id>", methods=["PUT"])
def update_media(media_id):
    data = request.get_json() or {}
    data.pop("_id", None)
    existing = collection.find_one({"id": media_id}, {"_id": 0})
    if not existing:
        return jsonify({"error": "Media item not found"}), 404
    if not can_manage_scoped_record(existing, data, district_field="district"):
        return scoped_access_error()
    result = collection.update_one({"id": media_id}, {"$set": data})
    updated = collection.find_one({"id": media_id}, {"_id": 0})
    return jsonify(updated)


@media_bp.route("/<media_id>", methods=["DELETE"])
def delete_media(media_id):
    existing = collection.find_one({"id": media_id}, {"_id": 0})
    if not existing:
        return jsonify({"error": "Media item not found"}), 404
    if not can_manage_scoped_record(existing, None, district_field="district"):
        return scoped_access_error()
    result = collection.delete_one({"id": media_id})
    return jsonify({"message": "Media item deleted"})
