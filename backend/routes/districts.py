from flask import Blueprint, request, jsonify
from database import db
from uuid import uuid4

districts_bp = Blueprint("districts", __name__)
collection = db["districts"]
DISTRICT_DISPLAY_ORDER = {f"317{letter}": position for position, letter in enumerate("ABCDEFG")}


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


def _with_ordered_cabinet(district):
    if district.get("cabinet"):
        district["cabinet"] = _ordered_members(district["cabinet"])
    return district


def _district_sort_key(district):
    """Keep the public district listing in its official 317A–317G sequence."""
    district_id = district.get("id", "")
    return (0, DISTRICT_DISPLAY_ORDER[district_id]) if district_id in DISTRICT_DISPLAY_ORDER else (1, district_id)


def _validated_member_ids(data):
    member_ids = data.get("memberIds") if isinstance(data, dict) else None
    if not isinstance(member_ids, list) or not all(isinstance(member_id, str) and member_id for member_id in member_ids):
        return None
    return member_ids


@districts_bp.route("", methods=["GET"])
def get_districts():
    districts = list(collection.find({}, {"_id": 0}))
    return jsonify([_with_ordered_cabinet(district) for district in sorted(districts, key=_district_sort_key)])


@districts_bp.route("/<district_id>", methods=["GET"])
def get_district(district_id):
    district = collection.find_one({"id": district_id}, {"_id": 0})
    if not district:
        return jsonify({"error": "District not found"}), 404
    return jsonify(_with_ordered_cabinet(district))


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
    display_order = data.get("displayOrder")
    if isinstance(display_order, int) and not isinstance(display_order, bool) and display_order >= 0:
        member["displayOrder"] = display_order
    return member


@districts_bp.route("/<district_id>/cabinet", methods=["POST"])
def add_cabinet_member(district_id):
    data = request.get_json() or {}
    member = _cabinet_member_payload(district_id, data)
    if not member:
        return jsonify({"error": "name and role are required"}), 400

    district = collection.find_one({"id": district_id}, {"_id": 0, "cabinet": 1})
    if not district:
        return jsonify({"error": "District not found"}), 404
    cabinet = district.get("cabinet", [])
    existing_orders = [
        existing_member.get("displayOrder")
        for existing_member in cabinet
        if isinstance(existing_member.get("displayOrder"), int)
        and not isinstance(existing_member.get("displayOrder"), bool)
        and existing_member["displayOrder"] >= 0
    ]
    member.setdefault("displayOrder", max(existing_orders, default=len(cabinet) - 1) + 1)
    collection.update_one({"id": district_id}, {"$push": {"cabinet": member}})
    return jsonify(member), 201


@districts_bp.route("/<district_id>/cabinet/reorder", methods=["PUT"])
def reorder_cabinet_members(district_id):
    member_ids = _validated_member_ids(request.get_json() or {})
    if member_ids is None:
        return jsonify({"error": "memberIds must be a list of member IDs"}), 400

    district = collection.find_one({"id": district_id}, {"_id": 0, "cabinet": 1})
    if not district:
        return jsonify({"error": "District not found"}), 404

    cabinet = district.get("cabinet", [])
    existing_ids = [member.get("id") for member in cabinet]
    if len(member_ids) != len(existing_ids) or len(set(member_ids)) != len(member_ids) or set(member_ids) != set(existing_ids):
        return jsonify({"error": "memberIds must include each current cabinet member exactly once"}), 400

    members_by_id = {member["id"]: member for member in cabinet}
    reordered_cabinet = [
        {**members_by_id[member_id], "displayOrder": position}
        for position, member_id in enumerate(member_ids)
    ]
    collection.update_one({"id": district_id}, {"$set": {"cabinet": reordered_cabinet}})
    return jsonify({"memberIds": member_ids})


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
