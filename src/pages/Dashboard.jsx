import React, { useState } from 'react'
import Sidebar from '../components/Sidebar-dashboard'
import NavbarDashboard from '../components/Navbar-dashboard'
import Createproject from '../components/Create-project'
import Integrations from '../components/Integrations'
import Billing from '../components/Billing'
import Analytics from '../components/Analytics'
import Team from '../components/Team'
import AIassistant from '../components/AI-assistant'

const Dashboard = () => {
  const [activePage, setActivePage] = useState('Projects')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderActivePage = () => {
    switch (activePage) {
      case 'Projects':
        return <Createproject isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      case 'Integrations':
        return <Integrations />
      case 'Billing':
        return <Billing />
      case 'Analytics':
        return <Analytics />
      case 'Team':
        return <Team />
      case 'AIassistant':
        return <AIassistant />
      default:
        return <Createproject isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isModalOpen={isModalOpen} />
      <NavbarDashboard isModalOpen={isModalOpen} />
      {renderActivePage()}
    </div>
  )
}

export default Dashboard
