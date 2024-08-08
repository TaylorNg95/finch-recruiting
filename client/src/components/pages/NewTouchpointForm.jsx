import React from 'react'
import { UserContext } from '../../context/UserContext'
import * as yup from 'yup'
import { useFormik } from 'formik'

function NewTouchpointForm({recruit_id}) {

    const initialValues = {
        recruit_id: recruit_id,
        meetingType_id: '1',
        date: '',
        notes: ''
      }
    
      const validationSchema = yup.object().shape({
        date: yup.string().required('Date required').matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid date format')
      })
    
      const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: function(values, {resetForm}){
            console.log('submitted')
            /* addTouchpoint(values)
            resetForm() */
        }
      })

  return (
    <form onSubmit={formik.handleSubmit}>
        <label>Date: <input type='date' name='date' value={formik.values.date} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.date}</p>
        <label>Meeting Type: 
            <select name='meetingType_id' value={formik.values.meetingType_id} onChange={formik.handleChange}>
                <option value='1'>Call</option>
                <option value='2'>Text</option>
                <option value='3'>Video</option>
                <option value='4'>In-Person</option>
                <option value='5'>Other</option>
            </select>
        </label><br />
        <p style={{ color: "red" }}> {formik.errors.meetingType_id}</p>
        <label>Notes: <textarea name='notes' value={formik.values.notes} onChange={formik.handleChange}/></label><br />
        <input type='submit' value='Submit'/>
    </form>
  )
}

export default NewTouchpointForm