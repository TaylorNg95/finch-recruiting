import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TouchpointCard from '../cards/TouchpointCard'
import NewTouchpointForm from '../forms/NewTouchpointForm'
import Popup from 'reactjs-popup'
import EditRecruitForm from '../forms/EditRecruitForm'

function RecruitProfile() {
  const recruit_id = useParams().id
  
  const {recruits, deleteRecruit} = useContext(UserContext)
  const recruit = recruits.find(recruit => recruit.id == recruit_id)
  const sortedRecruitTPs = recruit.touchpoints.sort((a, b) => b.date.localeCompare(a.date))
  
  return (
    <>
      <h2>{`${recruit.first_name} ${recruit.last_name}`}</h2>
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
      {sortedRecruitTPs.map(touchpoint => <TouchpointCard key={touchpoint.id} touchpoint={touchpoint}/>)}
      <Popup trigger=
        {<button>Add Touchpoint</button>}
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