import os
from flask import Blueprint, request, jsonify, current_app
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

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filename = f"{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{filename}"

        # Path folder penyimpanan
        upload_folder = os.path.join(current_app.root_path, '..', 'static', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)

        # Simpan file
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)

        # Buat URL lengkap agar bisa ditampilkan React
        photo_url = request.host_url.rstrip('/') + f"/static/uploads/{filename}"

        return jsonify({
            "msg": "Upload berhasil",
            "photo_url": photo_url
        }), 200

    return jsonify({"error": "Format file tidak diperbolehkan"}), 400
