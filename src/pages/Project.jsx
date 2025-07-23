import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Components
import SidebarProjects from '../components/Sidebar-projects'
import NavbarDashboard from '../components/Navbar-dashboard'
import ProjectOverview from '../components/Project-overview'
import ProjectSettings from '../components/Project-settings'
import TeamProjects from '../components/Team-projects'
import ProjectStorage from '../components/Project-storage'
import ProjectAssets from '../components/Project-assets'
import ProjectTasks from '../components/Project-tasks'
import ProjectCalendar from '../components/Project-calendar'
import ProjectRoadmap from '../components/Project-roadmap'
import ProjectTechStack from '../components/Project-techStack'

// Mock project data - in real app this would come from API
// TODO: Remove this once we have a real API
const mockProjects = {
  1: {
    id: 1,
    name: 'ai-startup-studio',
    type: 'SaaS',
    description: 'AI-powered startup development platform with automated tools and resources.',
    region: 'aws | us-east-2',
    status: 'active',
    badge: 'SERIES A',
    fundingAmount: '$2.5M',
    lastUpdated: '2 hours ago',
    progress: 85
  },
  2: {
    id: 2,
    name: 'temp-2',
    type: 'E-commerce',
    description: 'Modern e-commerce solution with integrated payment processing and analytics.',
    region: 'aws | us-east-2',
    status: 'active',
    badge: 'SEED',
    fundingAmount: '$500K',
    lastUpdated: '1 day ago',
    progress: 45
  },
  3: {
    id: 3,
    name: 'fintech-app',
    type: 'Fintech',
    description: 'Digital banking platform with advanced security and mobile-first design.',
    region: 'aws | eu-west-1',
    status: 'development',
    badge: 'PRE-SEED',
    fundingAmount: '$100K',
    lastUpdated: '3 days ago',
    progress: 72
  }
}

const Project = () => {
  const { projectId } = useParams()
  const [activePage, setActivePage] = useState('Overview')
  const [project, setProject] = useState(null)

  useEffect(() => {
    // In real app, this would be an API call
    const projectData = mockProjects[parseInt(projectId)]
    setProject(projectData)
  }, [projectId])

  const renderContent = () => {
    switch (activePage) {
      case 'Overview':
        return <ProjectOverview project={project} />
      case 'Tasks':
        return <ProjectTasks />
      case 'Roadmap':
        return <ProjectRoadmap />
      case 'Team':
        return <TeamProjects />
      case 'Calendar':
        return <ProjectCalendar />
      case 'TechStacks':
        return <ProjectTechStack />
      // case 'Analytics':
      //   return <div className="page-placeholder">Analytics - Coming Soon</div>
      case 'Assets':
        return <ProjectAssets />
      case 'Storage':
        return <ProjectStorage />
      case 'Settings':
        return <ProjectSettings project={project} />
      default:
        return <ProjectOverview project={project} />
    }
  }

  return (
    <div className="project-layout">
      <SidebarProjects 
        activePage={activePage} 
        setActivePage={setActivePage}
      />

      <NavbarDashboard />

      <div className="project-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default Project
