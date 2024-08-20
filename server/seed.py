from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.contact import Contact
from config import app, db

with app.app_context():
    
    # Clear tables
    User.query.delete()
    Recruit.query.delete()
    MeetingType.query.delete()
    Contact.query.delete()

    # Seed users
    coach = User(first_name='coach_fname', last_name='coach_lname', email='coach@gmail.com')
    coach.password_hash = 'coach123'

    db.session.add(coach)
    db.session.commit()

    # Seed recruits
    recruit = Recruit(user_id=1, first_name='recruit_fname', last_name='recruit_lname', location='New York', classYear=2025, email='recruit@gmail.com', cell='1-555-555-5555')

    db.session.add(recruit)
    db.session.commit()

    # Seed meeting types -- REQUIRED
    text = MeetingType(type='Text')
    call = MeetingType(type='Call')
    video = MeetingType(type='Video')
    in_person = MeetingType(type='In-Person')
    other = MeetingType(type='Other')

    db.session.add_all([text, call, video, in_person, other])
    db.session.commit()

    # Seed contacts
    contact = Contact(recruit_id=1, meetingType_id=1, date='2024-08-20', notes='Initial outreach')

    db.session.add(contact)
    db.session.commit()