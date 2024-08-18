import React, { useContext } from 'react'
import Popup from 'reactjs-popup'
import ContactForm from '../forms/ContactForm'
import { UserContext } from '../../context/UserContext'

// Material UI
import { Grid, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatDate } from '../../helpers'

function ContactCard({contact}) {
  const {deleteContact, editContact} = useContext(UserContext)

  return (
    <Grid item container xs={12} justifyContent='center' alignItems='center'sx={{mt: '1%'}}>
        {`${formatDate(contact.date)} -- ${contact.meetingType.type} -- ${contact.notes}`}
        <Popup trigger=
            {<Button variant='outlined' size='small' sx={{mr: '1%', ml: '1%', minWidth: 'auto'}} title='Edit'><EditIcon sx={{ fontSize: '1rem' }}/></Button>}
            modal nested contact={contact}>
            {close =><ContactForm contact={contact} submitFn={editContact} close={close}/>}
        </Popup>
        <Button variant='outlined' size='small' title='Delete' onClick={() => deleteContact(contact.id)} sx={{minWidth: 'auto'}}><DeleteOutlineIcon sx={{ fontSize: '1rem' }}/></Button>
    </Grid>
  )
}

export default ContactCard