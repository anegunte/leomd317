from flask import Blueprint, request, jsonify
from database import db

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


@districts_bp.route("/<district_id>", methods=["DELETE"])
def delete_district(district_id):
    result = collection.delete_one({"id": district_id})
    if result.deleted_count == 0:
        return jsonify({"error": "District not found"}), 404
    return jsonify({"message": "District deleted"})
