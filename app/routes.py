from flask import render_template, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Todo
from . import db

routes = Blueprint("routes", __name__)


@routes.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        # Render the login.html template for GET requests
        return render_template("login.html")

    if request.method == "POST":
        # Get the user data from the request body
        data = request.get_json()
        user = User.query.filter_by(username=data["username"]).first()

        if not user or not check_password_hash(user.password, data["password"]):
            # Return an error message for invalid credentials
            return jsonify({"message": "Invalid credentials"}), 401

        # Generate a JWT token for the user
        access_token = create_access_token(identity=user.id)

        # Return the access token in JSON format
        return jsonify(access_token=access_token)


@routes.route("/register", methods=["POST"])
def register():
    # Get the user data from the request body
    data = request.get_json()

    # Hash the user's password using pbkdf2 with SHA256
    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")

    # Create a new user with the provided username and hashed password
    new_user = User(username=data["username"], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registered successfully"})


@routes.route("/<int:user_id>", methods=["GET"])
# @jwt_required()  # Protect this route with a JWT
def show_todo_list(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Retrieve all todos associated with the user
    todos = Todo.query.filter_by(user_id=user_id).all()
    todo_list = [{"id": todo.id, "title": todo.title} for todo in todos]

    return jsonify({"todos": todo_list}), 200


@routes.route("/todo/<int:user_id>", methods=["POST"])
# @jwt_required()  # Protect this route with a JWT
def add_todo(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()

    if not data or not data.get("title"):
        return jsonify({"message": "Title is required"}), 400

    # Extract the fields from the request data
    title = data["title"]

    new_entry = Todo(
        user_id=user_id,
        title=title,
    )

    db.session.add(new_entry)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Entry added",
                "todo": {"id": new_entry.id, "title": new_entry.title},
            }
        ),
        201,
    )
