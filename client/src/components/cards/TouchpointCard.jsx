import React, { useContext } from 'react'
import Popup from 'reactjs-popup'
import EditTouchpointForm from '../forms/EditTouchpointForm'
import { UserContext } from '../../context/UserContext'

function TouchpointCard({touchpoint}) {
  const {deleteTouchpoint} = useContext(UserContext)

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
                            {<EditTouchpointForm touchpoint={touchpoint} close={close}/>}
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