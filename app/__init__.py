import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config

# Inisialisasi ekstensi Flask
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inisialisasi ekstensi
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app, supports_credentials=True)

    # Static file handler untuk gambar upload (agar React bisa akses)
    @app.route('/static/uploads/<path:filename>')
    def uploaded_file(filename):
        upload_folder = os.path.join(app.root_path, '..', 'static', 'uploads')
        return send_from_directory(upload_folder, filename)

    # Blueprint: Auth (register & login)
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')

    # Blueprint: User (pengaturan user)
    from app.routes.user import user_bp
    app.register_blueprint(user_bp, url_prefix='/api')

    # Blueprint: CV (buat, edit, hapus CV)
    from app.routes.cv_routes import cv_bp
    app.register_blueprint(cv_bp, url_prefix='/api')

    # Blueprint: Upload foto profil
    from app.routes.upload import upload_bp
    app.register_blueprint(upload_bp, url_prefix='/api')

    # Blueprint: Download & preview PDF CV
    from app.routes.cv_pdf import pdf_bp
    app.register_blueprint(pdf_bp, url_prefix='/api')

    # Blueprint: Blog artikel (admin only)
    from app.routes.blog import blog_bp
    app.register_blueprint(blog_bp, url_prefix='/api')

    return app
