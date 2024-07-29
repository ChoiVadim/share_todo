from flask import render_template, request, jsonify, Blueprint
from .models import User

routes = Blueprint("routes", __name__)


@routes.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")

    if request.method == "POST":
        data = request.json
        name = data.get("name")
        password = data.get("password")

    
        # Here you can add your logic to check the credentials
        if name == "Mike" and password == "1234":
            response = {"status": "success", "message": "Login successful!"}
        else:
            response = {"status": "failure", "message": "Invalid credentials."}

        return jsonify(response)
