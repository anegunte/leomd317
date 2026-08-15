"""Server-side authentication, authorization, and scoped admin access."""

from datetime import datetime, timezone
from functools import wraps
from typing import Any

from flask import g, jsonify, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from config import AUTH_TOKEN_TTL_SECONDS, SECRET_KEY
from database import db


GLOBAL_ADMIN_ROLES = {"Super Admin", "MD Admin"}
KNOWN_ROLES = GLOBAL_ADMIN_ROLES | {"District Admin", "Club Admin"}
_TOKEN_SALT = "leo-md317-admin-access-v1"


def _serializer() -> URLSafeTimedSerializer:
    return URLSafeTimedSerializer(SECRET_KEY, salt=_TOKEN_SALT)


def public_user(user: dict[str, Any]) -> dict[str, Any]:
    """Return only fields that are safe to send to a browser."""
    return {
        "username": user["username"],
        "name": user["name"],
        "role": user["role"],
        "district": user["district"],
        "club": user.get("club"),
    }


def issue_access_token(user: dict[str, Any]) -> str:
    return _serializer().dumps(
        {"sub": user["username"], "version": user.get("tokenVersion", 1)}
    )


def authenticate_request() -> tuple[dict[str, Any] | None, tuple[Any, int] | None]:
    """Resolve a valid Bearer token to an active admin account."""
    header = request.headers.get("Authorization", "")
    if not header.startswith("Bearer "):
        return None, (jsonify({"error": "Authentication is required."}), 401)

    token = header.removeprefix("Bearer ").strip()
    if not token:
        return None, (jsonify({"error": "Authentication is required."}), 401)

    try:
        payload = _serializer().loads(token, max_age=AUTH_TOKEN_TTL_SECONDS)
    except SignatureExpired:
        return None, (jsonify({"error": "Your session has expired. Please sign in again."}), 401)
    except BadSignature:
        return None, (jsonify({"error": "Invalid authentication token."}), 401)

    user = db["admin_users"].find_one(
        {"username": payload.get("sub"), "active": True}, {"_id": 0}
    )
    if not user or user.get("role") not in KNOWN_ROLES:
        return None, (jsonify({"error": "Your account is not authorized."}), 403)
    if user.get("tokenVersion", 1) != payload.get("version"):
        return None, (jsonify({"error": "Your session is no longer valid. Please sign in again."}), 401)

    g.current_admin = user
    return user, None


def current_admin() -> dict[str, Any]:
    return g.current_admin


def is_global_admin(user: dict[str, Any] | None = None) -> bool:
    return (user or current_admin()).get("role") in GLOBAL_ADMIN_ROLES


def require_auth(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        _, error = authenticate_request()
        if error:
            return error
        return view(*args, **kwargs)

    return wrapped


def can_manage_scoped_record(
    existing: dict[str, Any] | None,
    incoming: dict[str, Any] | None,
    *,
    district_field: str | None,
    club_field: str | None = None,
) -> bool:
    """Enforce district/club ownership for mutable resource records."""
    user = current_admin()
    if is_global_admin(user):
        return True

    candidate = {**(existing or {}), **(incoming or {})}
    if user["role"] == "District Admin":
        return bool(district_field and candidate.get(district_field) == user.get("district"))
    if user["role"] == "Club Admin":
        return bool(club_field and user.get("club") and candidate.get(club_field) == user["club"])
    return False


def scoped_access_error():
    return jsonify({"error": "You do not have permission to modify this record."}), 403


def utc_now() -> datetime:
    return datetime.now(timezone.utc)
