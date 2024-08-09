import React from 'react'
import Popup from 'reactjs-popup'
import EditTouchpointForm from './EditTouchpointForm'

function TouchpointCard({touchpoint}) {

  console.log(touchpoint)
  return (
    <div>
        {`${touchpoint.date} || ${touchpoint.meetingType.type} || ${touchpoint.notes}`}
        <Popup trigger=
                {<button>Edit</button>}
                modal nested touchpoint={touchpoint}>
                {
                    close => (
                        <div style={{'border': 'solid', 'padding': '5%'}}className='modal'>
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
        <button>Delete</button>
    </div>
  )
}

export default TouchpointCard