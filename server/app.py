from config import app
from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.touchpoint import Touchpoint
from routes.users import *
from routes.recruits import *

if __name__ == '__main__':
    app.run(port=5555, debug=True)