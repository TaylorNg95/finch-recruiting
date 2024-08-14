import React, { useContext } from 'react'
import Popup from 'reactjs-popup'
import TouchpointForm from '../forms/TouchpointForm'
import { UserContext } from '../../context/UserContext'

function TouchpointCard({touchpoint}) {
  const {deleteTouchpoint, editTouchpoint} = useContext(UserContext)

  return (
    <div>
        {`${touchpoint.date} || ${touchpoint.meetingType.type} || ${touchpoint.notes}`}
        <Popup trigger=
                {<button>Edit</button>}
                modal nested touchpoint={touchpoint}>
                {
                    close => (
                        <div style={{'border': 'solid', 'padding': '5%', 'background': 'white'}}className='modal'>
                            <div className='content'>
                                Edit Touchpoint
                            </div>
                            {<TouchpointForm touchpoint={touchpoint} submitFn={editTouchpoint} close={close}/>}
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
        <button onClick={() => deleteTouchpoint(touchpoint.id)}>Delete</button>
    </div>
  )
}

export default TouchpointCard