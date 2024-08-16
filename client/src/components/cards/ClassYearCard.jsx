import React from 'react'
import RecruitCard from './RecruitCard'
import { Grid, Typography } from '@mui/material'

function ClassYearCard({year, recruits}) {
  const filteredRecruits = recruits.filter(recruit => recruit.classYear == year)
  const sortedRecruits = filteredRecruits.sort((a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase()))

  return (
    <>
      <Grid item xs={12}>
        <Typography sx={{mt: '1%', fontWeight: 'bold'}} component='h3' variant='h5'>{`CLASS OF ${year}`}</Typography>
      </Grid>
      {sortedRecruits.map(recruit => <RecruitCard key={recruit.id} recruit={recruit}/>)}
    </>
  )
}

export default ClassYearCard