from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(
        __name__,
        template_folder="templates",
        static_folder="static",
        static_url_path="/",
    )

    # Load configuration from app.config.Config module
    app.config.from_object("app.config.Config")

    # Initialize SQLAlchemy database with the app
    db.init_app(app)

    with app.app_context():
        # Import routes blueprint
        from .routes import routes

        # Register routes blueprint with the app
        app.register_blueprint(routes)

        # Create all database tables
        db.create_all()

    return app
