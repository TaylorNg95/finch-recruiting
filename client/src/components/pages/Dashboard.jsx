import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function Dashboard() {
  const {recruits} = useContext(UserContext)

  return (
    <>
        <div>Dashboard</div>
        {recruits.map(recruit => <div>Recruit Card</div>)}
    </>
  )
}

export default Dashboard