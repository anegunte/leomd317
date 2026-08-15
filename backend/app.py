from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo.errors import PyMongoError

from config import CORS_ORIGINS, SECRET_KEY
from security import authenticate_request, is_global_admin

app = Flask(__name__)
app.config["SECRET_KEY"] = SECRET_KEY
CORS(
    app,
    resources={r"/api/*": {"origins": CORS_ORIGINS}},
    allow_headers=["Authorization", "Content-Type"],
)

_WRITE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}
_GLOBAL_ADMIN_PREFIXES = (
    "/api/districts",
    "/api/cabinet",
    "/api/lion-cabinet",
    "/api/site-settings",
    "/api/about",
    "/api/isame",
    "/api/celebration",
)


@app.before_request
def protect_mutating_api_routes():
    """Require an authenticated server-side admin for every API write."""
    if request.method not in _WRITE_METHODS or not request.path.startswith("/api/"):
        return None
    if request.path == "/api/auth/login":
        return None

    user, error = authenticate_request()
    if error:
        return error
    if request.path.startswith(_GLOBAL_ADMIN_PREFIXES) and not is_global_admin(user):
        return jsonify({"error": "This action requires Multiple District administrator access."}), 403
    return None

# Register blueprints
from routes.auth import auth_bp
from routes.districts import districts_bp
from routes.clubs import clubs_bp
from routes.projects import projects_bp
from routes.events import events_bp
from routes.media import media_bp
from routes.site_settings import site_settings_bp
from routes.about import about_bp
from routes.cabinet import cabinet_bp
from routes.lion_cabinet import lion_cabinet_bp
from routes.isame import isame_bp
from routes.celebration import celebration_bp
from routes.live import live_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(districts_bp, url_prefix="/api/districts")
app.register_blueprint(clubs_bp, url_prefix="/api/clubs")
app.register_blueprint(projects_bp, url_prefix="/api/projects")
app.register_blueprint(events_bp, url_prefix="/api/events")
app.register_blueprint(media_bp, url_prefix="/api/media")
app.register_blueprint(site_settings_bp, url_prefix="/api/site-settings")
app.register_blueprint(about_bp, url_prefix="/api/about")
app.register_blueprint(cabinet_bp, url_prefix="/api/cabinet")
app.register_blueprint(lion_cabinet_bp, url_prefix="/api/lion-cabinet")
app.register_blueprint(isame_bp, url_prefix="/api/isame")
app.register_blueprint(celebration_bp, url_prefix="/api/celebration")
app.register_blueprint(live_bp, url_prefix="/api/live")


@app.route("/api/health", methods=["GET"])
def health():
    from config import DB_NAME
    from database import db

    try:
        db.client.admin.command("ping")
    except PyMongoError:
        return {"status": "unavailable", "database": DB_NAME}, 503

    return {"status": "ok", "database": DB_NAME}


if __name__ == "__main__":
    app.run(debug=True, port=5000)
