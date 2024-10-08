import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { formatDate } from '../../helpers'

// Material UI
import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

function ContactReminderForm({recruit}) {
    const {editRecruit} = useContext(UserContext)
    const [nextContact, setNextContact] = useState(recruit.next_contact ? dayjs(recruit.next_contact) : null)

    function handleSetReminder(e){
      e.preventDefault()
      editRecruit({next_contact: nextContact.format('YYYY-MM-DD')}, recruit.id)
    }

    function handleDeleteReminder(){
      editRecruit({next_contact: null}, recruit.id)
      setNextContact(null)
    }

    const nextTpForm = (
      <Box component="form" onSubmit={handleSetReminder}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Set Reminder?"
                value={nextContact}
                onChange={(newDate) => setNextContact(newDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button type='submit' variant='outlined' size='small' title='Set Reminder' sx={{minWidth: 'auto', ml: '2%'}}><AddIcon sx={{ fontSize: '1rem' }}/></Button>
      </Box>
    )
    
    if (!recruit.next_contact){
      return (
          <Box display={'flex'}>
            {nextTpForm}
          </Box>
      )
    } else return (
        <>
          <Typography component='p'>Reminder Set:</Typography>
          <Box display={'flex'}>
            <Typography>{formatDate(recruit.next_contact)}</Typography>
            <Button variant='outlined' size='small' title='Delete' onClick={handleDeleteReminder} sx={{minWidth: 'auto', ml: '2%'}}><DeleteOutlineIcon sx={{ fontSize: '1rem' }}/></Button>
          </Box>
        </>    
  )
  }

export default ContactReminderForm