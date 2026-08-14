from flask import Blueprint, request, jsonify
from database import db

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
    data = request.get_json()
    if not data.get("title"):
        return jsonify({"error": "title is required"}), 400
    import time
    data.setdefault("id", f"proj-{int(time.time() * 1000)}")
    collection.insert_one(data)
    data.pop("_id", None)
    return jsonify(data), 201


@projects_bp.route("/<project_id>", methods=["PUT"])
def update_project(project_id):
    data = request.get_json()
    data.pop("_id", None)
    result = collection.update_one({"id": project_id}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Project not found"}), 404
    updated = collection.find_one({"id": project_id}, {"_id": 0})
    return jsonify(updated)


@projects_bp.route("/<project_id>", methods=["DELETE"])
def delete_project(project_id):
    result = collection.delete_one({"id": project_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Project not found"}), 404
    return jsonify({"message": "Project deleted"})
