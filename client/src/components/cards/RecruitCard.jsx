import React from 'react'
import {Link} from 'react-router-dom'

// Material UI
import { Grid, Paper, Typography } from '@mui/material'

// RecruitCard component


function RecruitCard({recruit}) {

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Paper elevation={3} style={{ padding: '5%', backgroundColor: '#D3D3D3' }}>
        <Typography component='h3' variant='h6' sx={{mb: '2%'}}>{`${recruit.first_name} ${recruit.last_name}`}</Typography>
        <Link to={`/recruits/${recruit.id}`}>View Profile</Link>
      </Paper>
    </Grid>
  )
}

export default RecruitCard