from config import db
from sqlalchemy_serializer import SerializerMixin

class MeetingType(db.Model, SerializerMixin):
    __tablename__ = 'meeting_types'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    contacts = db.relationship('Contact', back_populates='meetingType')

    serialize_rules = ('-contacts.meetingType',)

    def __repr__(self):
        return f'<MeetingType id={self.id} type={self.type}>'