from flask import Blueprint, jsonify, request

from database import db


isame_bp = Blueprint("isame", __name__)
collection = db["isame_settings"]


# These are deliberately conservative defaults based on the official Lions
# listing. Administrators can replace only the details they have confirmed.
DEFAULT_ISAME_SETTINGS = {
    "_type": "isame_settings",
    "eyebrow": "Goa · India · 2027",
    "titlePrefix": "LEO ISAME",
    "titleHighlight": "FORUM 2027",
    "heroSubtitle": "A horizon for leadership, service and fellowship—where the spirit of Leoism meets the coast of Goa.",
    "location": "Goa, India",
    "dates": "Dates to be announced",
    "venue": "Venue to be announced",
    "regionIntro": "ISAME connects Leo communities across India, South Asia and the Middle East. The forum is a place to meet peers beyond one's own district, listen deeply and return home with fresh energy for meaningful service.",
    "forumExperience": "Previous Leo ISAME gatherings have been documented by participating Leo organisations as opportunities for workshops, dialogue and cultural exchange. The 2027 programme will be announced by the organisers; this page deliberately does not speculate on sessions, speakers or dates.",
    "destinationIntro": "Goa is the officially listed destination for the ISAME Leo Forum. Final dates, venue, travel guidance and programme details are published when confirmed by the organisers.",
    "statusNote": "Register your interest now and follow the official forum listing for confirmed event details.",
    "registrationUrl": "https://forms.gle/Y5sqS9q3U7wmg6ix8",
    "officialForumUrl": "https://www.lionsclubs.org/en/resources-for-members/forums",
    "heroImage": "https://images.unsplash.com/photo-1589428000126-afdd64ae1f3a?auto=format&fit=crop&q=90&w=2400",
    "forumImage": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=85&w=1400",
    "leadershipImage": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1400",
}


@isame_bp.route("", methods=["GET"])
def get_isame_settings():
    """Return ISAME content, falling back to the validated starter content."""
    settings = collection.find_one({"_type": "isame_settings"}, {"_id": 0})
    return jsonify(settings or DEFAULT_ISAME_SETTINGS)


@isame_bp.route("", methods=["PUT"])
def update_isame_settings():
    """Persist the editable ISAME page content as a single document."""
    data = request.get_json() or {}
    data.pop("_id", None)
    data["_type"] = "isame_settings"

    collection.update_one(
        {"_type": "isame_settings"},
        {"$set": data},
        upsert=True,
    )
    updated = collection.find_one({"_type": "isame_settings"}, {"_id": 0})
    return jsonify(updated)
