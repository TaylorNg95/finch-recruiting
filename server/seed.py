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
    bob = User(first_name='Bob', last_name='Dallis', email='bankingontennis@gmail.com')
    bob.password_hash = 'pw123'
    sanela = User(first_name='Sanela', last_name='Kunovac', email='taylormng95@gmail.com')
    sanela.password_hash = 'pw456'

    db.session.add_all([bob, sanela])
    db.session.commit()

    # Seed recruits
    taylor = Recruit(user_id=1, first_name='Taylor', last_name='Ng', location='New Jersey', classYear=2025, email='taylor@gmail.com', cell='1-555-555-5555', next_contact='2024-08-13')
    kana = Recruit(user_id=2, first_name='Kana', last_name='Daniel', location='Philadelphia', classYear=2026, email='kana@gmail.com', cell='1-444-444-4444', next_contact='2024-08-13')
    erica = Recruit(user_id=1, first_name='Erica', last_name='Oosterhaut', location='Boston', classYear=2025, email='erica@gmail.com', cell='1-222-222-2222', next_contact='2024-08-14')
    dayna = Recruit(user_id=1, first_name='Dayna', last_name='Lord', location='Rhode Island', classYear=2026, email='dayna@gmail.com', cell='1-111-111-1111')
    brittany = Recruit(user_id=2, first_name='Brittany', last_name='Collens', location='Massachusetts', classYear=2027, email='brittany@gmail.com', cell='1-777-777-7777')
    justina = Recruit(user_id=1, first_name='Justina', last_name='Mikulskyte', location='Lithuania', classYear=2027, email='justina@gmail.com', cell='+91-777-777-7777')

    db.session.add_all([taylor, kana, erica, dayna, brittany, justina])
    db.session.commit()

    # Seed meeting types
    call = MeetingType(type='Call')
    text = MeetingType(type='Text')
    video = MeetingType(type='Video')
    in_person = MeetingType(type='In-Person')
    other = MeetingType(type='Other')

    db.session.add_all([call, text, video, in_person, other])
    db.session.commit()

    # Seed contacts
    tp1 = Contact(recruit_id=1, meetingType_id=1, date='2024-08-14', notes='Can improve. Well spoken.')
    tp2 = Contact(recruit_id=2, meetingType_id=1, date='2024-08-18', notes='First outreach.')
    tp3 = Contact(recruit_id=2, meetingType_id=2, date='2024-08-17', notes='Will not make it to clays.')
    tp4 = Contact(recruit_id=3, meetingType_id=1, date='2024-08-12', notes='Has younger sister.')
    tp5 = Contact(recruit_id=3, meetingType_id=4, date='2024-08-16', notes='Forehand is a liability, competes well.')
    tp6 = Contact(recruit_id=4, meetingType_id=2, date='2024-08-17', notes='Not intersted in Dartmouth.')
    tp7 = Contact(recruit_id=5, meetingType_id=2, date='2024-08-13', notes='Initial text.')
    tp8 = Contact(recruit_id=5, meetingType_id=4, date='2024-08-11', notes='Watched her play at hard courts.')

    db.session.add_all([tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8])
    db.session.commit()