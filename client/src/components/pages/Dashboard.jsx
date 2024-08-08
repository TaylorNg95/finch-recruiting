import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import RecruitCard from './RecruitCard'

function Dashboard() {
  const {recruits} = useContext(UserContext)
  
  console.log('dashboard')
  return (
    <>
        <div>Dashboard</div>
        {recruits.map(recruit => <RecruitCard key={recruit.id} recruit={recruit}/>)}
    </>
  )
}

export default Dashboard