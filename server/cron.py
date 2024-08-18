from config import app, mail
from flask_mail import Message
from models.user import User
from models.recruit import Recruit
from models.touchpoint import Touchpoint
from models.meetingType import MeetingType
import datetime as dt

today = dt.datetime.now().date().isoformat() # current date
week_ago = (dt.datetime.now() - dt.timedelta(days=7)).date().isoformat() # date one week ago

def daily_reminder():
    with app.app_context():
        recruits_to_contact = Recruit.query.filter(Recruit.next_touchpoint == today)
        if not recruits_to_contact:
            return None # don't send email if no recruits to contact
        users_to_contact = set([recruit.user for recruit in recruits_to_contact])
        for user in users_to_contact:
            recruits = [recruit for recruit in recruits_to_contact if recruit.user_id == user.id]
            message_strings = ''.join([f"<li>{recruit.first_name} {recruit.last_name}</li>" for recruit in recruits])
            msg = generate_message(user, 'Your Contact Reminders', 'touchpoint_reminder.html', message_strings)
            mail.send(msg)

def weekly_summary():
    with app.app_context():
        all_tp_this_week = [tp for tp in Touchpoint.query.all() if week_ago <= tp.date <= today]
        for user in User.query.all():
            user_recruit_ids = [recruit.id for recruit in user.recruits]
            user_tp_this_week = sorted([tp for tp in all_tp_this_week if tp.recruit_id in user_recruit_ids], key=lambda x:x.date, reverse=True)
            message_strings = ''.join([f"<li>{tp.date[5:] + '-' + tp.date[2:4]}: {tp.meetingType.type} with {tp.recruit.first_name} {tp.recruit.last_name}</li>" for tp in user_tp_this_week]) if user_tp_this_week else '<li>No logged activity</li>'
            msg = generate_message(user, 'Your Weekly Activity Summary', 'weekly_summary.html', message_strings)
            mail.send(msg)

def generate_message(user, subject, template, items=None):
    msg = Message(subject=subject, recipients=[user.email])
    with open(f'emails/{template}', 'r') as file:
        html_content = file.read()
        html_content = html_content.replace(f'{{name}}', user.first_name)
        if items:
            html_content = html_content.replace(f'{{items}}', items)

    msg.html = html_content
    return msg

if __name__ == "__main__":
    weekly_summary()
    daily_reminder()

""" def sendWeeklyEmail():
    with app.app_context():
        all_tp_this_week = [tp for tp in Touchpoint.query.all() if week_ago <= tp.date <= today]
        for user in User.query.all():
            user_recruit_ids = [recruit.id for recruit in user.recruits]
            user_tp_this_week = sorted([tp for tp in all_tp_this_week if tp.recruit_id in user_recruit_ids], key=lambda x:x.date, reverse=True)
        
            message_strings = [f"{tp.date} || {tp.meetingType.type} with {tp.recruit.first_name} {tp.recruit.last_name}" for tp in user_tp_this_week] if user_tp_this_week else ['No logged activity']
            msg = generate_message(user, 'Your Weekly Summary', message_strings, 'weekly_summary.html')
            mail.send(msg)

def sendTouchpointReminder():
    with app.app_context():
        recruits_to_contact = Recruit.query.filter(Recruit.next_touchpoint == today)
        if not recruits_to_contact:
            return None # don't send email if no recruits to contact
        users_to_contact = set([recruit.user for recruit in recruits_to_contact])
        for user in users_to_contact:
            user_recruits = [recruit for recruit in recruits_to_contact if recruit.user_id == user.id]
            message_strings = [f"{recruit.first_name} {recruit.last_name}" for recruit in user_recruits]
            msg = generate_message(user, 'Your Recruiting Reminders', message_strings, 'touchpoint_reminder.html')
            mail.send(msg)

def generate_message(user, subject, items, template):
    msg = Message(subject=subject, recipients=[user.email])
    template_path = f'emails/{template}'
    msg.html = render_template(template_path, name=user.first_name, items=items)
    return msg """