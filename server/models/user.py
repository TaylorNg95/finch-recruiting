from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    notifications = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<User id={self.id} name={self.name}>'


