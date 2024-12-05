import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Appointment from './components/Appointment';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Output from './components/Output'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HospitalDashboard from './components/HospitalDashboard';
import PrivateRoute from './PrivateRoute';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/appointment"
          element={<PrivateRoute element={<Appointment />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/hospital"
          element={<PrivateRoute element={<HospitalDashboard />} />}
        />
        <Route path="/output" element={<Output />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
