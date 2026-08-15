from flask import Blueprint, request, jsonify
from database import db
from uuid import uuid4

districts_bp = Blueprint("districts", __name__)
collection = db["districts"]


@districts_bp.route("", methods=["GET"])
def get_districts():
    districts = list(collection.find({}, {"_id": 0}))
    return jsonify(districts)


@districts_bp.route("/<district_id>", methods=["GET"])
def get_district(district_id):
    district = collection.find_one({"id": district_id}, {"_id": 0})
    if not district:
        return jsonify({"error": "District not found"}), 404
    return jsonify(district)


@districts_bp.route("", methods=["POST"])
def create_district():
    data = request.get_json()
    if not data.get("id") or not data.get("name"):
        return jsonify({"error": "id and name are required"}), 400
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@districts_bp.route("/<district_id>", methods=["PUT"])
def update_district(district_id):
    data = request.get_json()
    data.pop("_id", None)
    result = collection.update_one({"id": district_id}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "District not found"}), 404
    updated = collection.find_one({"id": district_id}, {"_id": 0})
    return jsonify(updated)


def _cabinet_member_payload(district_id, data, member_id=None):
    """Normalize a district-cabinet member without allowing cross-district moves."""
    if not data.get("name") or not data.get("role"):
        return None

    member = {
        "id": member_id or f"district-cab-{uuid4().hex}",
        "name": data["name"].strip(),
        "role": data["role"].strip(),
        "district": district_id,
        "club": (data.get("club") or "").strip(),
        "email": (data.get("email") or "").strip(),
        "phone": (data.get("phone") or "").strip(),
        "photo": (data.get("photo") or "").strip(),
    }
    return member


@districts_bp.route("/<district_id>/cabinet", methods=["POST"])
def add_cabinet_member(district_id):
    data = request.get_json() or {}
    member = _cabinet_member_payload(district_id, data)
    if not member:
        return jsonify({"error": "name and role are required"}), 400

    result = collection.update_one({"id": district_id}, {"$push": {"cabinet": member}})
    if result.matched_count == 0:
        return jsonify({"error": "District not found"}), 404
    return jsonify(member), 201


@districts_bp.route("/<district_id>/cabinet/<member_id>", methods=["PUT"])
def update_cabinet_member(district_id, member_id):
    data = request.get_json() or {}
    member = _cabinet_member_payload(district_id, data, member_id=member_id)
    if not member:
        return jsonify({"error": "name and role are required"}), 400

    result = collection.update_one(
        {"id": district_id, "cabinet.id": member_id},
        {"$set": {"cabinet.$": member}},
    )
    if result.matched_count == 0:
        return jsonify({"error": "District or cabinet member not found"}), 404
    return jsonify(member)


@districts_bp.route("/<district_id>/cabinet/<member_id>", methods=["DELETE"])
def delete_cabinet_member(district_id, member_id):
    result = collection.update_one(
        {"id": district_id, "cabinet.id": member_id},
        {"$pull": {"cabinet": {"id": member_id}}},
    )
    if result.matched_count == 0:
        return jsonify({"error": "District or cabinet member not found"}), 404
    return jsonify({"message": "District cabinet member deleted"})


@districts_bp.route("/<district_id>", methods=["DELETE"])
def delete_district(district_id):
    result = collection.delete_one({"id": district_id})
    if result.deleted_count == 0:
        return jsonify({"error": "District not found"}), 404
    return jsonify({"message": "District deleted"})
