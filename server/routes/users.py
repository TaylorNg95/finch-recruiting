from config import api
from flask import request, session
from flask_restful import Resource
from models.user import User

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {'error': 'Invalid credentials'}, 422

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {'message': 'User not logged in'}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            del session['user_id']
            return {}, 204
        else:
            return {'error': 'User not logged in'}, 401
        
api.add_resource(Login, '/api/login')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Logout, '/api/logout')