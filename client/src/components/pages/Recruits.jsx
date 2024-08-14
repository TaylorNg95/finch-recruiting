import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import RecruitCard from '../cards/RecruitCard'
import Popup from 'reactjs-popup'
import RecruitForm from '../forms/RecruitForm'

function Recruits() {
  const {recruits, addRecruit} = useContext(UserContext)
  
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
                            {<RecruitForm recruit={''} submitFn={addRecruit} close={close}/>}
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