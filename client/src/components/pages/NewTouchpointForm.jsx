import React from 'react'
import { UserContext } from '../../context/UserContext'
import * as yup from 'yup'
import { useFormik } from 'formik'

function NewTouchpointForm({recruit_id}) {

    const initialValues = {
        recruit_id: user.id,
        first_name: '',
        last_name: '',
        location: '',
        classYear: '2027',
        email: '',
        cell: ''
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
            addRecruit(values)
            resetForm()
            close()
        }
      })

  return (
    <div>NewTouchpointForm</div>
  )
}

export default NewTouchpointForm