"""Administrative authentication endpoints.

Admin accounts live in MongoDB and store only password hashes. Create the first
account with `python create_admin.py ...`; this API never exposes account lists
or demo passwords.
"""

from datetime import timedelta

from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

from database import db
from security import issue_access_token, public_user, require_auth, utc_now


auth_bp = Blueprint("auth", __name__)
users = db["admin_users"]
attempts = db["auth_login_attempts"]
_DUMMY_PASSWORD_HASH = generate_password_hash("not-a-real-password")
_MAX_LOGIN_ATTEMPTS = 5
_LOCKOUT_WINDOW = timedelta(minutes=15)


def _ensure_indexes() -> None:
    users.create_index("username", unique=True)
    attempts.create_index("expiresAt", expireAfterSeconds=0)


def _client_ip() -> str:
    # Nginx overwrites X-Real-IP with the connecting client address.
    return request.headers.get("X-Real-IP") or request.remote_addr or "unknown"


def _attempt_key(username: str) -> dict[str, str]:
    return {"username": username, "ip": _client_ip()}


@auth_bp.route("/login", methods=["POST"])
def login():
    _ensure_indexes()
    data = request.get_json(silent=True) or {}
    username = str(data.get("username") or "").lower().strip()
    password = str(data.get("password") or "")
    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400

    now = utc_now()
    key = _attempt_key(username)
    attempt = attempts.find_one(key)
    if attempt and attempt.get("count", 0) >= _MAX_LOGIN_ATTEMPTS:
        return jsonify({"error": "Too many login attempts. Please try again in 15 minutes."}), 429

    user = users.find_one({"username": username, "active": True})
    password_hash = user.get("passwordHash") if user else _DUMMY_PASSWORD_HASH
    password_valid = bool(password_hash and check_password_hash(password_hash, password))
    if not user or not password_valid:
        attempts.update_one(
            key,
            {
                "$inc": {"count": 1},
                "$set": {"expiresAt": now + _LOCKOUT_WINDOW, "updatedAt": now},
            },
            upsert=True,
        )
        return jsonify({"error": "Invalid username or password."}), 401

    attempts.delete_one(key)
    response = public_user(user)
    response["token"] = issue_access_token(user)
    return jsonify(response)


@auth_bp.route("/me", methods=["GET"])
@require_auth
def current_user():
    from security import current_admin

    return jsonify(public_user(current_admin()))
