import React from 'react'
import Sidebar from '../components/Sidebar-dashboard'
import Createproject from '../components/Create-project'

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Createproject />
    </div>
  )
}

export default Dashboard
