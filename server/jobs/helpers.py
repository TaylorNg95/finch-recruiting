
def weeklySummaryEmail(name, touchpoints):
    return f'''Hello {name},

Your weekly activity summary:

----------------

TOUCHPOINTS:

{touchpoints}
----------------

Visit portal (make this a link).

Regards,
Your Team @ Recruiter'''

def touchpointReminderEmail(name, recruits):
    return f'''Hello {name},

This is a reminder to contact the following recruit(s) today:

{recruits}
----------------

Visit portal (make this a link).

Regards,
Your Team @ Recruiter'''