import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

// Material UI
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, Typography } from '@mui/material';

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
        <Breadcrumbs aria-label="breadcrumb">
          <Link to='/recruits'>Recruits</Link>
          <Link to='/notifications'>Notifications</Link>
          <Link to='#' onClick={handleLogout}>Logout</Link>
        </Breadcrumbs> :
        <Breadcrumbs aria-label="breadcrumb">
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </Breadcrumbs>
  )

  return (
    <Box sx={{'padding': '2%', height: '10vh', display: 'flex', flexDirection: 'reverse', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#555D50'}}>
      {routes}
      {<Typography variant='h4' sx={{fontFamily: 'Keania One', color: '#FFFFFF', position: 'right'}}>F</Typography>}
    </Box>
  )
}

export default NavBar