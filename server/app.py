from config import app
from models import user, recruit, meetingType, touchpoint
from routes import users

if __name__ == '__main__':
    app.run(port=5000, debug=True)