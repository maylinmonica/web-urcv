from flask import Blueprint, request, jsonify
from app import db
from app.models import Blog, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps

blog_bp = Blueprint('blog', __name__)

# Middleware untuk mengecek apakah user adalah admin
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or user.role != 'admin':
            return jsonify({"msg": "Unauthorized, admin only"}), 403
        return fn(*args, **kwargs)
    return wrapper

# Get semua artikel (public)
@blog_bp.route('/blogs', methods=['GET'])
def get_all_blogs():
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()
    return jsonify([{
        "id": blog.id,
        "title": blog.title,
        "description": blog.description,
        "content": blog.content,
        "image_url": blog.image_url,  
        "created_at": blog.created_at.isoformat()
    } for blog in blogs]), 200

# Get artikel by ID (public)
@blog_bp.route('/blogs/<int:id>', methods=['GET'])
def get_blog(id):
    blog = Blog.query.get_or_404(id)
    return jsonify({
        "id": blog.id,
        "title": blog.title,
        "description": blog.description,
        "content": blog.content,
        "image_url": blog.image_url, 
        "created_at": blog.created_at.isoformat()
    }), 200

# Buat artikel baru (admin only)
@blog_bp.route('/blogs', methods=['POST'])
@jwt_required()
@admin_required
def create_blog():
    data = request.get_json()

    title = data.get("title", "").strip()
    description = data.get("description", "").strip()
    content = data.get("content", "").strip()
    image_url = data.get("image_url", "").strip()  

    if not title or not description or not content:
        return jsonify({"msg": "Semua field wajib diisi"}), 400

    blog = Blog(
        title=title,
        description=description,
        content=content,
        image_url=image_url  
    )
    db.session.add(blog)
    db.session.commit()

    return jsonify({"msg": "Blog berhasil dibuat", "id": blog.id}), 201

# Update artikel (admin only)
@blog_bp.route('/blogs/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_blog(id):
    blog = Blog.query.get_or_404(id)
    data = request.get_json()

    blog.title = data.get("title", blog.title)
    blog.description = data.get("description", blog.description)
    blog.content = data.get("content", blog.content)
    blog.image_url = data.get("image_url", blog.image_url) 

    db.session.commit()
    return jsonify({"msg": "Blog berhasil diperbarui"}), 200

# Hapus artikel (admin only)
@blog_bp.route('/blogs/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_blog(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({"msg": "Blog berhasil dihapus"}), 200
