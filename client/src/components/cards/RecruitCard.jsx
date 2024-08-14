import React from 'react'
import {Link} from 'react-router-dom'

function RecruitCard({recruit}) {

  return (
    <>
      <h2>{`${recruit.first_name} ${recruit.last_name}`}</h2>
      <Link to={`/recruits/${recruit.id}`}>View Profile</Link>
    </>
  )
}

export default RecruitCard