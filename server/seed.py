from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.touchpoint import Touchpoint
from config import app, db

with app.app_context():
    
    # Clear tables
    User.query.delete()
    Recruit.query.delete()
    MeetingType.query.delete()
    Touchpoint.query.delete()

    # Seed users
    bob = User(first_name='Bob', last_name='Dallis', email='bankingontennis@gmail.com')
    bob.password_hash = 'pw123'
    sanela = User(first_name='Sanela', last_name='Kunovac', email='taylormng95@gmail.com')
    sanela.password_hash = 'pw456'
    taylor = User(first_name='Taylor', last_name='Ng', email='taylor.m.ng.17@dartmouth.edu')
    taylor.password_hash = 'pw789'

    db.session.add_all([bob, sanela, taylor])
    db.session.commit()

    # Seed recruits
    taylor = Recruit(user_id=1, first_name='Taylor', last_name='Ng', location='New Jersey', classYear=2025, email='taylor@gmail.com', cell='1-555-555-5555', next_touchpoint='2024-08-13')
    kana = Recruit(user_id=2, first_name='Kana', last_name='Daniel', location='Philadelphia', classYear=2026, email='kana@gmail.com', cell='1-444-444-4444', next_touchpoint='2024-08-13')
    erica = Recruit(user_id=1, first_name='Erica', last_name='Oosterhaut', location='Boston', classYear=2025, email='erica@gmail.com', cell='1-222-222-2222', next_touchpoint='2024-08-14')
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

    # Seed touchpoints
    tp1 = Touchpoint(recruit_id=1, meetingType_id=1, date='2024-08-04', notes='Can improve. Well spoken.')
    tp2 = Touchpoint(recruit_id=2, meetingType_id=1, date='2024-08-08', notes='First outreach.')
    tp3 = Touchpoint(recruit_id=2, meetingType_id=2, date='2024-08-07', notes='Will not make it to clays.')
    tp4 = Touchpoint(recruit_id=3, meetingType_id=1, date='2024-08-08', notes='Has younger sister.')
    tp5 = Touchpoint(recruit_id=3, meetingType_id=4, date='2024-08-06', notes='Forehand is a liability, competes well.')
    tp6 = Touchpoint(recruit_id=4, meetingType_id=2, date='2024-08-07', notes='Not intersted in Dartmouth.')
    tp7 = Touchpoint(recruit_id=5, meetingType_id=2, date='2024-08-08', notes='Initial text.')
    tp8 = Touchpoint(recruit_id=5, meetingType_id=4, date='2024-08-11', notes='Watched her play at hard courts.')

    db.session.add_all([tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8])
    db.session.commit()