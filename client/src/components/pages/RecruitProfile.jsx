import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TouchpointCard from './TouchpointCard'
import NewTouchpointForm from './NewTouchpointForm'

function RecruitProfile() {
  const recruit_id = useParams().id
  
  const {recruits} = useContext(UserContext)
  const recruit = recruits.find(recruit => recruit.id == recruit_id)
  console.log(recruit)
  
  return (
    <>
      <h2>{`${recruit.first_name} ${recruit.last_name}`}</h2>
      <p>{recruit.location}</p>
      <p>{recruit.classYear}</p>
      <p>{recruit.email}</p>
      <p>{recruit.cell}</p>
      <h3>Contact Log:</h3>
      {recruit.touchpoints.map(touchpoint => <TouchpointCard key={touchpoint.id} touchpoint={touchpoint}/>)}
      {<NewTouchpointForm recruit_id={recruit_id}/>}
    </>
  )
}

export default RecruitProfile