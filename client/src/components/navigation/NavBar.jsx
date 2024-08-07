import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

function NavBar() {
  const {logout, loggedIn} = useContext(UserContext)

  const routes = (
    loggedIn ? <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='#' onClick={logout}>Logout</Link></li>
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