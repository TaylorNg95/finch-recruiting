import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function Notifications() {

  const {user} = useContext(UserContext)

  async function sendWeeklyEmail(){
    const response = await fetch('/api/send-weekly-summary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({user_id: user.id})
    })
    if (response.status == 201){
        alert('Check your inbox!')
    } else {
        alert('Email error')
    }
  }

  async function sendReminders(){
    const response = await fetch('/api/send-touchpoint-reminder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({user_id: user.id})
    })
    if (response.status == 201){
        alert('Check your inbox!')
    } else {
        alert('Email error')
    }
  }

  return (
    <>
        <div>Notifications</div>
        <p>Request Weekly Activity Summary</p>
        <button onClick={sendWeeklyEmail}>SEND</button>
        <p>Request Today's Touchpoint Reminders</p>
        <button onClick={sendReminders}>SEND</button>
    </>
  )
}

export default Notifications