import React from 'react'
import {Link} from 'react-router-dom'

function RecruitCard({recruit}) {
  return (
    <>
      <h2>{recruit.name}</h2>
      <Link to={`/recruits/${recruit.id}`}>View Contact</Link>
    </>
  )
}

export default RecruitCard