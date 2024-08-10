import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

function RecruitCard({recruit}) {

  return (
    <>
      <h2>{`${recruit.first_name} ${recruit.last_name}`}</h2>
      <Link to={`/${recruit.archived ? 'archives/' : ''}recruits/${recruit.id}`}>View Contact</Link>
    </>
  )
}

export default RecruitCard