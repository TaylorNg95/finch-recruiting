import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useFormik } from 'formik'
import { formatDate } from '../../helpers'

// Material
import { Box, Grid, TextField, Typography, Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function ContactReminderForm({recruit}) {
    const {editRecruit} = useContext(UserContext)

    const initialValues = {
        next_touchpoint: recruit.next_touchpoint == null ? '' : recruit.next_touchpoint
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
          name='next_touchpoint'
          variant="filled"
          value={formik.values.next_touchpoint}
          onChange={formik.handleChange}
          InputProps={{sx: {fontSize: '0.75em', height: '5vh'}}}/>
        <input type='submit' value='+'/>
    </Box>
  )

  if (!recruit.next_touchpoint){
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
          <Typography>{formatDate(recruit.next_touchpoint)}</Typography>
          <Button variant='outlined' size='small' title='Delete' onClick={() => editRecruit({...initialValues, next_touchpoint: ''}, recruit.id)} sx={{minWidth: 'auto', ml: '2%'}}><DeleteOutlineIcon sx={{ fontSize: '1rem' }}/></Button>
        </Box>
      </>    
)
}

export default ContactReminderForm