from config import app
from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.touchpoint import Touchpoint
from routes.sessions import *
from routes.recruits import *
from routes.touchpoints import *
from routes.meetingTypes import *
from routes.emails import *

if __name__ == '__main__':
    app.run(port=5555, debug=True)