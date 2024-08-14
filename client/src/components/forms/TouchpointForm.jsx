import React, { useContext } from 'react'
import { MeetingTypeContext } from '../../context/MeetingTypeContext'
import { useFormik } from 'formik'

function TouchpointForm({touchpoint, recruit_id, submitFn, close}) {
    const {meetingTypes} = useContext(MeetingTypeContext)

    let initialValues
    if(touchpoint){
      initialValues = {
        meetingType_id: touchpoint.meetingType_id,
        date: touchpoint.date,
        notes: touchpoint.notes
      }
    } else {
      initialValues = {
        recruit_id: recruit_id,
        meetingType_id: 1,
        date: '',
        notes: ''
      }
    }
    
    const formik = useFormik({
      initialValues: initialValues,
      validateOnChange: false,
      onSubmit: function(values, {resetForm}){
          touchpoint ? submitFn(values, touchpoint.id) : submitFn(values)
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

export default TouchpointForm