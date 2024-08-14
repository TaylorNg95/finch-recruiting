import React, { useState } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

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
    <>
        <form onSubmit={formik.handleSubmit}>
          <label>First name: <input type='text' name='first_name' value={formik.values.first_name} onChange={formik.handleChange}/></label><br />
          <p style={{ color: "red" }}> {formik.errors.first_name}</p>
          <label>Last name: <input type='text' name='last_name' value={formik.values.last_name} onChange={formik.handleChange}/></label><br />
          <p style={{ color: "red" }}> {formik.errors.last_name}</p>
          <label>Email: <input type='email' name='email' value={formik.values.email} onChange={formik.handleChange}/></label><br />
          <p style={{ color: "red" }}> {formik.errors.email}</p>
          <label>Password: <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange}/></label><br />
          <p style={{ color: "red" }}> {formik.errors.password}</p>
          <p style={{ color: "red" }}> {loginError}</p>
          <input type='submit' value='Submit'/>
        </form>
    </>
  )
}

export default Signup