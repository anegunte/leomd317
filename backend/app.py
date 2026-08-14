from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

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


@app.route("/api/health", methods=["GET"])
def health():
    from config import DB_NAME
    return {"status": "ok", "database": DB_NAME}


if __name__ == "__main__":
    app.run(debug=True, port=5000)
