import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import RecruitCard from '../cards/RecruitCard'
import Popup from 'reactjs-popup'
import RecruitForm from '../forms/RecruitForm'
import ClassYearCard from '../cards/ClassYearCard'
import { Grid } from '@mui/material'

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
                {<button className='popup-btn'>+ Add New Recruit</button>}
                modal nested>
                {
                    close => (
                        <div style={{'border': 'solid', 'padding': '5%', 'background': 'white'}}className='modal'>
                            <div className='content'>
                                + Add New Recruit
                            </div>
                            {<RecruitForm recruit={''} submitFn={addRecruit} close={close}/>}
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Cancel
                                </button>
                            </div>
                        </div>
                    )
                }
        </Popup>
        {classYearCards}
    </Grid>
  )
}

export default Recruits