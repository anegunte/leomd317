from flask import Blueprint, request, jsonify
from database import db
from security import can_manage_scoped_record, scoped_access_error

projects_bp = Blueprint("projects", __name__)
collection = db["projects"]


@projects_bp.route("", methods=["GET"])
def get_projects():
    district = request.args.get("district")
    category = request.args.get("category")
    query = {}
    if district:
        query["district"] = district
    if category:
        query["category"] = category
    projects = list(collection.find(query, {"_id": 0}))
    return jsonify(projects)


@projects_bp.route("/<project_id>", methods=["GET"])
def get_project(project_id):
    project = collection.find_one({"id": project_id}, {"_id": 0})
    if not project:
        return jsonify({"error": "Project not found"}), 404
    return jsonify(project)


@projects_bp.route("", methods=["POST"])
def create_project():
    data = request.get_json() or {}
    if not data.get("title"):
        return jsonify({"error": "title is required"}), 400
    if not can_manage_scoped_record(None, data, district_field="district", club_field="club"):
        return scoped_access_error()
    import time
    data.setdefault("id", f"proj-{int(time.time() * 1000)}")
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@projects_bp.route("/<project_id>", methods=["PUT"])
def update_project(project_id):
    data = request.get_json() or {}
    data.pop("_id", None)
    existing = collection.find_one({"id": project_id}, {"_id": 0})
    if not existing:
        return jsonify({"error": "Project not found"}), 404
    if not can_manage_scoped_record(existing, data, district_field="district", club_field="club"):
        return scoped_access_error()
    result = collection.update_one({"id": project_id}, {"$set": data})
    updated = collection.find_one({"id": project_id}, {"_id": 0})
    return jsonify(updated)


@projects_bp.route("/<project_id>", methods=["DELETE"])
def delete_project(project_id):
    existing = collection.find_one({"id": project_id}, {"_id": 0})
    if not existing:
        return jsonify({"error": "Project not found"}), 404
    if not can_manage_scoped_record(existing, None, district_field="district", club_field="club"):
        return scoped_access_error()
    result = collection.delete_one({"id": project_id})
    return jsonify({"message": "Project deleted"})
