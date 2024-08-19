from config import app, mail
from jobs.helpers import generate_message
from models.user import User
from models.recruit import Recruit
from models.contact import Contact
from models.meetingType import MeetingType
import datetime as dt

today = dt.datetime.now().date().isoformat() # current date
week_ago = (dt.datetime.now() - dt.timedelta(days=7)).date().isoformat() # date one week ago

def weekly_summary():
    with app.app_context():
        all_tp_this_week = [tp for tp in Contact.query.all() if week_ago <= tp.date <= today]
        for user in User.query.all():
            if user.notifications:
                user_recruit_ids = [recruit.id for recruit in user.recruits]
                user_tp_this_week = sorted([tp for tp in all_tp_this_week if tp.recruit_id in user_recruit_ids], key=lambda x:x.date, reverse=True)
                message_strings = ''.join([f"<li>{tp.date[5:] + '-' + tp.date[2:4]}: {tp.meetingType.type} with {tp.recruit.first_name} {tp.recruit.last_name}</li>" for tp in user_tp_this_week]) if user_tp_this_week else '<li>No logged activity</li>'
                msg = generate_message(user, 'Your Weekly Activity Summary', 'weekly_summary.html', message_strings)
                mail.send(msg)

if __name__ == "__main__":
    weekly_summary()