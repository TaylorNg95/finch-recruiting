from flask import render_template
from config import app
from models.user import User
from models.recruit import Recruit
from models.meetingType import MeetingType
from models.contact import Contact
from routes.sessions import *
from routes.users import *
from routes.recruits import *
from routes.contacts import *
from routes.meetingTypes import *
from routes.emails import *

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=5555, debug=True)