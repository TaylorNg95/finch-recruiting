from config import app, mail
import datetime as dt
from flask_mail import Message
from models.user import User
from models.recruit import Recruit
from models.touchpoint import Touchpoint
from jobs.helpers import weeklySummaryEmail, touchpointReminderEmail

today = dt.datetime.now().date().isoformat() # current date
week_ago = (dt.datetime.now() - dt.timedelta(days=7)).date().isoformat() # date one week ago

def sendWeeklyEmail():
    with app.app_context():
        users = User.query.all()
        all_touchpoints = Touchpoint.query.all()
        all_touchpoints_this_week = [touchpoint for touchpoint in all_touchpoints if week_ago <= touchpoint.date <= today]
        for user in users:
            user_recruit_ids = [recruit.id for recruit in user.recruits]
            user_touchpoints_this_week = sorted([touchpoint for touchpoint in all_touchpoints_this_week if touchpoint.recruit_id in user_recruit_ids], key=lambda x:x.date, reverse=True)
            # this works because recruits are unique to users, so you only need to compare the touchpoint_recruit_ids
            message_strings = [f"• {touchpoint.date} || {touchpoint.meetingType.type} with {touchpoint.recruit.first_name} {touchpoint.recruit.last_name}<br>" for touchpoint in user_touchpoints_this_week] if user_touchpoints_this_week else 'No logged activity.'

            msg = Message(
                subject='Your Weekly Summary',
                recipients=[user.email]
            )
            msg.html = weeklySummaryEmail(user.first_name, ''.join(message_strings))
            mail.send(msg)

def sendTouchpointReminder():
    with app.app_context():
        recruitsToContact = Recruit.query.filter(Recruit.next_touchpoint == today)
        usersToContact = set([recruit.user for recruit in recruitsToContact])
        if not usersToContact:
            return None # don't send email if no users to contact
        for user in usersToContact:
            userRecruits = [recruit for recruit in recruitsToContact if recruit.user_id == user.id]
            message_strings = [f"• {recruit.first_name} {recruit.last_name}<br>" for recruit in userRecruits]
            msg = Message(
                subject='Your Recruiting Reminders',
                recipients=[user.email]
            )
            msg.html = touchpointReminderEmail(user.first_name, ''.join(message_strings))
            mail.send(msg)