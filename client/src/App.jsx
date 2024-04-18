import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import About from './pages/About/About';
import Appointments from './pages/Appointments/Appointments';
import Cars from './pages/Cars/Cars';
import Customers from './pages/Customers/Customers';
import History from './pages/History/History';
import Mechanics from './pages/Mechanics/Mechanics';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element = {<Dashboard />} />
        <Route path="/Appointments" element={<Appointments />} />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/History" element={<History />} />
        <Route path="/Mechanics" element={<Mechanics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
