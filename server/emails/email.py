from config import mail
from models.contact import Contact
from helpers import generate_message, today, week_ago

def sendWeeklySummary(user):
    user_recruit_ids = [recruit.id for recruit in user.recruits]
    all_tp_this_week = [tp for tp in Contact.query.all() if week_ago <= tp.date <= today]
    user_tp_this_week = sorted([tp for tp in all_tp_this_week if tp.recruit_id in user_recruit_ids], key=lambda x:x.date, reverse=True)
    message_strings = ''.join([f"<li>{tp.date[5:] + '-' + tp.date[2:4]}: {tp.meetingType.type} with {tp.recruit.first_name} {tp.recruit.last_name}</li>" for tp in user_tp_this_week]) if user_tp_this_week else '<li>No logged activity</li>'
    msg = generate_message(user, 'Your Weekly Activity Summary', 'weekly_summary.html', message_strings)
    mail.send(msg)

def sendContactReminder(user):
    recruits_to_contact = [recruit for recruit in user.recruits if recruit.next_contact == today]
    message_strings = ''.join([f"<li>{recruit.first_name} {recruit.last_name}</li>" for recruit in recruits_to_contact]) if recruits_to_contact else '<li>No outstanding reminders</li>'
    msg = generate_message(user, 'Your Contact Reminders', 'contact_reminder.html', message_strings)
    mail.send(msg)