import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'secret123')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'mysql+pymysql://cvuser:cvpassword@localhost/cvbuilder')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret')
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'uploads')
