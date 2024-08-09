from config import api, db
from flask import request
from flask_restful import Resource
from models.touchpoint import Touchpoint
from sqlalchemy.exc import IntegrityError

class TouchpointsResource(Resource):
    def get(self):
        touchpoints = Touchpoint.query.all()
        return [touchpoint.to_dict() for touchpoint in touchpoints], 200
    
    def post(self):
        data = request.get_json()
        recruit_id = data.get('recruit_id')
        meetingType_id = data.get('meetingType_id')
        date = data.get('date')
        notes = data.get('notes')
        try:
            touchpoint = Touchpoint(recruit_id=recruit_id, meetingType_id=meetingType_id, date=date, notes=notes)
            db.session.add(touchpoint)
            db.session.commit()
            return touchpoint.to_dict(), 201
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError as e:
            return {'error': str(e)}, 422
        
class TouchpointResource(Resource):
    def get(self, id):
        touchpoint = Touchpoint.query.filter(Touchpoint.id == id).first()
        return touchpoint.to_dict(), 200
    
    def patch(self, id):
        data = request.get_json()
        recruit_id = data.get('recruit_id')
        meetingType_id = data.get('meetingType_id')
        date = data.get('date')
        notes = data.get('notes')
        try:
            touchpoint = Touchpoint.query.filter(Touchpoint.id == id).first()
            touchpoint.recruit_id = recruit_id
            touchpoint.meetingType_id = meetingType_id
            touchpoint.date = date
            touchpoint.notes = notes
            db.session.add(touchpoint)
            db.session.commit()
            return touchpoint.to_dict(), 200
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError as e:
            return {'error': str(e)}, 422
        
    def delete(self, id):
        touchpoint = Touchpoint.query.filter(Touchpoint.id == id).first()
        try:    
            db.session.delete(touchpoint)
            db.session.commit()
            return {}, 204
        except:
            return {'error': 'Invalid touchpoint ID'}, 422

api.add_resource(TouchpointsResource, '/api/touchpoints')
api.add_resource(TouchpointResource, '/api/touchpoints/<int:id>')