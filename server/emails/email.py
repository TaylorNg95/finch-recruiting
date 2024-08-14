from config import app, mail
import datetime as dt
from flask_mail import Message
from flask import render_template
from models.user import User
from models.recruit import Recruit
from models.touchpoint import Touchpoint

today = dt.datetime.now().date().isoformat() # current date
week_ago = (dt.datetime.now() - dt.timedelta(days=7)).date().isoformat() # date one week ago

def sendWelcome(user):
    msg = generate_message(user, 'Welcome to Recruiter!', 'welcome.html')
    mail.send(msg)

def sendWeeklySummary(user):
    user_recruit_ids = [recruit.id for recruit in user.recruits]
    all_tp_this_week = [tp for tp in Touchpoint.query.all() if week_ago <= tp.date <= today]
    user_tp_this_week = sorted([tp for tp in all_tp_this_week if tp.recruit_id in user_recruit_ids], key=lambda x:x.date, reverse=True)

    message_strings = [f"{tp.date[5:] + '-' + tp.date[2:4]}: {tp.meetingType.type} with {tp.recruit.first_name} {tp.recruit.last_name}" for tp in user_tp_this_week] if user_tp_this_week else ['No logged activity']
    msg = generate_message(user, 'Your Weekly Activity Summary', 'weekly_summary.html', message_strings)
    mail.send(msg)

def sendTouchpointReminder(user):
    recruits_to_contact = [recruit for recruit in user.recruits if recruit.next_touchpoint == today]
    message_strings = [f"{recruit.first_name} {recruit.last_name}" for recruit in recruits_to_contact]
    msg = generate_message(user, 'Your Recruiting Reminders', 'touchpoint_reminder.html', message_strings)
    mail.send(msg)

def generate_message(user, subject, template, items=None):
    msg = Message(subject=subject, recipients=[user.email])
    template_path = f'emails/{template}'
    msg.html = render_template(template_path, name=user.first_name, items=items)
    return msg