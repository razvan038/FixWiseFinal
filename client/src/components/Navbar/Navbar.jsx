import React from 'react'
import './navbar.css'


function Navbar() {
  return (
    <div className='nav'>
      <h1 className='nav_logo'>
        FixWise
        </h1>
      <div className='nav_list'>
      <a href="./" className='sidebar_button'>Home</a>
      <a href="./about" className='sidebar_button'>About</a>
      <a href="./contact" className='sidebar_button'>Contact</a>
      </div>

      <div className='nav_buttons'>
      <a href="" className='nav_signup sidebar_button'>Sign Up</a>
      <a href="" className='nav_login'>Login</a>
      </div>
      
    </div>
  )
}

export default Navbar