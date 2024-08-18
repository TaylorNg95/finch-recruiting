from config import api, db
from flask import request
from flask_restful import Resource
from models.contact import Contact
from sqlalchemy.exc import IntegrityError

class ContactsResource(Resource):
    def get(self):
        contacts = Contact.query.all()
        return [contact.to_dict() for contact in contacts], 200
    
    def post(self):
        data = request.get_json()
        recruit_id = data.get('recruit_id')
        meetingType_id = data.get('meetingType_id')
        date = data.get('date')
        notes = data.get('notes')
        try:
            contact = Contact(recruit_id=recruit_id, meetingType_id=meetingType_id, date=date, notes=notes)
            db.session.add(contact)
            db.session.commit()
            return contact.to_dict(), 201
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError as e:
            return {'error': str(e)}, 422
        
class ContactResource(Resource):
    def get(self, id):
        contact = Contact.query.filter(Contact.id == id).first()
        return contact.to_dict(), 200
    
    def patch(self, id):
        contact = Contact.query.filter(Contact.id == id).first()
        data = request.get_json()
        for attr in data:
            setattr(contact, attr, data.get(attr))
        try:
            db.session.add(contact)
            db.session.commit()
            return contact.to_dict(), 200
        except ValueError as e:
            return {'error': str(e)}, 422
        except IntegrityError as e:
            return {'error': str(e)}, 422
        
    def delete(self, id):
        contact = Contact.query.filter(Contact.id == id).first()
        try:    
            db.session.delete(contact)
            db.session.commit()
            return {}, 204
        except:
            return {'error': 'Invalid contact ID'}, 422

api.add_resource(ContactsResource, '/api/contacts')
api.add_resource(ContactResource, '/api/contacts/<int:id>')