import React from 'react'
import { createContext, useState } from 'react'

const UserContext = createContext()

function UserProvider({children}) {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  function login(user){
    setUser(user)
    setLoggedIn(true)
  }

  function logout(){
    setUser(null)
    setLoggedIn(false)
  }

  return (
    <UserContext.Provider value={{loggedIn, login, logout}}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}