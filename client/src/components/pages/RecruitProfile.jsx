import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TouchpointCard from '../cards/TouchpointCard'
import TouchpointForm from '../forms/TouchpointForm'
import Popup from 'reactjs-popup'
import RecruitForm from '../forms/RecruitForm'
import ContactReminderForm from '../forms/ContactReminderForm'

// Material UI
import { Button, Divider, Grid, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function RecruitProfile() {
  const recruit_id = useParams().id
  
  const {recruits, touchpoints, deleteRecruit, editRecruit, addTouchpoint} = useContext(UserContext)
  const recruit = recruits.find(recruit => recruit.id == recruit_id)
  const recruitTPs = touchpoints ? touchpoints.filter(touchpoint => touchpoint.recruit_id == recruit.id) : ''
  const sortedRecruitTPs = recruitTPs.sort((a, b) => b.date.localeCompare(a.date))
  
  return (
    <Grid container>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='h4' sx={{mt: '2%', fontWeight: 'bold', mb: '1%'}}>{`${recruit.first_name} ${recruit.last_name}`}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
      <Button variant='outlined' size='small' title='Priority' onClick={() => editRecruit({high_priority: !recruit.high_priority}, recruit.id)}>{recruit.high_priority ? <StarIcon /> : <StarOutlineIcon />}</Button>
        <Popup trigger=
            { <Button variant='outlined' size='small' sx={{mr: '1%', ml: '1%'}} title='Edit'><EditIcon /></Button>}
            modal nested>
            {
                close => (
                    <div style={{'border': 'solid', 'padding': '5%', 'background': '#555D50'}} className='modal'>
                        {<RecruitForm recruit={recruit} submitFn={editRecruit} close={close}/>}
                    </div>
                )
            }
        </Popup>
        <Button variant='outlined' size='small' title='Delete' onClick={() => deleteRecruit(recruit.id)}><DeleteOutlineIcon /></Button>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '2%'}}>Location: {recruit.location}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '2%'}}>Class Year: {recruit.classYear}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '2%'}}>Email: {recruit.email ? recruit.email : '--'}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '2%'}}>Cell: {recruit.cell ? recruit.cell : '--'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{backgroundColor: '#555D50', mt: '2%'}}/>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography component='h3' variant='h5' sx={{mt: '2%', fontWeight: 'bold'}}>Contact Log:</Typography>
      </Grid>
      <ContactReminderForm recruit={recruit}/>
      {sortedRecruitTPs.map(touchpoint => <TouchpointCard key={touchpoint.id} touchpoint={touchpoint}/>)}
      <Popup trigger=
        {<button>Add</button>}
        modal nested>
        {
            close => (
                <div style={{'border': 'solid', 'padding': '5%', 'background': 'white'}}className='modal'>
                    <div className='content'>
                        Add Touchpoint
                    </div>
                    {<TouchpointForm recruit_id={recruit_id} submitFn={addTouchpoint} close={close}/>}
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
    </Grid>
  )
}

export default RecruitProfile