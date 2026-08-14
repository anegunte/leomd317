from flask import Blueprint, request, jsonify
from config import ADMIN_USERS
import hashlib
import time

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = (data.get("username") or "").lower().strip()
    password = data.get("password") or ""

    user = next(
        (u for u in ADMIN_USERS if u["username"] == username and u["password"] == password),
        None,
    )

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    token = hashlib.sha256(f"{username}-{time.time()}".encode()).hexdigest()

    return jsonify({
        "username": user["username"],
        "name": user["name"],
        "role": user["role"],
        "district": user["district"],
        "club": user.get("club"),
        "token": token,
    })


@auth_bp.route("/users", methods=["GET"])
def get_users():
    """Return available user roles (without passwords) for demo credential display."""
    safe_users = []
    for u in ADMIN_USERS:
        safe_users.append({
            "username": u["username"],
            "name": u["name"],
            "role": u["role"],
            "district": u["district"],
            "club": u.get("club"),
        })
    return jsonify(safe_users)
