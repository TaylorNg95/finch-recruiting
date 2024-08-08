import React from 'react'
import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

function UserProvider({children}) {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [recruits, setRecruits] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser(){
      const response = await fetch('/api/check_session')
      if (response.status == 200){
        const user = await response.json()
        login(user)
      }
      setLoading(false)
    }
    checkUser()
  }, [])
  
  function login(user){
    setUser(user)
    setRecruits(user.recruits)
    setLoggedIn(true)
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
    } else if (response.status == 422){
        console.log(response)
    }
  }
  
  console.log('userContext')
  if (loading){
    return <h1>Loading...</h1>
  } else return (
    <UserContext.Provider value={{loggedIn, user, recruits, addRecruit, login, logout}}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}