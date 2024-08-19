import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import * as yup from 'yup'
import { useFormik } from 'formik'

// Material UI
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

function NewRecruitForm({recruit, submitFn, close}) {
    const {user} = useContext(UserContext)

    let initialValues
    if (recruit){
      initialValues = {
        first_name: recruit.first_name,
        last_name: recruit.last_name,
        location: recruit.location,
        classYear: recruit.classYear,
        email: recruit.email,
        cell: recruit.cell
      }
  } else {
      initialValues = {
        user_id: user.id,
        first_name: '',
        last_name: '',
        location: '',
        classYear: 2025,
        email: '',
        cell: ''
      }
  }
    
    const validationSchema = yup.object().shape({
      first_name: yup.string().required('First name required'),
      last_name: yup.string().required('Last name required'),
      location: yup.string().required('Location required'),
      classYear: yup.number().required('ClassYear required'),
      email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
      cell: yup.string().matches(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Invalid cell format')
    })
  
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      validateOnChange: false,
      onSubmit: function(values, {resetForm}){
          recruit ? submitFn(values, recruit.id) : submitFn(values)
          resetForm()
          close()
      }
    })

  return (
    <Box sx={{ border: 'solid', textAlign: 'center', padding: '5%', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'center', backgroundColor: '#555D50' }}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mb: '1%' }}>
        <TextField sx={{ backgroundColor: '#FFFFFF', width: '100%' }} label="First Name" name='first_name' variant="filled" required value={formik.values.first_name} onChange={formik.handleChange} />
        <Typography component='p' sx={{ color: '#FFFFFF', mb: '1%' }}>{formik.errors.first_name}</Typography>
        <TextField sx={{ backgroundColor: '#FFFFFF', width: '100%' }} label="Last Name" name='last_name' variant="filled" required value={formik.values.last_name} onChange={formik.handleChange} />
        <Typography component='p' sx={{ color: '#FFFFFF', mb: '1%' }}>{formik.errors.last_name}</Typography>
        <TextField sx={{ backgroundColor: '#FFFFFF', width: '100%' }} label="Location" name='location' variant="filled" required value={formik.values.location} onChange={formik.handleChange} />
        <Typography component='p' sx={{ color: '#FFFFFF', mb: '1%' }}>{formik.errors.location}</Typography>
        <FormControl variant="filled" sx={{ backgroundColor: '#FFFFFF', width: '100%', mb: '1%' }}>
          <InputLabel id='ClassYear' required>Class Year</InputLabel>
          <Select labelId='ClassYear' sx={{textAlign: 'left'}} value={formik.values.classYear} label='Class Year' name='classYear' onChange={formik.handleChange}>
            <MenuItem value='2025'>2025</MenuItem>
            <MenuItem value='2026'>2026</MenuItem>
            <MenuItem value='2027'>2027</MenuItem>
            <MenuItem value='2028'>2028</MenuItem>
            <MenuItem value='2029'>2029</MenuItem>
            <MenuItem value='2030'>2030</MenuItem>
          </Select>
        </FormControl>
        <TextField sx={{ backgroundColor: '#FFFFFF', width: '100%' }} label="Email" name='email' type='email' variant="filled" value={formik.values.email} onChange={formik.handleChange} />
        <Typography component='p' sx={{ color: '#FFFFFF', mb: '1%' }}>{formik.errors.email}</Typography>
        <TextField sx={{ backgroundColor: '#FFFFFF', width: '100%' }} label="Cell" name='cell' type='tel' variant="filled" value={formik.values.cell} onChange={formik.handleChange} />
        <Typography component='p' sx={{ color: '#FFFFFF', mb: '1%' }}>{formik.errors.cell}</Typography>
        <Button type='submit' variant='outlined' sx={{ border: 'solid 1px', color: '#FFFFFF', mb: '1%' }}>{recruit ? 'Edit Recruit' : 'Add Recruit'}</Button><br />
        <Button type='button' variant='outlined' size='small' sx={{ border: 'solid 1px', color: '#FFFFFF' }} onClick={() => close()}>Cancel</Button>
      </Box>
    </Box>
  )
}

export default NewRecruitForm