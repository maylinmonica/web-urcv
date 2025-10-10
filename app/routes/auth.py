from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models import User
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    if not name or not email or not password:
        return jsonify({"msg": "Semua field (name, email, password) wajib diisi"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(name=name, email=email, password=hashed_pw)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "Register berhasil"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg": "Email sudah terdaftar"}), 409

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    if not email or not password:
        return jsonify({"msg": "Email dan password wajib diisi"}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        token = create_access_token(identity=str(user.id))  # ID sebagai identity JWT
        return jsonify({
            "msg": "Login berhasil",
            "token": token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role   
            }
        }), 200

    return jsonify({"msg": "Login gagal. Email atau password salah."}), 401

