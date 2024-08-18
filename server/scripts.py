from config import app
from models.user import User
from models.recruit import Recruit
from models.touchpoint import Touchpoint
from models.meetingType import MeetingType

def daily_reminder():
    with app.app_context():
        users = User.query.all()
        print(users)

def weekly_summary():
    print("Weekly summary job is running")

if __name__ == "__main__":
    weekly_summary()
    daily_reminder()