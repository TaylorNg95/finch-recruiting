import React, { useState, useContext } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/UserContext'

// Material UI
import { Typography, TextField, Button, Box } from '@mui/material'

function Signup() {
  const {login} = useContext(UserContext)
  const [loginError, setLoginError] = useState(null)

  const navigate = useNavigate()

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name required'),
    last_name: yup.string().required('Last name required'),
    email: yup.string().required('Email required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    password: yup.string().required('Password required')
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async function(values){
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (response.status == 201){
            const user = await response.json()
            login(user)
            navigate('/recruits')
        } else if (response.status == 422){
            const error = await response.json()
            setLoginError(error.error)
        }
    }
    }
  )
  
  return (
    <Box sx={{textAlign: 'center', minHeight: '90vh', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'center', backgroundColor: '#555D50'}}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{alignItems: 'center'}}>
        <TextField sx={{backgroundColor: '#FFFFFF'}} label="First Name" name='first_name' variant="filled" value={formik.values.first_name} onChange={formik.handleChange}/>
        <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{formik.errors.first_name}</Typography>
        <TextField sx={{backgroundColor: '#FFFFFF'}} label="Last Name" name='last_name' variant="filled" value={formik.values.last_name} onChange={formik.handleChange}/>
        <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{formik.errors.last_name}</Typography>
        <TextField sx={{backgroundColor: '#FFFFFF'}} label="Email" name='email' type='email' variant="filled" value={formik.values.email} onChange={formik.handleChange}/>
        <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{formik.errors.email}</Typography>
        <TextField sx={{backgroundColor: '#FFFFFF'}} label="Password" name='password' type='password' variant="filled" value={formik.values.password} onChange={formik.handleChange}/>
        <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{formik.errors.password}</Typography>
        <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{loginError}</Typography>
        <Button type='submit' variant='outlined' sx={{border: 'solid 2px', color: '#FFFFFF', fontWeight: 'bold'}}>Sign Up</Button>
      </Box>
    </Box>
  )
}

export default Signup