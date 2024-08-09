import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import RecruitCard from './RecruitCard'
import Popup from 'reactjs-popup'
import NewRecruitForm from './NewRecruitForm'

function Dashboard() {
  const {recruits} = useContext(UserContext)
  
  return (
    <>
        <div>Dashboard</div><br />
        <Popup trigger=
                {<button>+ Add New Recruit</button>}
                modal nested>
                {
                    close => (
                        <div style={{'border': 'solid', 'padding': '5%'}}className='modal'>
                            <div className='content'>
                                + Add New Recruit
                            </div>
                            {<NewRecruitForm close={close}/>}
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
        {recruits.map(recruit => <RecruitCard key={recruit.id} recruit={recruit}/>)}
    </>
  )
}

export default Dashboard