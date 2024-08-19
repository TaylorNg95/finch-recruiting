import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useFormik } from 'formik'
import { formatDate } from '../../helpers'

// Material
import { Box, TextField, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function ContactReminderForm({recruit}) {
    const {editRecruit} = useContext(UserContext)

    const initialValues = {
        next_contact: recruit.next_contact == null ? 'yyyy-mm-dd' : recruit.next_contact
    }
    
      const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: false,
        onSubmit: function(values, {resetForm}){
            editRecruit(values, recruit.id)
            resetForm()
        }
      })

  // use material UI to create a date field and a submit button

  const nextTpForm = (
    <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ backgroundColor: '#FFFFFF', border: 'solid 1px', borderRadius: '5px', width: 'auto'}}
          type='date'
          name='next_contact'
          variant="filled"
          value={formik.values.next_contact}
          onChange={formik.handleChange}
          InputProps={{sx: {height: '2.5em', fontSize: '0.9em'}}}/>
        <Button type='submit' variant='outlined' size='small' title='Set Reminder' sx={{minWidth: 'auto', ml: '2%'}}><AddIcon sx={{ fontSize: '1rem' }}/></Button>
    </Box>
  )

  if (!recruit.next_contact){
    return (
        <>
          <Typography component='p'>Set Reminder:</Typography>
          <Box display={'flex'}>
            {nextTpForm}
          </Box>
        </>
    )
  } else return (
      <>
        <Typography component='p'>Reminder Set:</Typography>
        <Box display={'flex'}>
          <Typography>{formatDate(recruit.next_contact)}</Typography>
          <Button variant='outlined' size='small' title='Delete' onClick={() => editRecruit({...initialValues, next_contact: ''}, recruit.id)} sx={{minWidth: 'auto', ml: '2%'}}><DeleteOutlineIcon sx={{ fontSize: '1rem' }}/></Button>
        </Box>
      </>    
)
}

export default ContactReminderForm