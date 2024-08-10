from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import re

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    cell = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    notifications = db.Column(db.Boolean, default=True)

    recruits = db.relationship('Recruit', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-recruits.user',)

    def __repr__(self):
        return f'<User id={self.id} name={self.first_name} {self.last_name}>'

    @hybrid_property
    def password_hash(self):
        if self._password_hash == '':
            raise ValueError('Password required')
        else:
            raise AttributeError('Cannot be accessed')
        
    @password_hash.setter
    def password_hash(self, password):
        pw_hash = bcrypt.generate_password_hash(password)
        self._password_hash = pw_hash.decode()

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    @validates('first_name', 'last_name', 'username')
    def check_inputs(self, key, input):
        if input == '':
            raise ValueError('Name and username required')
        else:
            return input
        
    @validates('email')
    def check_email(self, key, email):
        if email == '':
            raise ValueError('Email required')
        elif not re.fullmatch(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            raise ValueError('Email invalid')
        else:
            return email
        
    @validates('cell')
    def check_cell(self, key, cell):
        if cell == '':
            raise ValueError('Cell required')
        elif not re.fullmatch(r'^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', cell):
            raise ValueError('Cell number invalid')
        else:
            return cell