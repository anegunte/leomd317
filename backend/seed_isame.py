"""Create the ISAME settings document without replacing existing site data.

Run from the backend directory: python seed_isame.py
"""

from database import db
from routes.isame import DEFAULT_ISAME_SETTINGS


def seed_isame():
    result = db["isame_settings"].update_one(
        {"_type": "isame_settings"},
        {"$setOnInsert": DEFAULT_ISAME_SETTINGS},
        upsert=True,
    )
    if result.upserted_id:
        print("Created the ISAME settings document.")
    else:
        print("ISAME settings already exist; no content was overwritten.")


if __name__ == "__main__":
    seed_isame()
