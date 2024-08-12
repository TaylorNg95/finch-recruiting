
def weeklySummaryEmail(name, touchpoints):
    email_body = f"""\
<html>
  <body>
    <p>Hello {name},</p>
    <p>Your weekly activity summary:</p>
    <p>----------------</p>
    <p>TOUCHPOINTS:</p>
    <div>{touchpoints}</div>
    <p>----------------</p>
    <a href="http://localhost:5173/login">View Portal</a>
    <p>Regards,<br>Your Team @Recruiter</p>
  </body>
</html>
"""
    return email_body

""" f'''Hello {name},

Your weekly activity summary:

----------------

TOUCHPOINTS:

{touchpoints}
----------------

Visit portal (make this a link).

Regards,
Your Team @ Recruiter''' """

def touchpointReminderEmail(name, recruits):
    return f'''Hello {name},

This is a reminder to contact the following recruit(s) today:

{recruits}
----------------

Visit portal (make this a link).

Regards,
Your Team @ Recruiter'''