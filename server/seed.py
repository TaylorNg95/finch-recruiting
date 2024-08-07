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
    bob = User(name='Bob', email='Bob@gmail.com', username='bob123')
    bob.password_hash = 'pw123'
    sanela = User(name='Sanela', email='Sanela@gmail.com', username='sanela123')
    sanela.password_hash = 'pw456'

    db.session.add_all([bob, sanela])
    db.session.commit()

    # Seed recruits
    taylor = Recruit(user_id=1, name='Taylor', location='New Jersey', classYear=2025, email='taylor@gmail.com', cell='1-555-555-5555')
    kana = Recruit(user_id=2, name='Kana', location='Philadelphia', classYear=2026, email='kana@gmail.com', cell='1-444-444-4444')
    erica = Recruit(user_id=1, name='Erica', location='Boston', classYear=2025, email='erica@gmail.com', cell='1-222-222-2222')
    dayna = Recruit(user_id=1, name='Dayna', location='Rhode Island', classYear=2026, email='dayna@gmail.com', cell='1-111-111-1111')
    brittany = Recruit(user_id=2, name='Brittany', location='Massachusetts', classYear=2027, email='brittany@gmail.com', cell='1-777-777-7777')

    db.session.add_all([taylor, kana, erica, dayna, brittany])
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
    tp1 = Touchpoint(player_id=1, meetingType_id=1, date='2024-06-15', notes='Can improve. Well spoken.')
    tp2 = Touchpoint(player_id=2, meetingType_id=1, date='2024-06-15', notes='First outreach.')
    tp3 = Touchpoint(player_id=2, meetingType_id=2, date='2024-06-30', notes='Will not make it to clays.')
    tp4 = Touchpoint(player_id=3, meetingType_id=1, date='2024-06-15', notes='Has younger sister.')
    tp5 = Touchpoint(player_id=3, meetingType_id=4, date='2024-07-01', notes='Forehand is a liability, competes well.')
    tp6 = Touchpoint(player_id=4, meetingType_id=2, date='2024-07-16', notes='Not intersted in Dartmouth.')
    tp7 = Touchpoint(player_id=5, meetingType_id=2, date='2024-06-15', notes='Initial text.')
    tp8 = Touchpoint(player_id=5, meetingType_id=4, date='2024-08-04', notes='Watched her play at hard courts.')

    db.session.add_all([tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8])
    db.session.commit()