from config import api, db, mail
from flask import request
from flask_restful import Resource
from models.user import User
from flask_login import login_user, current_user, logout_user
from sqlalchemy.exc import IntegrityError
from helpers import generate_message

class Signup(Resource):
    def post(self):
        data = request.get_json()
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email').lower()
        password = data.get('password')
        try:
            user = User(first_name=first_name, last_name=last_name, email=email)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            login_user(user)

            msg = generate_message(user, 'Welcome to Finch!', 'welcome.html')
            mail.send(msg)

            return current_user.to_dict(), 201
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError:
            return {'error': 'Email taken. Please try again.'}, 422

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email').lower()
        password = data.get('password')
        
        user = User.query.filter(User.email == email).first()
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
        logout_user()
        return {}, 204
        
api.add_resource(Login, '/api/login')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Logout, '/api/logout')