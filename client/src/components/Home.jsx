import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Home() {
  const {loggedIn, user} = useContext(UserContext)

  return (
    <>
      <div>Welcome, {user.first_name}</div>
    </>
  )
}

export default Home