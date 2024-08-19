# Finch

Finch is a full-stack application that streamlines athlete recruiting efforts for college coaches. An individual coach can join the Finch recruiting platform by providing a name, email address and password. After signing up, the coach will be directed to the primary dashboard, where they can add new recruits and view existing ones (separated by class year). A coach may add further detail on any contact made with a recruit by viewing an individual recruit's profile. Here, a coach can record the meeting type (e.g. text, call, video, in-person) and any relevant details about the interaction.

Additionally, a coach can set a follow-up reminder if they want to contact the recruit at a specific future date. All coaches who have set follow-up reminders will receive day-of email reminders overviewing which recruit(s) they need to contact on any particular day. Coaches will also receive weekly emails summarizing their logged recruiting activity, which they can choose to opt out of. Finch utilizes a React frontend with a Flask API backend and is deployed through Render (https://render.com/). The application integrates with Flask-Mail and uses Render cron jobs to manage asynchronous email communications.

## Requirements

This application requires Python version 3.8.13 and Gmail account credentials.

## Installation and Usage

From the root project directory, type 'pipenv install' and 'pipenv shell' to activate the virtual environment and install the necessary dependencies. Once inside the virtual environment, change directory into the server folder. To access the app's email functionality, you must provide your own Gmail credentials. Open the config.py file and swap in your username and password for the 'app.config\['MAIL_USERNAME'\]' and 'app.config\['MAIL_PASSWORD'\]' variables.
> **Note:** You may need to provider an app password due to Gmail security resctrictions. Visit [Google Support](https://support.google.com/accounts/answer/185833?hl=en) for additional information.

Next, from within the server directory, type 'python app.py' into your terminal to start the Flask API backend server. Open up a separate terminal and navigate to the client folder. Type 'npm run dev' to start the Finch frontend server (note: this application uses React with Vite). Once both servers are up and running, open the application in your browser and you will see the Finch home page!.

-----

## React Routes

<!-- GlobeTrekker's React frontend contains routes related to authentication, user trips, user trip entries, and trip menu options. -->

### Authentication ('/signup' and '/login')

<!-- GlobeTrekker allows users to either Sign Up ('/signup') or Log In ('/login'). Users must provide a name, username, and password at the time of signup. Once a user creates an account, they may access it later by logging in. The application uses Formik and Yup to validate signups and logins. -->

### User Trips ('/my-trips')

<!-- Once logged in, the user returns to the application's home page, where they can navigate to view their trips ('/my-trips'). This page contains summary cards of all ongoing trips specific to that user. Each card contains the trip name, trip location, distance goal, user progress bar (% complete and miles remaining), and a button to view the trip entries. Users may click the 'View Entries' button of a particular trip, or they can click the 'Start New Trip' button at the bottom of the page.  -->

### User Trip Entries ('/my-trips/:id')

<!-- If a user clicks the 'View Entries' button of an individual trip card from the My Trips page, they can view all entries they have made for that trip thus far. Users may add new entries by providing the date and miles trekked. Once submitted, users can see the new entry and an updated progress bar. If needed, users can also edit or delete previous entries. The application uses Formik and Yup to validate entry additions and edits. -->

### Trip Menu ('/trip-menu')

<!-- If a user clicks the 'Start New Trip' button from the My Trips page, they will be directed to a Trip Menu page, containing all available trips from which they can select. GlobeTrekker contains 10 pre-set trips in varying countries and of varying distances. Users may add a trip by clicking 'Add Trip' on the relevant trip card, or they can create a custom trip by providing a name, location and mileage goal. The application uses Formik and Yup to validate custom trips. -->

## Flask Models and RESTful Routes

<!-- GlobeTrekker's Flask API backend utilizes RESTful routing conventions based on three primary models: User, Trip and Entry. -->

### User

<!-- The User model inclues name, username and password hash. Passwords are hashed using the Flask-Bcrypt extension. The model contains the following constraints and validations:
- name, username and password hash cannot be null (i.e. required)
- name, username and password hash cannot be empty strings

User routes handle user authentication and session handling. These can be accessed at '/api/signup' (POST), '/api/login' (POST), '/api/check_session' (GET) and '/api/logout' (DELETE). -->

### Trip

<!-- The trip model includes name, location, total_miles, image_path, and boolean custom attribute. The model contains the following constraints and validations:
- name, location and total_miles cannot be null (i.e. required)
- name and location cannot be empty strings
- total_miles cannot be negative

Users will never provide an image_path or the boolean custom attribute. Each of the 10 pre-set trips contain a unique image_path and default custom attribute set to 0. If a user creates a custom trip, image_path becomes a default image and custom is set to 1.

Trips can be accessed at '/api/trips' (GET, POST). -->

### Entry

<!-- The entry model includes date, miles, user_id and trip_id. The model contains the following constraints and validations:
- date, miles, user_id and trip_id cannot be null (i.e. required)
- miles cannot be negative

Users only need to provide date and miles for each entry, as user_id and trip_id are automatically added based on the current logged in user and the trip within which they are adding an entry.

Entry routes contain full GET, POST, PATCH and DELETE functionality and can be accessed at '/api/entries' and '/api/entries/:id'.

*Note:* By design, any time a user adds a new trip (whether pre-set or custom), a new entry will also be automatically created behind the scenes, with date set to '00-00-00' and miles set to 0. These entries will never be shown to the user, as 0-mile entries are always excluded. However, this action is necessary because the My Trips page is based on all trips where the user has existing entries. Thus, if a user starts a new trip but has not yet input any entries, there must be a placeholder entry to ensure the trip is rendered. 

----- -->

## Miscellaneous

<!-- GlobeTrekker includes 10 pre-set trips, derived from the 'seed.py' file found within the server folder. Styling is done with Material UI. -->

## Render Instructions

## If deployed