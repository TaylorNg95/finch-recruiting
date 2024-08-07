from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import re

class Recruit(db.Model, SerializerMixin):
    __tablename__ = 'recruits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    classYear = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String)
    cell = db.Column(db.String)
    archived = db.Column(db.Boolean, default=False)
    # not yet included: nextTouchpoint, topRecruit tag

    def __repr__(self):
        return f'<Recruit id={self.id} name={self.name}>'