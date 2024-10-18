import React from 'react'
import Dummy from './components/Dummy'
import Home from './components/home'
import Signup from './components/Signup'
import Login from './components/Login'
import Appointment from './components/Appointment'
import About from './components/About'
import { Routes, Route } from 'react-router-dom'
import Appointment from './components/Appointment'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About/>}/>
      <Route path='/appointment' element={<Appointment/>}/> 
    </Routes>
  )
}

export default App