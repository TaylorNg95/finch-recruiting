from flask import request
from config import api
from flask_restful import Resource
from models.user import User
from emails.email import sendWeeklySummary, sendTouchpointReminder

class WeeklySummary(Resource):
    def post(self):
        user_id = request.get_json().get('user_id')
        user = User.query.filter(User.id == user_id).first()
        try:
            sendWeeklySummary(user)
            return {'message': 'Sent!'}, 201
        except:
            return {'error': 'Error sending email'}, 422

class TouchpointReminder(Resource):
    def post(self):
        user = request.get_json().get('user')
        try:
            sendTouchpointReminder(user)
            return {'message': 'Sent!'}
        except:
            return {'error': 'Error sending email'}, 422
        
api.add_resource(WeeklySummary, '/api/send-weekly-summary')
api.add_resource(TouchpointReminder, '/api/send-touchpoint-reminder')