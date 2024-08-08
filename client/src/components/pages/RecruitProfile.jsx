import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TouchpointCard from './TouchpointCard'

function RecruitProfile() {
  const recruit_id = useParams().id
  
  const {recruits} = useContext(UserContext)
  const recruit = recruits.find(recruit => recruit.id == recruit_id)
  console.log(recruit)
  
  return (
    <>
      <h2>{recruit.name}</h2>
      <p>{recruit.location}</p>
      <p>{recruit.classYear}</p>
      <p>{recruit.email}</p>
      <p>{recruit.cell}</p>
      <h3>Contact Log:</h3>
      {recruit.touchpoints.map(touchpoint => <TouchpointCard key={touchpoint.id} touchpoint={touchpoint}/>)}
    </>
  )
}

export default RecruitProfile