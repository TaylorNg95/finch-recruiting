from config import app, scheduler
from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.touchpoint import Touchpoint
from routes.sessions import *
from routes.recruits import *
from routes.touchpoints import *
from routes.meetingTypes import *
from jobs.mail import sendWeeklyEmail, sendTouchpointReminder

if __name__ == '__main__':
    scheduler.add_job(func=sendWeeklyEmail, trigger='cron', day_of_week=0, hour=18, minute=23, second=5, id='weeklyUpdateJob')
    scheduler.add_job(func=sendTouchpointReminder, trigger='cron', hour=18, minute=23, second=50, id='contactReminderJob')
    
    scheduler.start()
    app.run(port=5555, debug=False)