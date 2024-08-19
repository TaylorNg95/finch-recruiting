from config import api, db
from flask import request
from flask_restful import Resource
from models.user import User
from sqlalchemy.exc import IntegrityError

class UserResource(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        return user.to_dict(), 200
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        data = request.get_json()
        for attr in data:
            setattr(user, attr, data.get(attr))
        try:
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 200
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError:
            return {'error': 'Invalid data'}, 422
        
api.add_resource(UserResource, '/api/users/<int:id>')