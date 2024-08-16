import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import * as yup from 'yup'
import { useFormik } from 'formik'

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
    <form onSubmit={formik.handleSubmit}>
        <label>First name: <input type='text' name='first_name' value={formik.values.first_name} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.first_name}</p>
        <label>Last name: <input type='text' name='last_name' value={formik.values.last_name} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.last_name}</p>
        <label>Location: <input type='text' name='location' value={formik.values.location} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.location}</p>
        <label>Class Year: 
            <select name='classYear' value={formik.values.classYear} onChange={formik.handleChange}>
                <option value='2025'>2025</option>
                <option value='2026'>2026</option>
                <option value='2027'>2027</option>
                <option value='2028'>2028</option>
                <option value='2029'>2029</option>
                <option value='2030'>2030</option>
            </select>
        </label><br />
        <p style={{ color: "red" }}> {formik.errors.classYear}</p>
        <label>Email: <input type='email' name='email' value={formik.values.email} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        <label>Cell: <input type='tel' name='cell' value={formik.values.cell} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.cell}</p>
        <input type='submit' value='Submit'/>
    </form>
  )
}

export default NewRecruitForm