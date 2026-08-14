from flask import Blueprint, request, jsonify
from database import db

events_bp = Blueprint("events", __name__)
collection = db["events"]


@events_bp.route("", methods=["GET"])
def get_events():
    status = request.args.get("status")
    district = request.args.get("district")
    query = {}
    if status:
        query["status"] = status
    if district:
        query["district"] = district
    events = list(collection.find(query, {"_id": 0}))
    return jsonify(events)


@events_bp.route("/<event_id>", methods=["GET"])
def get_event(event_id):
    event = collection.find_one({"id": event_id}, {"_id": 0})
    if not event:
        return jsonify({"error": "Event not found"}), 404
    return jsonify(event)


@events_bp.route("", methods=["POST"])
def create_event():
    data = request.get_json()
    if not data.get("title"):
        return jsonify({"error": "title is required"}), 400
    import time
    data.setdefault("id", f"evt-{int(time.time() * 1000)}")
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@events_bp.route("/<event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.get_json()
    data.pop("_id", None)
    result = collection.update_one({"id": event_id}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Event not found"}), 404
    updated = collection.find_one({"id": event_id}, {"_id": 0})
    return jsonify(updated)


@events_bp.route("/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    result = collection.delete_one({"id": event_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Event not found"}), 404
    return jsonify({"message": "Event deleted"})
