import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

function NavBar() {
  const {logout, loggedIn} = useContext(UserContext)

  const navigate = useNavigate()

  async function handleLogout(){
    await fetch('/api/logout', {
      method: 'DELETE'
    })
    logout()
    navigate('/login')
  }

  const routes = (
    loggedIn ? <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/dashboard'>Dashboard</Link></li>
      <li><Link to='#' onClick={handleLogout}>Logout</Link></li>
    </> : <>
      <li><Link to='/signup'>Signup</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </>
  )

  return (
    <ul>
        {routes}
    </ul>
  )
}

export default NavBar