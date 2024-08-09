from config import mail
from flask_mail import Message
from models.user import User
from models.recruit import Recruit

def get(self, id):
    user = User.query.filter(User.id == id).first()
    recruits = Recruit.query.filter(Recruit.user_id == id)
    touchpoints = []
    for recruit in recruits:
        touchpoints += recruit.touchpoints
    touchpoints = [touchpoint for touchpoint in touchpoints if '2024-08-01' <= touchpoint.date <= '2024-08-08']
    
    if touchpoints:
        weekly_touchpoints = [f"• {touchpoint.date}: {touchpoint.meetingType.type} with {touchpoint.recruit_id}\n" for touchpoint in touchpoints]

        msg = Message(
            subject='Your Weekly Summary',
            recipients=['bankingontennis@gmail.com']
        )
        msg.body = f'''{user.first_name},

Your weekly activity summary:

----------------

TOUCHPOINTS:

{"".join(weekly_touchpoints)}
----------------

Visit portal (make this a link).

Regards,
Your Team @ Recruiter

'''
        mail.send(msg)
        return {"message": "Successfully sent!"}, 200