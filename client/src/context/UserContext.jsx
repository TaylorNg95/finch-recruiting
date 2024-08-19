import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

function UserProvider({children}) {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  const [recruits, setRecruits] = useState([])
  const [contacts, setContacts] = useState([])

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Load user state
  useEffect(() => {
    async function loadUser(){
      const response = await fetch('/api/check_session')
      if (response.status == 200){
        const user = await response.json()
        login(user)
      } else {
        navigate('/')
      }
      setLoading(false)
    }
    loadUser()
  }, [])
  
  // login & logout
  function login(user){
    setUser(user)
    setLoggedIn(true)
    setRecruits(user.recruits)
    let contacts = []
    for (const recruit of user.recruits){
      contacts = contacts.concat(recruit.contacts)
      setContacts(contacts)
    }
  }

  function logout(){
    setUser(null)
    setRecruits(null)
    setLoggedIn(false)
    navigate('/login', {replace: true})
  }

  // PATCH - Users
  async function editUser(user, id){
    const response = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (response.status == 200){
      const updatedUser = await response.json()
      setUser(updatedUser)
    }
  }  

  // CRUD - Recruits
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

  async function editRecruit(recruit, id){
    const response = await fetch(`/api/recruits/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify(recruit)
    })
    if (response.status == 200){
      const updatedRecruit = await response.json()
      setRecruits(recruits.map(recruit => {
        if (recruit.id == updatedRecruit.id){
          return updatedRecruit
        } else return recruit
      }))
    }
  }

  async function deleteRecruit(id){
    if (confirm('Are you sure you want delete this recruit?')){
      const response = await fetch(`/api/recruits/${id}`, {
        method: 'DELETE'
      })
      setRecruits(recruits.filter(recruit => recruit.id != id))
      navigate('/recruits', {replace: true})
    }
  }

  // CRUD - Contacts
  async function addContact(contact){
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    if (response.status == 201){
      const newContact = await response.json()
      setContacts([...contacts, newContact])
    }
  }
  
  async function editContact(contact, id){
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    if (response.status == 200){
      const updatedContact = await response.json()
      setContacts(contacts.map(contact => {
        if (contact.id == updatedContact.id){
          return updatedContact
        } else return contact
      }))
    }
  }

  async function deleteContact(id){
    if (confirm('Are you sure you want delete this contact?')){
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
      })
      setContacts(contacts.filter(contact => contact.id != id))
    }
  }
  
  // Render component
  if (loading){
    return <h1>Loading...</h1>
  } else return (
    <UserContext.Provider value={{
      loggedIn, user, login, logout, editUser,
      recruits, addRecruit, editRecruit, deleteRecruit,
      contacts, addContact, editContact, deleteContact
    }}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}