from flask import Blueprint, make_response, render_template, jsonify
from weasyprint import HTML
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import CV
from sqlalchemy.orm import joinedload

pdf_bp = Blueprint('pdf', __name__)

@pdf_bp.route('/cv/<int:cv_id>/download', methods=['GET'])
@jwt_required()
def download_cv_pdf(cv_id):
    user_id = get_jwt_identity()

    cv = CV.query.options(
        joinedload(CV.educations),
        joinedload(CV.experiences),
        joinedload(CV.skills),
        joinedload(CV.leaderships),
        joinedload(CV.activities),
        joinedload(CV.languages),
        joinedload(CV.interests),
        joinedload(CV.template)
    ).filter_by(id=cv_id, user_id=user_id).first()

    if not cv:
        return jsonify({"error": "CV tidak ditemukan atau bukan milik user ini."}), 404

    try:
        html = render_template(cv.template.filename, cv=cv)
        pdf = HTML(string=html).write_pdf()
    except Exception as e:
        return jsonify({"error": f"Gagal merender PDF: {str(e)}"}), 500

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'attachment; filename=CV_{cv.first_name}_{cv.last_name}.pdf'
    return response

@pdf_bp.route('/cv/<int:cv_id>/preview', methods=['GET'])
@jwt_required()
def preview_cv_html(cv_id):
    user_id = get_jwt_identity()

    cv = CV.query.options(
        joinedload(CV.educations),
        joinedload(CV.experiences),
        joinedload(CV.skills),
        joinedload(CV.leaderships),
        joinedload(CV.activities),
        joinedload(CV.languages),
        joinedload(CV.interests),
        joinedload(CV.template)
    ).filter_by(id=cv_id, user_id=user_id).first()

    if not cv:
        return jsonify({"error": "CV tidak ditemukan atau bukan milik user ini."}), 404

    try:
        return render_template(cv.template.filename, cv=cv)
    except Exception as e:
        return jsonify({"error": f"Gagal merender preview: {str(e)}"}), 500
