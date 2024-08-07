from config import api, db
from flask import request
from flask_restful import Resource
from models.user import User
from sqlalchemy.exc import IntegrityError

from flask_login import login_user, current_user, logout_user

class Signup(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        try:
            user = User(name=name, email=email, username=username)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return current_user.to_dict(), 201
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError as e:
            return {'error': str(e)}, 422

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            login_user(user)
            return current_user.to_dict(), 200
        else:
            return {'error': 'Invalid credentials'}, 422

class CheckSession(Resource):
    def get(self):
        if current_user.get_id():
            return current_user.to_dict(), 200
        else:
            return {'message': 'User not logged in'}, 401

class Logout(Resource):
    def delete(self):
        if current_user.get_id():
            logout_user()
            return {}, 204
        else:
            return {'error': 'User not logged in'}, 401
        
api.add_resource(Login, '/api/login')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Logout, '/api/logout')