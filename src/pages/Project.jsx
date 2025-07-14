import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SidebarProjects from '../components/Sidebar-projects'
import NavbarDashboard from '../components/Navbar-dashboard'

// Mock project data - in real app this would come from API
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

// Project Overview Component
const ProjectOverview = ({ project }) => {
  if (!project) {
    return (
      <div className="project-overview">
        <div className="project-not-found">
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist or you don't have access to it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="project-overview">
      <div className="project-overview-header">
        <div className="project-info">
          <h1 className="project-title">{project.name}</h1>
          <p className="project-subtitle">{project.description}</p>
        </div>
        <div className="project-badges">
          <span className={`project-badge ${project.badge.toLowerCase().replace(/[^a-z]/g, '-')}`}>
            {project.badge}
          </span>
          <span className="project-type-badge">{project.type}</span>
        </div>
      </div>

      <div className="project-stats">
        <div className="stat-card">
          <div className="stat-value">{project.progress}%</div>
          <div className="stat-label">Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{project.fundingAmount}</div>
          <div className="stat-label">Funding</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{project.status}</div>
          <div className="stat-label">Status</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{project.region}</div>
          <div className="stat-label">Region</div>
        </div>
      </div>

      <div className="project-details">
        <div className="detail-section">
          <h3>Project Details</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{project.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value">{project.status}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Updated:</span>
              <span className="detail-value">{project.lastUpdated}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Region:</span>
              <span className="detail-value">{project.region}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
        return <div className="page-placeholder">Tasks & Milestones - Coming Soon</div>
      case 'Team':
        return <div className="page-placeholder">Team - Coming Soon</div>
      case 'Documents':
        return <div className="page-placeholder">Documents - Coming Soon</div>
      case 'AI-Tools':
        return <div className="page-placeholder">AI Tools - Coming Soon</div>
      case 'Analytics':
        return <div className="page-placeholder">Analytics - Coming Soon</div>
      case 'Settings':
        return <div className="page-placeholder">Settings - Coming Soon</div>
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
