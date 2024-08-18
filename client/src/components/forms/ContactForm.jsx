import React, { useContext } from 'react'
import { MeetingTypeContext } from '../../context/MeetingTypeContext'
import { useFormik } from 'formik'

// Material UI
import { Box, TextField, Typography, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material'

function ContactForm({contact, recruit_id, submitFn, close}) {
    const {meetingTypes} = useContext(MeetingTypeContext)

    let initialValues
    if(contact){
      initialValues = {
        meetingType_id: contact.meetingType_id,
        date: contact.date,
        notes: contact.notes
      }
    } else {
      initialValues = {
        recruit_id: recruit_id,
        meetingType_id: 1,
        date: '',
        notes: ''
      }
    }
    
    const formik = useFormik({
      initialValues: initialValues,
      validateOnChange: false,
      onSubmit: function(values, {resetForm}){
        contact ? submitFn(values, contact.id) : submitFn(values)
          resetForm()
          close()
      }
    })

    const meetingTypeOptions = meetingTypes.map(meetingType => (
      <MenuItem key={meetingType.id} value={meetingType.id}>
        {meetingType.type}
      </MenuItem>
    ));
    
    return (
      <Box
        sx={{
          border: 'solid',
          textAlign: 'center',
          padding: '5%',
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'center',
          backgroundColor: '#555D50',
        }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mb: '1%' }}>
          <TextField
            sx={{ backgroundColor: '#FFFFFF', width: '100%' }}
            type="date"
            name="date"
            variant="filled"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <Typography component="p" sx={{ color: '#FFFFFF', mb: '1%' }}>
            {formik.errors.date}
          </Typography>
          <FormControl
            variant="filled"
            sx={{ backgroundColor: '#FFFFFF', width: '100%', mb: '1%' }}
          >
            <InputLabel id="MeetingType">Meeting Type</InputLabel>
            <Select
              labelId="MeetingType"
              sx={{ textAlign: 'left' }}
              value={formik.values.meetingType_id}
              label="Meeting Type"
              name="meetingType_id"
              onChange={formik.handleChange}
            >
              {meetingTypeOptions}
            </Select>
          </FormControl>
          <TextField
            sx={{ backgroundColor: '#FFFFFF', width: '100%' }}
            label="Notes"
            name="notes"
            variant="filled"
            value={formik.values.notes}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{
              border: 'solid 1px',
              color: '#FFFFFF',
              mb: '1%',
              mt: '1%',
            }}
          >
            {contact ? 'Edit Contact' : 'Add Contact'}
          </Button>
          <br />
        <Button type='button' variant='outlined' size='small' sx={{ border: 'solid 1px', color: '#FFFFFF' }} onClick={() => close()}>Cancel</Button>
      </Box>
    </Box>
  )
}

export default ContactForm