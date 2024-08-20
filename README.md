# Finch Recruiting

Finch is a full-stack application that streamlines athlete recruiting efforts for college coaches. An individual coach can join the Finch recruiting platform by providing a name, email address and password. After signing up, the coach will be directed to the primary dashboard, where they can add new recruits and view existing ones. A coach may add further detail on any contact made with a recruit by viewing an individual recruit's profile. Here, a coach can record meetings (e.g. text, call, video, in-person) and any relevant details about the interactions.

Additionally, a coach can set a follow-up reminder if they plan to contact the recruit at a future date. Coaches who have set follow-up reminders will receive day-of email reminders overviewing which recruit(s) they need to contact. Coaches will also receive weekly emails summarizing their logged recruiting activity, which they can choose to opt out of. Finch utilizes a React frontend with a Flask API backend and is deployed via Render: [https://finch-zt3p.onrender.com/](https://finch-zt3p.onrender.com/). The application integrates with Flask-Mail and uses Render cron jobs to manage asynchronous email communications.

## Requirements

This application requires Python version 3.8.13 and Gmail credentials.

## Installation and Usage

From the root project directory, type `pipenv install` and `pipenv shell` to activate the virtual environment and install the necessary dependencies. Once inside the virtual environment, change directory into the server folder. To access the app's email functionality, you must provide Gmail credentials. Open the `config.py` file and swap in your username and password for the `['MAIL_USERNAME']` and `['MAIL_PASSWORD']` variables.
> **Note:** You may need to provide an app password due to Gmail security resctrictions. Visit [Google Support](https://support.google.com/accounts/answer/185833?hl=en) for additional information.

Next, from within the server directory, type `python app.py` in your terminal to start the Flask API backend server. Open up a separate terminal and navigate to the client folder. Type `npm run dev` to start the frontend server (this application uses React with Vite). Once both servers are up and running, open the application in your browser to view the Finch home page!

-----

## React Routes

Finch's React frontend contains routes related to authentication, recruits and email notifications.

### Authentication

Finch allows coaches to either Sign Up (`/signup`) or Log In (`/login`). Coaches must provide a name, email and password at the time of signup. This email will become the primary email through which coaches receive email notifications.

### Recruits Dashboard

Once logged in, coaches are directed to their primary dashboard (`/recruits`), where they can view all existing recruits (organized alphabetically by first name and separated by class year) and add new recruits. Any recruits marked as high priority will have a star next to their name. Coaches can view and enter additional details about a recruit by clicking "View".

### Recruit Profiles

If a coach clicks the "View" button for a recruit, they will be directed to the recruit's unique profile (`/recruits/:id`). Here, they can view any details they added about the recruit (e.g. location, contact information) and they can view all logged contact entries. These entries may include texts, calls, video chats, in-person meetings or "other." Coaches can log any new contact by providing a date, meeting type and notes (optional).

Within the contact log section, coaches may set follow-up reminders for a particular recruit. For example, if a coach adds an entry for a recruit and plans to reach out again in a week, they can input the future date in the "Set Reminder" calendar. The application runs a daily cron job (see "Render Cron Jobs and Email Notifications" section below), which sends emails to any coaches who have set follow-up reminders on a particular day.

### Notifications

The Notifications page (`/notifications`) allows coaches to manage their email notifications. If a coach does not set any follow-up reminders, they will never receive any daily reminder emails, but they will still receive weekly summaries of their logged recruiting activity. They may opt out of this service at any time.

For development and demonstration purposes, coaches can manually request their daily reminders and weekly summaries by clicking either of the "Send" buttons. These should be considered separate from the automated cron jobs that handle daily and weekly email distribution to *all* coaches on the platform.

## Flask Models and RESTful Routes

Finch's Flask API backend utilizes RESTful routing conventions based on four primary models: User, Recruit, Meeting Type and Contact.

### User

The User model (i.e. Coach) includes name, email, password hash and notifications. Passwords are hashed using the Flask-Bcrypt extension. The model contains the following constraints and validations:
- name, email and password hash cannot be null (i.e. required)
- name, email and password hash cannot be empty strings

User routes handle authentication, sessions and notifications settings (located in the `sessions.py` and `users.py` files within the server/routes folder). These can be accessed at `/api/signup`, `/api/login`, `/api/check_session`, `/api/logout` and `/api/users/<int:id>`.

### Recruit

The Recruit model inclues user_id, name, location, class year, email, cell, next_contact date and high_priority classification. Next_contact date represents a follow-up reminder. Coaches may click the Star within a recruit profile to denote high priority. The model contains the following constraints and validations:
- name, location and class year cannot be null (i.e. required)
- name and location cannot be empty strings
- email and cell must be formatted appropriately based on regex matching

Recruits can be accessed at `/api/recruits` and `/api/recruits/<int:id>`.

### Meeting Type

The meeting type model includes a type attribute and is used to set predefined meeting types (initialized in `seed.py`) from which a coach can select when creating a new contact entry. Meeting types include text, call, video, in-person and other. Meeting types can be accessed at `/api/meeting-types`.

### Contact

The contact model includes recruit_id, meetingType_id, date and notes. The model contains the following constraints and validations:
- date and meetingType_id cannot be null (i.e. required)
- date must be of `yyyy-mm-dd` format

Contacts can be accessed at `/api/contacts` and `/api/contacts/<int:id>`.

## Render Cron Jobs and Email Notifications

Finch is deployed via Render: [https://finch-zt3p.onrender.com/](https://finch-zt3p.onrender.com/). The web service runs alongside two Render cron jobs, which manage pre-scheduled email notifications to Finch users. Each job runs a script contained within the server/jobs folder:
- Finch-Daily-Notifications: runs the `jobs/daily.py` script to distribute contact reminders to users who want to follow up with recruits a particular day (scheduled daily at 9am et; distributed only to users who have set reminders)

- Finch-Weekly-Notifications: runs the `jobs/weekly.py` script to distribute recruiting activity summaries (scheduled every Sunday at 7pm et; distributed only to users who have opted into notifications)

Coaches can manually request their daily reminders and weekly summaries by clicking either of the "Send" buttons on their notifications page. These button trigger requests to `/api/send-weekly-summary` and `/api/send-contact-reminders` located in the `routes/emails.py` file. These requests should be considered independent from the automated cron jobs that handle daily and weekly email distribution to *all* coaches on the platform.

## Miscellaneous

Meeting types are predefined in the `seed.py` file in the server folder. Developers should run `python seed.py` after connecting their database.

Styling is done with Material UI.