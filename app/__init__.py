from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()


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

    # Initialize JWTManager with the app
    jwt.init_app(app)

    # Initialize CORS with the app
    CORS(app)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    with app.app_context():
        # Import routes blueprint
        from .routes import routes

        # Register routes blueprint with the app
        app.register_blueprint(routes)

        # Create all database tables
        db.create_all()

    return app
