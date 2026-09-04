from flask import Blueprint, request, jsonify
from pymongo import UpdateOne
from database import db

lion_cabinet_bp = Blueprint("lion_cabinet", __name__)
collection = db["lion_cabinet"]


def _ordered_members(members):
    """Respect a saved display order while preserving the legacy insertion order."""
    return [
        member
        for _, member in sorted(
            enumerate(members),
            key=lambda item: (
                item[1].get("displayOrder")
                if isinstance(item[1].get("displayOrder"), int)
                and not isinstance(item[1].get("displayOrder"), bool)
                and item[1]["displayOrder"] >= 0
                else item[0]
            ),
        )
    ]


def _validated_member_ids(data):
    member_ids = data.get("memberIds") if isinstance(data, dict) else None
    if not isinstance(member_ids, list) or not all(isinstance(member_id, str) and member_id for member_id in member_ids):
        return None
    return member_ids


@lion_cabinet_bp.route("", methods=["GET"])
def get_lion_cabinet():
    members = list(collection.find({}, {"_id": 0}))
    return jsonify(_ordered_members(members))


@lion_cabinet_bp.route("", methods=["POST"])
def add_member():
    data = request.get_json()
    if not data.get("name"):
        return jsonify({"error": "name is required"}), 400
    import time
    data.setdefault("id", f"lion-{int(time.time() * 1000)}")
    # New members always appear after the existing cabinet until reordered.
    existing_orders = [
        member.get("displayOrder")
        for member in collection.find({}, {"_id": 0, "displayOrder": 1})
        if isinstance(member.get("displayOrder"), int)
        and not isinstance(member.get("displayOrder"), bool)
        and member["displayOrder"] >= 0
    ]
    data.setdefault("displayOrder", max(existing_orders, default=collection.count_documents({}) - 1) + 1)
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@lion_cabinet_bp.route("/reorder", methods=["PUT"])
def reorder_members():
    member_ids = _validated_member_ids(request.get_json() or {})
    if member_ids is None:
        return jsonify({"error": "memberIds must be a list of member IDs"}), 400

    existing_ids = [member["id"] for member in collection.find({}, {"_id": 0, "id": 1})]
    if len(member_ids) != len(existing_ids) or len(set(member_ids)) != len(member_ids) or set(member_ids) != set(existing_ids):
        return jsonify({"error": "memberIds must include each current cabinet member exactly once"}), 400

    if member_ids:
        collection.bulk_write([
            UpdateOne({"id": member_id}, {"$set": {"displayOrder": position}})
            for position, member_id in enumerate(member_ids)
        ])
    return jsonify({"memberIds": member_ids})


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
