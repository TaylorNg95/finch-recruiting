import React from 'react'
import RecruitCard from './RecruitCard'
import { Typography } from '@mui/material'

function ClassYearCard({year, recruits}) {
  const filteredRecruits = recruits.filter(recruit => recruit.classYear == year)
  const sortedRecruits = filteredRecruits.sort((a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase()))

  return (
    <>
      <Typography component='h3' variant='h5'>{`Class of ${year}`}</Typography>
      <hr></hr>
      {sortedRecruits.map(recruit => <RecruitCard key={recruit.id} recruit={recruit}/>)}
    </>
  )
}

export default ClassYearCard