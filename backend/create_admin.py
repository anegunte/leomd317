"""Create or rotate a secure administrative account in MongoDB."""

import argparse
from getpass import getpass

from werkzeug.security import generate_password_hash

from database import db
from security import KNOWN_ROLES, utc_now


def main() -> None:
    parser = argparse.ArgumentParser(description="Create or rotate an LEO MD 317 admin account.")
    parser.add_argument("--username", required=True)
    parser.add_argument("--name", required=True)
    parser.add_argument("--role", required=True, choices=sorted(KNOWN_ROLES))
    parser.add_argument("--district", required=True)
    parser.add_argument("--club")
    args = parser.parse_args()

    username = args.username.strip().lower()
    if not username:
        parser.error("username cannot be empty")
    if args.role == "Club Admin" and not args.club:
        parser.error("--club is required for a Club Admin")

    password = getpass("New password (12+ characters): ")
    confirmation = getpass("Confirm password: ")
    if password != confirmation:
        parser.error("passwords do not match")
    if len(password) < 12:
        parser.error("password must be at least 12 characters")

    users = db["admin_users"]
    users.create_index("username", unique=True)
    existing = users.find_one({"username": username}) or {}
    now = utc_now()
    account = {
        "username": username,
        "name": args.name.strip(),
        "role": args.role,
        "district": args.district.strip(),
        "club": args.club.strip() if args.club else None,
        "passwordHash": generate_password_hash(password),
        "active": True,
        "tokenVersion": existing.get("tokenVersion", 0) + 1,
        "updatedAt": now,
    }
    if not existing:
        account["createdAt"] = now

    users.update_one({"username": username}, {"$set": account}, upsert=True)
    print(f"Admin account '{username}' is ready. Existing sessions for this account were revoked.")


if __name__ == "__main__":
    main()
