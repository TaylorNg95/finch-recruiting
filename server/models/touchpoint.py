from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import re

class Touchpoint(db.Model, SerializerMixin):
    __tablename__ = 'touchpoints'

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('recruits.id'), nullable=False)
    meetingType_id = db.Column(db.Integer, db.ForeignKey('meeting_types.id'), nullable=False)
    date = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)

    def __repr__(self):
        return f'<Touchpoint id={self.id} player_id={self.player_id}>'

    @validates('date')
    def validate_date(self, key, date):
        if not re.fullmatch(r'^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$', date):
            raise ValueError('Date invalid')
        else:
            return date