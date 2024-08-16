import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Popup from 'reactjs-popup'
import RecruitForm from '../forms/RecruitForm'
import ClassYearCard from '../cards/ClassYearCard'

// Material UI
import { Button, Grid } from '@mui/material'

function Recruits() {
  const {recruits, addRecruit} = useContext(UserContext)

  let years = {}
  for(let recruit of recruits){
    years[recruit.classYear] = true
  }
  years = Object.keys(years)

  const classYearCards = years.map(year => <ClassYearCard key={year} year={year} recruits={recruits}/>)
  
  return (
    <Grid container spacing={2} sx={{padding: '2%'}}>
        <Popup trigger=
                {<Button variant='outlined' sx={{mt: '2%', ml: '1%', backgroundColor: '#D3D3D3', color: '#000000'}}>+ Add New Recruit</Button>}
                modal nested>
                {
                    close => (
                        <div style={{'border': 'solid', 'padding': '5%', 'background': '#555D50'}} className='modal'>
                            {<RecruitForm recruit={''} submitFn={addRecruit} close={close}/>}
                        </div>
                    )
                }
        </Popup>
        {classYearCards}
    </Grid>
  )
}

export default Recruits