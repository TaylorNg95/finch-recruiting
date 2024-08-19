from flask_mail import Message

def generate_message(user, subject, template, items=None):
    msg = Message(subject=subject, recipients=[user.email])
    with open(f'emails/{template}', 'r') as file:
        html_content = file.read()
        html_content = html_content.replace(f'{{name}}', user.first_name)
        if items:
            html_content = html_content.replace(f'{{items}}', items)

    msg.html = html_content
    return msg