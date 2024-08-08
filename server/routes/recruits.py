from config import api, db
from flask import request
from flask_restful import Resource
from models.recruit import Recruit
from sqlalchemy.exc import IntegrityError

class RecruitsResource(Resource):
    def get(self):
        recruits = Recruit.query.all()
        return [recruit.to_dict() for recruit in recruits], 200
    
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        location = data.get('location')
        classYear = data.get('classYear')
        email = data.get('email')
        cell = data.get('cell')
        try:
            recruit = Recruit(user_id=user_id, first_name=first_name, last_name=last_name, location=location, classYear=classYear, email=email, cell=cell)
            db.session.add(recruit)
            db.session.commit()
            return recruit.to_dict(), 201
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError:
            return {'error': 'Invalid data'}, 422

api.add_resource(RecruitsResource, '/api/recruits')