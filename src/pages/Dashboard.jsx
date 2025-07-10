import React, { useState } from 'react'
import Sidebar from '../components/Sidebar-dashboard'
import NavbarDashboard from '../components/Navbar-dashboard'
import Createproject from '../components/Create-project'
import Integrations from '../components/Integrations'
import Billing from '../components/Billing'
import Analytics from '../components/Analytics'
import Team from '../components/Team'
import AItools from '../components/AI-tools'

const Dashboard = () => {
  const [activePage, setActivePage] = useState('Projects')

  const renderActivePage = () => {
    switch (activePage) {
      case 'Projects':
        return <Createproject />
      case 'Integrations':
        return <Integrations />
      case 'Billing':
        return <Billing />
      case 'Analytics':
        return <Analytics />
      case 'Team':
        return <Team />
      case 'AItools':
        return <AItools />
      default:
        return <Createproject />
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <NavbarDashboard />
      {renderActivePage()}
    </div>
  )
}

export default Dashboard
