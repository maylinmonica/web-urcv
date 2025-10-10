from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default="user")  # NEW: role untuk admin/user

    cvs = db.relationship('CV', backref='user', lazy=True)


class Template(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    filename = db.Column(db.String(100), nullable=False)
    preview_image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    cvs = db.relationship('CV', backref='template', lazy=True)


class CV(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey('template.id'), nullable=False)

    # Wajib
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    # Opsional
    city = db.Column(db.String(100))  # Domisili saja
    photo_url = db.Column(db.String(255))
    profile_description = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relasi
    educations = db.relationship('Education', backref='cv', lazy=True, cascade="all, delete")
    experiences = db.relationship('Experience', backref='cv', lazy=True, cascade="all, delete")
    skills = db.relationship('Skill', backref='cv', lazy=True, cascade="all, delete")
    leaderships = db.relationship('Leadership', backref='cv', lazy=True, cascade="all, delete")
    activities = db.relationship('Activity', backref='cv', lazy=True, cascade="all, delete")
    languages = db.relationship('Language', backref='cv', lazy=True, cascade="all, delete")
    interests = db.relationship('Interest', backref='cv', lazy=True, cascade="all, delete")


class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.id'), nullable=False)
    level = db.Column(db.String(10))  # SD, SMP, SMA, D3, S1, S2, S3
    school_name = db.Column(db.String(255))
    city = db.Column(db.String(100))
    major = db.Column(db.String(100))
    degree = db.Column(db.String(100))
    gpa = db.Column(db.Float)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    description = db.Column(db.Text)


class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.id'), nullable=False)
    job_title = db.Column(db.String(100))
    company = db.Column(db.String(100))
    city = db.Column(db.String(100))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    description = db.Column(db.Text)


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(50))
    description = db.Column(db.Text)


class Leadership(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.id'), nullable=False)
    role = db.Column(db.String(100))
    organization = db.Column(db.String(100))
    city = db.Column(db.String(100))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    description = db.Column(db.Text)


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.id'), nullable=False)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)


class Language(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.id'), nullable=False)
    name = db.Column(db.String(100))
    proficiency = db.Column(db.String(50))  # e.g., Native, Fluent, Conversational


class Interest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.id'), nullable=False)
    description = db.Column(db.String(255))

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(512)) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
