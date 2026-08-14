from flask import Blueprint, request, jsonify
from database import db

lion_cabinet_bp = Blueprint("lion_cabinet", __name__)
collection = db["lion_cabinet"]


@lion_cabinet_bp.route("", methods=["GET"])
def get_lion_cabinet():
    members = list(collection.find({}, {"_id": 0}))
    return jsonify(members)


@lion_cabinet_bp.route("", methods=["POST"])
def add_member():
    data = request.get_json()
    if not data.get("name"):
        return jsonify({"error": "name is required"}), 400
    import time
    data.setdefault("id", f"lion-{int(time.time() * 1000)}")
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@lion_cabinet_bp.route("/<member_id>", methods=["PUT"])
def update_member(member_id):
    data = request.get_json()
    data.pop("_id", None)
    result = collection.update_one({"id": member_id}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Member not found"}), 404
    updated = collection.find_one({"id": member_id}, {"_id": 0})
    return jsonify(updated)


@lion_cabinet_bp.route("/<member_id>", methods=["DELETE"])
def delete_member(member_id):
    result = collection.delete_one({"id": member_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Member not found"}), 404
    return jsonify({"message": "Member deleted"})
