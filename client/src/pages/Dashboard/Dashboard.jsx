import React from 'react'
import './dashboard.css'
import Sidebar from '../../components/Sidebar/Sidebar'  

function Dashboard() {
  return (
    <>
    <div className='dashboard_grid'>
    <Sidebar />
    <div className='main_content'>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard. Here you can overview your car service appointments.</p>
      </div>
    </div>
    
    </>
  )
}

export default Dashboard