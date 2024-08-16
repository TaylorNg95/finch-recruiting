import React, { useContext } from 'react'
import Popup from 'reactjs-popup'
import TouchpointForm from '../forms/TouchpointForm'
import { UserContext } from '../../context/UserContext'

// Material UI
import { Grid, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatDate } from '../../helpers'

function TouchpointCard({touchpoint}) {
  const {deleteTouchpoint, editTouchpoint} = useContext(UserContext)

  return (
    <Grid item container xs={12} justifyContent='center' alignItems='center'sx={{mt: '1%'}}>
        {`${formatDate(touchpoint.date)} -- ${touchpoint.meetingType.type} -- ${touchpoint.notes}`}
        <Popup trigger=
                {<Button variant='outlined' size='small' sx={{mr: '1%', ml: '1%', minWidth: 'auto'}} title='Edit'><EditIcon sx={{ fontSize: '1rem' }}/></Button>}
                modal nested touchpoint={touchpoint}>
                {
                    close => (
                        <>
                            {<TouchpointForm touchpoint={touchpoint} submitFn={editTouchpoint} close={close}/>}
                        </>
                    )
                }
        </Popup>
        <Button variant='outlined' size='small' title='Delete' onClick={() => deleteTouchpoint(touchpoint.id)} sx={{minWidth: 'auto'}}><DeleteOutlineIcon sx={{ fontSize: '1rem' }}/></Button>
    </Grid>
  )
}

export default TouchpointCard