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
            return {'error': 'Invalid credentials'}, 401
        
api.add_resource(Login, '/api/login')