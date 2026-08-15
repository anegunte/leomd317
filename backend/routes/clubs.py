from flask import Blueprint, request, jsonify
from database import db
from security import can_manage_scoped_record, scoped_access_error

clubs_bp = Blueprint("clubs", __name__)
collection = db["clubs"]


@clubs_bp.route("", methods=["GET"])
def get_clubs():
    district_id = request.args.get("district")
    query = {"districtId": district_id} if district_id else {}
    clubs = list(collection.find(query, {"_id": 0}))
    return jsonify(clubs)


@clubs_bp.route("/<club_id>", methods=["GET"])
def get_club(club_id):
    club = collection.find_one({"id": club_id}, {"_id": 0})
    if not club:
        return jsonify({"error": "Club not found"}), 404
    return jsonify(club)


@clubs_bp.route("", methods=["POST"])
def create_club():
    data = request.get_json() or {}
    if not data.get("name"):
        return jsonify({"error": "name is required"}), 400
    if not can_manage_scoped_record(None, data, district_field="districtId", club_field="name"):
        return scoped_access_error()
    import time
    data.setdefault("id", f"club-{int(time.time() * 1000)}")
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@clubs_bp.route("/<club_id>", methods=["PUT"])
def update_club(club_id):
    data = request.get_json() or {}
    data.pop("_id", None)
    existing = collection.find_one({"id": club_id}, {"_id": 0})
    if not existing:
        return jsonify({"error": "Club not found"}), 404
    if not can_manage_scoped_record(existing, data, district_field="districtId", club_field="name"):
        return scoped_access_error()
    result = collection.update_one({"id": club_id}, {"$set": data})
    updated = collection.find_one({"id": club_id}, {"_id": 0})
    return jsonify(updated)


@clubs_bp.route("/<club_id>", methods=["DELETE"])
def delete_club(club_id):
    existing = collection.find_one({"id": club_id}, {"_id": 0})
    if not existing:
        return jsonify({"error": "Club not found"}), 404
    if not can_manage_scoped_record(existing, None, district_field="districtId", club_field="name"):
        return scoped_access_error()
    result = collection.delete_one({"id": club_id})
    return jsonify({"message": "Club deleted"})
