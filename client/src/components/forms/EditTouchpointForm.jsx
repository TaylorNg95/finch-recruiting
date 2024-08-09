import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { MeetingTypeContext } from '../../context/MeetingTypeContext'
import * as yup from 'yup'
import { useFormik } from 'formik'

function EditTouchpointForm({touchpoint, close}) {
    const {editTouchpoint} = useContext(UserContext)
    const {meetingTypes} = useContext(MeetingTypeContext)

    const initialValues = {
        recruit_id: touchpoint.recruit_id,
        meetingType_id: touchpoint.meetingType_id,
        date: touchpoint.date,
        notes: touchpoint.notes
      }
    
      const validationSchema = yup.object().shape({
        date: yup.string().required('Date required').matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid date format')
      })
    
      const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: function(values, {resetForm}){
            editTouchpoint(values, touchpoint.id)
            resetForm()
            close()
        }
      })

      const meetingTypeOptions = (
        <>
          {meetingTypes.map(meetingType => <option key={meetingType.id} value={meetingType.id}>{meetingType.type}</option>)}
        </>
      )

  return (
    <form onSubmit={formik.handleSubmit}>
        <label>Date: <input type='date' name='date' value={formik.values.date} onChange={formik.handleChange}/></label><br />
        <p style={{ color: "red" }}> {formik.errors.date}</p>
        <label>Meeting Type: 
            <select name='meetingType_id' value={formik.values.meetingType_id} onChange={formik.handleChange}>
                {meetingTypeOptions}
            </select>
        </label><br />
        <p style={{ color: "red" }}> {formik.errors.meetingType_id}</p>
        <label>Notes: <textarea name='notes' value={formik.values.notes} onChange={formik.handleChange}/></label><br />
        <input type='submit' value='Submit'/>
    </form>
  )
}

export default EditTouchpointForm