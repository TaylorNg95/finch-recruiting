import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

// Material UI
import { Grid, Typography, Button, Divider, Checkbox } from '@mui/material'

function Notifications() {
  const {user, editUser} = useContext(UserContext)

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
        alert('Notification sent. Please check your inbox!')
    } else {
        alert('Error, please try again later!')
    }
  }

  async function sendReminders(){
    const response = await fetch('/api/send-contact-reminders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({user_id: user.id})
    })
    if (response.status == 201){
        alert('Notification sent. Please check your inbox!')
    } else {
        alert('Error, please try again later!')
    }
  }

  return (
    <Grid container sx={{padding: '2%'}}>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Typography variant='h4' sx={{mt: '2%', fontWeight: 'bold', mb: '1%'}}>Email Notifications</Typography>
        </Grid>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Typography variant='p' sx={{mt: '2%'}}>Opt-In to Weekly Activity Summaries?</Typography>
        </Grid>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Checkbox defaultChecked onClick={() => editUser({notifications: !user.notifications}, user.id)} sx={{mt: '1%'}}/>
        </Grid>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Typography variant='p' sx={{mt: '1%', fontStyle: 'italic'}}>(by checking this box, you opt-in to weekly recruiting activity summaries)</Typography>
        </Grid>
        <Grid item xs={12}>
            <Divider sx={{backgroundColor: '#555D50', mt: '2%'}}/>
        </Grid>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Typography variant='p' sx={{mt: '2%'}}>Request Weekly Activity Summary</Typography>
        </Grid>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Button onClick={sendWeeklyEmail} variant='outlined' sx={{mt: '2%', ml: '1%', backgroundColor: '#D3D3D3', color: '#000000'}}>Send</Button>
        </Grid>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Typography variant='p' sx={{mt: '2%'}}>Request Today's Contact Reminders</Typography>
        </Grid>
        <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Button onClick={sendReminders} variant='outlined' sx={{mt: '2%', ml: '1%', backgroundColor: '#D3D3D3', color: '#000000'}}>Send</Button>
        </Grid>
    </Grid>
  )
}

export default Notifications