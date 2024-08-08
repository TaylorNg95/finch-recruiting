from config import api, db
from flask import request
from flask_restful import Resource
from models.touchpoint import Touchpoint
from sqlalchemy.exc import IntegrityError

class TouchpointsResource(Resource):
    def get(self):
        touchpoints = Touchpoint.query.all()
        return [touchpoint.to_dict() for touchpoint in touchpoints]
    
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

api.add_resource(TouchpointsResource, '/api/touchpoints')