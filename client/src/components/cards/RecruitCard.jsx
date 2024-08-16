import React from 'react'
import {Link} from 'react-router-dom'

// Material UI
import { Grid, Paper, Typography, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';

function RecruitCard({recruit}) {

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={3} style={{ padding: '5%', backgroundColor: '#D3D3D3' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography component='h3' variant='h6' sx={{ mb: '2%', fontWeight: 'bold' }}>
          {`${recruit.first_name} ${recruit.last_name}`}
        </Typography>
        {recruit.high_priority ? <StarIcon sx={{color: '#000000'}}/> : ''}
      </div>
      <Button variant='outlined' size='small' sx={{border: 'solid 1px', backgroundColor: '#FFFFFF'}}><Link to={`/recruits/${recruit.id}`} style={{textDecoration: 'none', color: '#000000'}}>View</Link></Button>
    </Paper>
    </Grid>
  )
}

export default RecruitCard