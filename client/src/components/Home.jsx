import { Box, Typography } from '@mui/material'
import React from 'react'

function Home() {

  return (
    <Box sx={{minHeight: '90vh', background: '#555D50', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
      <Typography id='logo' component='h1' variant='h1' sx={{color: 'white', fontFamily: 'Keania One'}}>Finch</Typography>
      <Typography id='slogan' component='h2' variant='h6' sx={{color: 'white', fontFamily: 'Keania One'}}>Recruiting. Simplified.</Typography>
    </Box>
  )
}

export default Home