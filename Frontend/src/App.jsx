import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Appointment from './components/Appointment';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Output from './components/Output'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
