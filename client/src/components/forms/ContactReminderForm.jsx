import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useFormik } from 'formik'

function ContactReminderForm({recruit}) {
    const {editRecruit} = useContext(UserContext)

    const initialValues = {
        first_name: recruit.first_name,
        last_name: recruit.last_name,
        location: recruit.location,
        classYear: recruit.classYear,
        email: recruit.email,
        cell: recruit.cell,
        next_touchpoint: recruit.next_touchpoint == null ? '' : recruit.next_touchpoint
    }
    
      const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: false,
        onSubmit: function(values, {resetForm}){
            editRecruit(values, recruit.id)
            resetForm()
        }
      })

  const nextTpForm = (
    <form onSubmit={formik.handleSubmit}>
        <label>Set Contact Reminder: <input type='date' name='next_touchpoint' value={formik.values.next_touchpoint} onChange={formik.handleChange}/></label>
        <input type='submit' value='Submit'/>
    </form>
  )

  if (!recruit.next_touchpoint){
    return (
        <>
            {nextTpForm}
        </>
    )
  } else return (
    <>
        <p>Contact Reminder Set: {recruit.next_touchpoint}</p>
        <button>Clear</button>
    </>
)
}

export default ContactReminderForm