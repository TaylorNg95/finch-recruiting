
def weeklySummaryEmail(name, touchpoints):
    email_body = f"""\
        <html>
        <body>
            <p>Hello {name},</p>
            <p>Your weekly activity summary:</p>
            <p>----------------</p>
            <div>{touchpoints}</div>
            <p>----------------</p>
            <a href="http://localhost:5173/login">View Portal</a>
            <p>Regards,<br>Your Team @Recruiter</p>
        </body>
        </html>
        """
    return email_body

def touchpointReminderEmail(name, recruits):
    return f"""\
        <html>
        <body>
            <p>Hello {name},</p>
            <p>This is a reminder to contact the following recruit(s) today:</p>
            <div>{recruits}</div><br>
            <a href="http://localhost:5173/login">View Portal</a>
            <p>Regards,<br>Your Team @Recruiter</p>
        </body>
        </html>
        """