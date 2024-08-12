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
        
class RecruitResource(Resource):
    def get(self, id):
        recruit = Recruit.query.filter(Recruit.id == id).first()
        return recruit.to_dict(), 200
    
    def patch(self, id):
        data = request.get_json()
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        location = data.get('location')
        classYear = data.get('classYear')
        email = data.get('email')
        cell = data.get('cell')
        next_touchpoint = data.get('next_touchpoint')
        high_priority = data.get('high_priority')
        try:
            recruit = Recruit.query.filter(Recruit.id == id).first()
            recruit.first_name = first_name
            recruit.last_name = last_name
            recruit.location = location
            recruit.classYear = classYear
            recruit.email = email
            recruit.cell = cell
            recruit.next_touchpoint = next_touchpoint
            recruit.high_priority = high_priority
            db.session.add(recruit)
            db.session.commit()
            return recruit.to_dict(), 200
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError:
            return {'error': 'Invalid data'}, 422
        
    def delete(self, id):
        recruit = Recruit.query.filter(Recruit.id == id).first()        
        try:
            db.session.delete(recruit)
            db.session.commit()
            return {}, 204
        except:
            return {'error': 'Invalid recruit ID'}

api.add_resource(RecruitsResource, '/api/recruits')
api.add_resource(RecruitResource, '/api/recruits/<int:id>')