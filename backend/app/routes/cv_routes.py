from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import (
    CV, Education, Experience, Skill, Leadership, Activity,
    Language, Interest, Template
)

from datetime import datetime, date

cv_bp = Blueprint('cv', __name__)

def parse_date(date_str):
    if date_str:
        try:
            return datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return None
    return None

@cv_bp.route('/templates', methods=['GET'])
@jwt_required()
def get_templates():
    templates = Template.query.all()
    result = [{
        "id": t.id,
        "name": t.name,
        "preview_image_url": t.preview_image_url
    } for t in templates]
    return jsonify(result), 200

@cv_bp.route('/cv', methods=['POST'])
@jwt_required()
def create_cv():
    user_id = get_jwt_identity()
    data = request.get_json()

    for field in ['first_name', 'last_name', 'email', 'phone', 'template_id']:
        if not data.get(field):
            return jsonify({"error": f"'{field}' wajib diisi"}), 400

    new_cv = CV(
        user_id=user_id,
        template_id=data['template_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data['phone'],
        city=data.get('city'),
        photo_url=data.get('photo_url'),
        profile_description=data.get('profile_description')
    )

    db.session.add(new_cv)
    db.session.flush()

    for model_class, field_name in [
        (Education, 'educations'), (Experience, 'experiences'), (Skill, 'skills'),
        (Leadership, 'leaderships'), (Activity, 'activities'),
        (Language, 'languages'), (Interest, 'interests')
    ]:
        for item in data.get(field_name, []):
            instance = model_class(cv_id=new_cv.id)
            for key, value in item.items():
                if 'date' in key:
                    setattr(instance, key, parse_date(value))
                else:
                    setattr(instance, key, value)
            db.session.add(instance)

    db.session.commit()
    return jsonify({"msg": "CV berhasil dibuat", "cv_id": new_cv.id}), 201

@cv_bp.route('/cv', methods=['GET'])
@jwt_required()
def get_cvs():
    user_id = get_jwt_identity()
    cvs = CV.query.filter_by(user_id=user_id).all()
    result = []

    for cv in cvs:
        result.append({
            "id": cv.id,
            "first_name": cv.first_name,
            "last_name": cv.last_name,
            "email": cv.email,
            "phone": cv.phone,
            "city": cv.city,
            "photo_url": cv.photo_url,
            "profile_description": cv.profile_description,
            "created_at": cv.created_at.isoformat(),
            "template_id": cv.template_id,
            "educations": [serialize_model(e) for e in cv.educations],
            "experiences": [serialize_model(e) for e in cv.experiences],
            "skills": [serialize_model(s) for s in cv.skills],
            "leaderships": [serialize_model(l) for l in cv.leaderships],
            "activities": [serialize_model(a) for a in cv.activities],
            "languages": [serialize_model(l) for l in cv.languages],
            "interests": [serialize_model(i) for i in cv.interests]
        })

    return jsonify(result), 200

@cv_bp.route('/cv/<int:id>', methods=['PUT'])
@jwt_required()
def update_cv(id):
    user_id = get_jwt_identity()
    cv = CV.query.filter_by(id=id, user_id=user_id).first_or_404()
    data = request.get_json()

    for field in [
        'first_name', 'last_name', 'email', 'phone', 'city',
        'photo_url', 'profile_description', 'template_id'
    ]:
        if field in data:
            setattr(cv, field, data[field])

    # Clear and re-add all related models
    for model_class, field_name in [
        (Education, 'educations'), (Experience, 'experiences'), (Skill, 'skills'),
        (Leadership, 'leaderships'), (Activity, 'activities'),
        (Language, 'languages'), (Interest, 'interests')
    ]:
        model_class.query.filter_by(cv_id=cv.id).delete()
        for item in data.get(field_name, []):
            instance = model_class(cv_id=cv.id)
            for key, value in item.items():
                if 'date' in key:
                    setattr(instance, key, parse_date(value))
                else:
                    setattr(instance, key, value)
            db.session.add(instance)

    db.session.commit()
    return jsonify({"msg": "CV berhasil diperbarui"}), 200

@cv_bp.route('/cv/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_cv(id):
    user_id = get_jwt_identity()
    cv = CV.query.filter_by(id=id, user_id=user_id).first_or_404()
    db.session.delete(cv)
    db.session.commit()
    return jsonify({"msg": "CV berhasil dihapus"}), 200

def serialize_model(obj):
    result = {}
    for column in obj.__table__.columns:
        value = getattr(obj, column.name)
        if isinstance(value, (datetime, date)):  # tangani datetime dan date
            value = value.isoformat()
        result[column.name] = value
    return result

@cv_bp.route('/dashboard-stats', methods=['GET'])
@jwt_required()
def dashboard_stats():
    user_id = get_jwt_identity()

    # Hitung total CV
    total_cvs = CV.query.filter_by(user_id=user_id).count()

    # Ambil CV terakhir berdasarkan tanggal dibuat
    last_cv = CV.query.filter_by(user_id=user_id).order_by(CV.created_at.desc()).first()
    last_activity = last_cv.created_at.isoformat() if last_cv else None

    return jsonify({
        "total_cvs": total_cvs,
        "last_activity": last_activity
    }), 200