from config import app, scheduler
from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.touchpoint import Touchpoint
from routes.users import *
from routes.recruits import *
from routes.touchpoints import *
from routes.meetingTypes import *
from jobs.mail import sendWeeklyEmail

if __name__ == '__main__':
    scheduler.add_job(func=sendWeeklyEmail, trigger='cron', day_of_week=4, hour=14, minute=17, second=15, id='welcomeJob')

    scheduler.start()
    app.run(port=5555, debug=False)