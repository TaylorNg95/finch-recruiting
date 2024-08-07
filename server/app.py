from config import app
from models import user, recruit

if __name__ == '__main__':
    app.run(port=5000, debug=True)