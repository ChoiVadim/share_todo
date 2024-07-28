from flask import Flask, request, render_template, jsonify


app = Flask(__name__, template_folder="templates", static_folder="static")


@app.route("/login", methods=["GET", "POST"])
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
