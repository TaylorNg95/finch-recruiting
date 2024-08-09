import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

function UserProvider({children}) {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  const [recruits, setRecruits] = useState(null)
  const [touchpoints, setTouchpoints] = useState(null)

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser(){
      const response = await fetch('/api/check_session')
      if (response.status == 200){
        const user = await response.json()
        login(user)
      } else {
        navigate('/login')
      }
      setLoading(false)
    }
    loadUser()
  }, [])
  
  function login(user){
    setUser(user)
    setLoggedIn(true)
    setRecruits(user.recruits)
    let touchpoints = []
    for (const recruit of user.recruits){
      touchpoints = touchpoints.concat(recruit.touchpoints)
      setTouchpoints(touchpoints)
    }
  }

  function logout(){
    setUser(null)
    setRecruits(null)
    setLoggedIn(false)
  }

  async function addRecruit(recruit){
    const response = await fetch('/api/recruits', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify(recruit)
    })
    if (response.status == 201){
      const newRecruit = await response.json()
      setRecruits([...recruits, newRecruit])
    }
  }

  async function addTouchpoint(touchpoint){
    const response = await fetch('/api/touchpoints', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify(touchpoint)
    })
    if (response.status == 201){
      const newTouchpoint = await response.json()
      setTouchpoints([...touchpoints, newTouchpoint])
    }
  }
  
  console.log('userContext')
  if (loading){
    return <h1>Loading...</h1>
  } else return (
    <UserContext.Provider value={{loggedIn, user, recruits, touchpoints, addRecruit, addTouchpoint, login, logout}}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}