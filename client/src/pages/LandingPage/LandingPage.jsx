import React from 'react'
import './landingpage.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function LandingPage() {
  return (
    <>
    <Navbar />
    <div className = 'wrapper'>
        <h1>Manage your car service <br /> with FixWise</h1>
        <a href="/dashboard" className='cta'>Explore the App</a>
    </div>
    <Footer />
    </>
  
)
}

export default LandingPage