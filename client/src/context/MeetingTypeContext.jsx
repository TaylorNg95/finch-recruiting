import {useEffect, useState} from 'react'
import { createContext } from 'react'

const MeetingTypeContext = createContext()

function MeetingTypeProvider({children}) {

  const [meetingTypes, setMeetingTypes] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMeetingTypes(){
        const response = await fetch('/api/meetingTypes')
        if (response.status == 200){
            const meetingTypes = await response.json()
            setMeetingTypes(meetingTypes)
        }
        setLoading(false)
    }
    loadMeetingTypes()
  }, [])

  console.log('meetingTypeContext')
  if (loading){
    return <h1>Loading...</h1>
  } else return (
    <MeetingTypeContext.Provider value={{meetingTypes}}>{children}</MeetingTypeContext.Provider>
  )
}

export {MeetingTypeContext, MeetingTypeProvider}