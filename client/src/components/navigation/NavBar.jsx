import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

function NavBar() {
  const {logout} = useContext(UserContext)

  return (
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='#' onClick={logout}>Logout</Link></li>
    </ul>
  )
}

export default NavBar