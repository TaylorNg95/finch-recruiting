import React, { useState } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

// Material UI
import { Typography, TextField, Button, Box } from '@mui/material'

function Login() {
  const {login} = useContext(UserContext)
  const [loginError, setLoginError] = useState(null)

  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required('! Email required'),
    password: yup.string().required('! Password required')
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async function(values){
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (response.status == 200){
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
        <Box component="form" onSubmit={formik.handleSubmit} sx={{alignItems: 'center', mb: '1%'}}>
          <TextField sx={{backgroundColor: '#FFFFFF'}} label="Email" name='email' type='email' variant="filled" value={formik.values.email} onChange={formik.handleChange}/>
          <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{formik.errors.email}</Typography>
          <TextField sx={{backgroundColor: '#FFFFFF'}} label="Password" name='password' type='password' variant="filled" value={formik.values.password} onChange={formik.handleChange}/>
          <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{formik.errors.password}</Typography>
          <Typography component='p' sx={{color: '#FFFFFF', mb: '1%'}}>{loginError}</Typography>
          <Button type='submit' variant='outlined' sx={{border: 'solid 2px', color: '#FFFFFF', fontWeight: 'bold'}}>Log In</Button>
        </Box>
    </Box>
  )
}

export default Login