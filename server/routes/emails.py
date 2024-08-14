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
            return {'error': 'Email error, please try again later'}, 422

class TouchpointReminders(Resource):
    def post(self):
        user_id = request.get_json().get('user_id')
        user = User.query.filter(User.id == user_id).first()
        try:
            sendTouchpointReminder(user)
            return {'message': 'Sent!'}, 201
        except:
            return {'error': 'Email error, please try again later'}, 422
        
api.add_resource(WeeklySummary, '/api/send-weekly-summary')
api.add_resource(TouchpointReminders, '/api/send-touchpoint-reminders')