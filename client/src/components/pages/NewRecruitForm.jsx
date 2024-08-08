import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import * as yup from 'yup'
import { useFormik } from 'formik'

function NewRecruitForm() {
    const {user, addRecruit} = useContext(UserContext)

    const [formError, setFormError] = useState(null)

    const initialValues = {
        user_id: user.id,
        name: '',
        location: '',
        classYear: '2027',
        email: '',
        cell: ''
      }
    
      const validationSchema = yup.object().shape({
        name: yup.string().required('Name required'),
        location: yup.string().required('Location required'),
        classYear: yup.number().required('ClassYear required'),
        email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
        cell: yup.string().matches(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Invalid cell format')
      })
    
      const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: function(values){
            addRecruit(values)
        }
      })

  return (
    <form onSubmit={formik.handleSubmit}>
        <label>Name: <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
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
        <p style={{ color: "red" }}> {formik.errors.location}</p>
        <label>Email: <input type='email' name='email' value={formik.values.email} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        <label>Cell: <input type='tel' name='cell' value={formik.values.cell} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.cell}</p>
        <p style={{ color: "red" }}> {formError}</p>
        <input type='submit' value='Submit'/>
    </form>
  )
}

export default NewRecruitForm