import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import ContactCard from '../cards/ContactCard'
import ContactForm from '../forms/ContactForm'
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
  
  const {recruits, contacts, deleteRecruit, editRecruit, addContact} = useContext(UserContext)
  const recruit = recruits.find(recruit => recruit.id == recruit_id)
  const recruitTPs = contacts ? contacts.filter(contact => contact.recruit_id == recruit.id) : []
  const sortedRecruitTPs = recruitTPs ? recruitTPs.sort((a, b) => b.date.localeCompare(a.date)) : []
  
  return (
    <Grid container sx={{padding: '2%'}}>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='h4' sx={{mt: '2%', fontWeight: 'bold', mb: '1%'}}>{`${recruit.first_name} ${recruit.last_name}`}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
      <Button variant='outlined' size='small' title='Priority' onClick={() => editRecruit({high_priority: !recruit.high_priority}, recruit.id)}>{recruit.high_priority ? <StarIcon /> : <StarOutlineIcon />}</Button>
        <Popup trigger=
            {<Button variant='outlined' size='small' sx={{mr: '1%', ml: '1%'}} title='Edit'><EditIcon /></Button>}
            modal nested>
            {close => <RecruitForm recruit={recruit} submitFn={editRecruit} close={close}/>}
        </Popup>
        <Button variant='outlined' size='small' title='Delete' onClick={() => deleteRecruit(recruit.id)}><DeleteOutlineIcon /></Button>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '2%'}}><b>Location:</b> {recruit.location}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '1%'}}><b>Class Year:</b> {recruit.classYear}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '1%'}}><b>Email:</b> {recruit.email ? recruit.email : '--'}</Typography>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography variant='p' sx={{mt: '1%'}}><b>Cell:</b> {recruit.cell ? recruit.cell : '--'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{backgroundColor: '#555D50', mt: '2%'}}/>
      </Grid>
      <Grid item container xs={12} justifyContent='space-between' alignItems='center' sx={{ml: '3%', mr: '3%'}}>
        <Grid item sx={{mt: '1%'}}>
          <ContactReminderForm recruit={recruit}/>
        </Grid>
        <Grid item>
          <Popup trigger=
            {<Button variant='outlined' sx={{backgroundColor: '#D3D3D3', color: '#000000', fontSize: '0.75em'}}>+ Add Contact</Button>}
            modal nested>
            {close => <ContactForm recruit_id={recruit_id} submitFn={addContact} close={close}/>}
          </Popup>
        </Grid>
      </Grid>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography component='h3' variant='h5' sx={{fontWeight: 'bold'}}>Contact Log:</Typography>
      </Grid>
      {sortedRecruitTPs.map(contact => <ContactCard key={contact.id} contact={contact}/>)}
    </Grid>
  )
}

export default RecruitProfile