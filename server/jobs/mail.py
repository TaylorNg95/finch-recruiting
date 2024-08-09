from config import app, mail
import datetime as dt
from flask_mail import Message
from models.user import User
from models.recruit import Recruit
from models.touchpoint import Touchpoint
from jobs.helpers import weeklySummaryEmail

today = dt.datetime.now().date().isoformat() # current date
week_ago = (dt.datetime.now() - dt.timedelta(days=7)).date().isoformat() # date one week ago

def sendWeeklyEmail():
    with app.app_context():
        users = User.query.filter(User.notifications == 1)
        all_touchpoints = Touchpoint.query.all()
        all_touchpoints_this_week = [touchpoint for touchpoint in all_touchpoints if week_ago <= touchpoint.date <= today]
        for user in users:
            user_recruit_ids = [recruit.id for recruit in user.recruits]
            user_touchpoints_this_week = [touchpoint for touchpoint in all_touchpoints_this_week if touchpoint.recruit_id in user_recruit_ids]
            # this works because recruits are unique to users, so you only need to compare the touchpoint_recruit_ids
            message_strings = [f"• {touchpoint.date} || {touchpoint.meetingType.type} with {touchpoint.recruit.first_name} {touchpoint.recruit.last_name}\n" for touchpoint in user_touchpoints_this_week]

            msg = Message(
                subject='Your Weekly Summary',
                recipients=[user.email]
            )
            msg.body = weeklySummaryEmail(user.first_name, ''.join(message_strings))
            mail.send(msg)