import React from 'react'
import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

function UserProvider({children}) {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async function(){
      const response = await fetch('/api/check_session')
      if (response.status == 200){
        const user = await response.json()
        login(user)
      }
    }
    checkUser()
  }, [])
  
  function login(user){
    setUser(user)
    setLoggedIn(true)
  }

  function logout(){
    setUser(null)
    setLoggedIn(false)
  }

  return (
    <UserContext.Provider value={{loggedIn, user, login, logout}}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}