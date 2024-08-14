import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import RecruitCard from '../cards/RecruitCard'
import Popup from 'reactjs-popup'
import NewRecruitForm from '../forms/NewRecruitForm'

function Recruits() {
  const {recruits} = useContext(UserContext)
  
  return (
    <>
        <div>Recruits</div><br />
        <Popup trigger=
                {<button>+ Add New Recruit</button>}
                modal nested>
                {
                    close => (
                        <div style={{'border': 'solid', 'padding': '5%', 'background': 'white'}}className='modal'>
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

export default Recruits