from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import re

class Recruit(db.Model, SerializerMixin):
    __tablename__ = 'recruits'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    classYear = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String)
    cell = db.Column(db.String)
    archived = db.Column(db.Boolean, default=False)
    # not yet included: nextTouchpoint, topRecruit tag

    user = db.relationship('User', back_populates='recruits')
    touchpoints = db.relationship('Touchpoint', back_populates='recruit')

    serialize_rules = ('-user.recruits', '-touchpoints.recruit')

    def __repr__(self):
        return f'<Recruit id={self.id} name={self.name}>'
    
    @validates('first_name', 'last_name', 'location')
    def check_inputs(self, key, input):
        if input == '':
            raise ValueError('Name and location required')
        else:
            return input
        
    @validates('email')
    def check_email(self, key, email):
        if email and not re.fullmatch(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            raise ValueError('Email invalid')
        else:
            return email
        
    @validates('cell')
    def check_cell(self, key, cell):
        if cell and not re.fullmatch(r'^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', cell):
            raise ValueError('Cell number invalid')
        else:
            return cell