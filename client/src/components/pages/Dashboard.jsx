import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import RecruitCard from './RecruitCard'

function Dashboard() {
  const {recruits} = useContext(UserContext)
  
  console.log('dashboard')
  return (
    <>
        <div>Dashboard</div><br />
        <button>+ Add New Recruit</button>
        {recruits.map(recruit => <RecruitCard key={recruit.id} recruit={recruit}/>)}
    </>
  )
}

export default Dashboard