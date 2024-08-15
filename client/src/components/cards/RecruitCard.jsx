import React from 'react'
import {Link} from 'react-router-dom'

// Material UI
import { Grid, Paper } from '@mui/material'

// TBD: Stle with paper

function RecruitCard({recruit}) {

  return (
    <Grid item xs={6} sm={4} md={3}>
      <h2>{`${recruit.first_name} ${recruit.last_name}`}</h2>
      <Link to={`/recruits/${recruit.id}`}>View Profile</Link>
    </Grid>
  )
}

export default RecruitCard