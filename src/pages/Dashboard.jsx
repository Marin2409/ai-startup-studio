import React, { useState } from 'react'
import Sidebar from '../components/Sidebar-dashboard'
import NavbarDashboard from '../components/Navbar-dashboard'
import MyProjects from '../components/My-projects'
import Billing from '../components/Billing'
// import Integrations from '../components/Integrations'
// import Analytics from '../components/Analytics'
// import Team from '../components/Team-Dashboard'

const Dashboard = () => {
  const [activePage, setActivePage] = useState('Projects')

  const renderActivePage = () => {
    switch (activePage) {
      case 'Projects':
        return <MyProjects />
      case 'Integrations':
        return <div className="page-placeholder">Integrations - Coming Soon</div>
      case 'Billing':
        return <Billing />
      case 'Analytics':
        return <div className="page-placeholder">Analytics - Coming Soon</div>
      case 'Team':
        return <div className="page-placeholder">Team - Coming Soon</div>
      default:
        return <MyProjects />
    }
  }

  return (
    <div className="project-layout">
      <Sidebar activePage={activePage} 
        setActivePage={setActivePage} 
      />

      <NavbarDashboard />

      <div className="project-content">
        {renderActivePage()}
      </div>
    </div>
  )
}

export default Dashboard
