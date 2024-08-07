from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class meetingType(db.Model, SerializerMixin):
    __tablename__ = 'meetingTypes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False) # will be text, call, video, in-person, other

    def __repr__(self):
        return f'<MeetingType id={self.id} type={self.type}>'