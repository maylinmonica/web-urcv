import os
import cloudinary
import cloudinary.uploader
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime

upload_bp = Blueprint('upload', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/upload-photo', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return jsonify({"error": "Tidak ada file foto"}), 400

    file = request.files['photo']

    if file.filename == '':
        return jsonify({"error": "Nama file kosong"}), 400

    # 🔍 PRINT DEBUG — TARUH DI SINI
    print("CLOUD NAME:", cloudinary.config().cloud_name)
    print("FILE NAME:", file.filename)

    if file and allowed_file(file.filename):
        try:
            result = cloudinary.uploader.upload(
                file,
                folder="urcv/profile",
                resource_type="image"
            )

            return jsonify({
                "msg": "Upload berhasil",
                "photo_url": result["secure_url"]
            }), 200

        except Exception as e:
            print("UPLOAD ERROR:", e)  # ⬅️ INI PENTING
            return jsonify({
                "error": "Upload gagal",
                "detail": str(e)
            }), 500

    return jsonify({"error": "Format file tidak diperbolehkan"}), 400
