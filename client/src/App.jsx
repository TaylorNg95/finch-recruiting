import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from "./components/navigation/NavBar"
import Home from "./components/Home"
import Signup from "./components/sessions/Signup"
import Login from "./components/sessions/Login"

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
