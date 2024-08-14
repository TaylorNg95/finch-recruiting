import React from 'react'
import RecruitCard from './RecruitCard'

function ClassYearCard({year, recruits}) {
  const filteredRecruits = recruits.filter(recruit => recruit.classYear == year)
  const sortedRecruits = filteredRecruits.sort((a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase()))

  return (
    <>
      <h2>{`Class of ${year}`}</h2>
      <hr></hr>
      {sortedRecruits.map(recruit => <RecruitCard key={recruit.id} recruit={recruit}/>)}
    </>
  )
}

export default ClassYearCard