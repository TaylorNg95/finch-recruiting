import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {UserProvider} from "./context/UserContext"
import { MeetingTypeProvider } from "./context/MeetingTypeContext"
import NavBar from "./components/navigation/NavBar"
import Home from "./components/Home"
import Signup from "./components/sessions/Signup"
import Login from "./components/sessions/Login"
import Recruits from "./components/pages/Recruits"
import RecruitProfile from "./components/pages/RecruitProfile"
import Notifications from "./components/pages/Notifications"

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <MeetingTypeProvider>
          <NavBar />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/signup' element={<Signup />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/recruits' element={<Recruits />}/>
              <Route path='/recruits/:id' element={<RecruitProfile />}/>
              <Route path='/notifications' element={<Notifications />}/>
            </Routes>
        </MeetingTypeProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
