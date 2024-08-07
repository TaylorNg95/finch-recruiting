import React, { useState } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

function Login() {
  const {login} = useContext(UserContext)
  const [loginError, setLoginError] = useState(null)

  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username required'),
    password: yup.string().required('Password required')
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
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
            navigate('/')
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
            <label>Username: <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange}/></label><br />
            <p style={{ color: "red" }}> {formik.errors.username}</p>
            <label>Password: <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange}/></label><br />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <p style={{ color: "red" }}> {loginError}</p>
            <input type='submit' value='Submit'/>
        </form>
    </>
  )
}

export default Login