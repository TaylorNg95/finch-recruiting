import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TouchpointCard from '../cards/TouchpointCard'
import NewTouchpointForm from '../forms/NewTouchpointForm'
import Popup from 'reactjs-popup'
import EditRecruitForm from '../forms/EditRecruitForm'
import ContactReminderForm from '../forms/ContactReminderForm'

function RecruitProfile() {
  const recruit_id = useParams().id
  
  const {recruits, touchpoints, deleteRecruit, editRecruit} = useContext(UserContext)
  const recruit = recruits.find(recruit => recruit.id == recruit_id)
  const recruitTPs = touchpoints ? touchpoints.filter(touchpoint => touchpoint.recruit_id == recruit.id) : ''
  const sortedRecruitTPs = recruitTPs.sort((a, b) => b.date.localeCompare(a.date))
  
  return (
    <>
      <h2>{`${recruit.first_name} ${recruit.last_name}`}</h2>
      
      <button onClick={() => editRecruit({high_priority: !recruit.high_priority}, recruit.id)}>{recruit.high_priority ? 'High Priority' : 'Low Priority'}</button>
      <Popup trigger=
        {<button>Edit Recruit</button>}
        modal nested>
        {
            close => (
                <div style={{'border': 'solid', 'padding': '5%', 'background': 'white'}}className='modal'>
                    <div className='content'>
                        Edit Recruit
                    </div>
                    {<EditRecruitForm recruit={recruit} close={close}/>}
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
      <button onClick={() => deleteRecruit(recruit.id)}>Delete Recruit</button>
      <p>{recruit.location}</p>
      <p>{recruit.classYear}</p>
      <p>{recruit.email}</p>
      <p>{recruit.cell}</p><br />
      <h3>Contact Log:</h3>
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
                    {<NewTouchpointForm recruit_id={recruit_id} close={close}/>}
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
    </>
  )
}

export default RecruitProfile