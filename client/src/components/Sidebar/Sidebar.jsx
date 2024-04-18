import React from 'react'
import './sidebar.css'

function Sidebar() {
  return (
    <>
      <div className='sidebar'>
        <a href="/Dashboard" className='sidebar_button'>Home</a>
        <a href="/Customers" className='sidebar_button'>Customers</a>
        <a href="/Mechanics" className='sidebar_button'>Mechanics</a>
        <a href="/Cars" className='sidebar_button'>Cars</a>
        <a href="/Appointments" className='sidebar_button'>Appointments</a>
        <a href="/History" className='sidebar_button'>History</a>
      </div>
    </>
  )
}

export default Sidebar