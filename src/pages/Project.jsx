import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Components
import SidebarProjects from '../components/Sidebar-projects'
import NavbarDashboard from '../components/Navbar-dashboard'
import ProjectOverview from '../components/Project-overview'
import ProjectSettings from '../components/Project-settings'
import AIassistant from '../components/AI-assistant'
// import ProjectFinancials from '../components/Project-financials'
import ProjectDatabase from '../components/Project-database'
// import TeamProjects from '../components/Team-projects'
// import ProjectAssets from '../components/Project-assets'
// import ProjectTasks from '../components/Project-tasks'
// import ProjectCalendar from '../components/Project-calendar'
import ProjectTechStack from '../components/Project-techStack'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const Project = () => {
  const { projectId } = useParams()
  const [activePage, setActivePage] = useState('Overview')
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const token = localStorage.getItem('token')
        if (!token) {
          setError('Authentication required')
          return
        }

        console.log('Fetching project with ID:', projectId)

        const response = await fetch(`${API_BASE_URL}/api/user/projects/${projectId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (response.ok && data.success) {
          console.log('Project fetched successfully:', data.project.name)
          setProject(data.project)
        } else {
          console.error('Failed to fetch project:', data.message)
          setError(data.message || 'Failed to fetch project')
        }
      } catch (error) {
        console.error('Error fetching project:', error)
        setError('Connection error. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="page-placeholder">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading project...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="page-placeholder">
          <div className="error-message">
            <h3>Error Loading Project</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-btn"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    if (!project) {
      return (
        <div className="page-placeholder">
          <div className="project-not-found">
            <h3>Project Not Found</h3>
            <p>The project you're looking for doesn't exist or you don't have access to it.</p>
          </div>
        </div>
      )
    }

    switch (activePage) {
      case 'Overview':
        return <ProjectOverview project={project} />
      case 'Tasks':
        return <div className="page-placeholder">Tasks - Coming Soon</div>
      case 'Team':
        return <div className="page-placeholder">Team - Coming Soon</div>
      case 'Calendar':
        return <div className="page-placeholder">Calendar - Coming Soon</div>
      case 'TechStacks':
        return <ProjectTechStack project={project} />
      case 'Financials':
        return <div className="page-placeholder">Financials - Coming Soon</div>
      case 'Assets':
        return <div className="page-placeholder">Assets - Coming Soon</div>
      case 'Database':
        return <ProjectDatabase project={project} />
      case 'Settings':
        return <ProjectSettings project={project} />
      case 'AIAssistant':
        return <AIassistant project={project} />
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
