from config import api
from flask_restful import Resource
from models.meetingType import MeetingType

class MeetingTypesResource(Resource):
    def get(self):
        meetingTypes = MeetingType.query.all()
        return [meetingType.to_dict() for meetingType in meetingTypes], 200
    
api.add_resource(MeetingTypesResource, '/api/meeting-types')