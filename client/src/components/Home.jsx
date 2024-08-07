import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Home() {
  const {loggedIn, user} = useContext(UserContext)

  return (
    <>
      {loggedIn ? <div>Welcome, {user.name}</div> : <div>Home</div>}
    </>
  )
}

export default Home