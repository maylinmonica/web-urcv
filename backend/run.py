from app import create_app, db
from flask import send_from_directory
import os

app = create_app()

# ===== ROUTE UNTUK FRONTEND VITE BUILD =====
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    dist_path = os.path.join(os.path.dirname(__file__), "static")
    if path != "" and os.path.exists(os.path.join(dist_path, path)):
        return send_from_directory(dist_path, path)
    else:
        return send_from_directory(dist_path, "index.html")


# ===== OPSIONAL: COMMAND BUAT DATABASE =====
@app.cli.command("create-db")
def create_db():
    db.create_all()
    print("Database berhasil dibuat.")


if __name__ == "__main__":
    app.run(debug=True)
