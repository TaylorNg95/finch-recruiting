from config import app, scheduler
from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.touchpoint import Touchpoint
from routes.users import *
from routes.recruits import *
from routes.touchpoints import *
from routes.meetingTypes import *
from jobs.mail import sendWeeklyEmail, sendTouchpointReminder

if __name__ == '__main__':
    scheduler.add_job(func=sendWeeklyEmail, trigger='cron', day_of_week=6, hour=18, minute=0, second=0, id='weeklyUpdateJob')
    scheduler.add_job(func=sendTouchpointReminder, trigger='cron', hour=9, minute=0, id='contactReminderJob')
    
    scheduler.start()
    app.run(port=5555, debug=False)