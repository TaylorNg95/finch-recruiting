import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

function Login() {
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
    onSubmit: (values) => {
        console.log(values)
        // handle Submit
    }
  })
  
  return (
    <>
        <form onSubmit={formik.handleSubmit}>
            <label>Username: <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange}/></label><br />
            <p style={{ color: "red" }}> {formik.errors.username}</p>
            <label>Password: <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange}/></label><br />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <input type='submit' value='Submit'/>
        </form>
    </>
  )
}

export default Login