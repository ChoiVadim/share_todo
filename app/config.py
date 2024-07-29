import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    # Secret key used for session management
    SECRET_KEY = os.getenv("SECRET_KEY")

    # URI for the SQLAlchemy database connection
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")

    # SQLAlchemy setting to track modifications
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key used for JWT token generation
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    # Access token expiration in seconds
    JWT_ACCESS_TOKEN_EXPIRES = 3600

    # Refresh token expiration in seconds
    JWT_REFRESH_TOKEN_EXPIRES = 86400
