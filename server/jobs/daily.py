from config import app, mail
from helpers import generate_message, today
from models.user import User
from models.recruit import Recruit
from models.contact import Contact
from models.meetingType import MeetingType

def daily_reminder():
    with app.app_context():
        recruits_to_contact = Recruit.query.filter(Recruit.next_contact == today)
        if not recruits_to_contact:
            return None # don't send email if no recruits to contact
        users_to_contact = set([recruit.user for recruit in recruits_to_contact])
        for user in users_to_contact:
            recruits = [recruit for recruit in recruits_to_contact if recruit.user_id == user.id]
            message_strings = ''.join([f"<li>{recruit.first_name} {recruit.last_name}</li>" for recruit in recruits])
            msg = generate_message(user, 'Your Contact Reminders', 'contact_reminder.html', message_strings)
            mail.send(msg)

if __name__ == "__main__":
    daily_reminder()