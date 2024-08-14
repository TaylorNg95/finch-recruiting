import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

// Material UI
import Breadcrumbs from '@mui/material/Breadcrumbs';

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
    loggedIn ?
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to='/recruits'>Recruits</Link>
          <Link to='/notifications'>Notifications</Link>
          <Link to='#' onClick={handleLogout}>Logout</Link>
        </Breadcrumbs>
      </div> :
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to='/'>Home</Link>
          <Link to='/signup'>Signup</Link>
          <Link to='/login'>Login</Link>
        </Breadcrumbs>
      </div>
  )

  return (
    <>
      {routes}
    </>
  )
}

export default NavBar