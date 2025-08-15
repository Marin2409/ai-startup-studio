import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'  

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const MyProjects = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`)
  }

  const handleNewProject = () => {
    console.log('Create new project clicked')
    navigate('/create-project')
  }

  // Fetch user's projects from the API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        navigate('/login')
        return
      }

      const response = await fetch(`${API_BASE_URL}/api/user/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setProjects(data.projects || [])
        } else {
          setError(data.message || 'Failed to fetch projects')
        }
      } else if (response.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
      } else {
        setError('Failed to fetch projects')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Check for project creation success
  useEffect(() => {
    if (location.state?.projectCreated) {
      const projectName = location.state.projectName
      setSuccessMessage(`✅ Project "${projectName}" created successfully!`)
      
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
      
      // Clear the location state to prevent showing the message again
      navigate(location.pathname, { replace: true })
      
      // Refresh projects to show the new project
      fetchProjects()
    }

    // Check for project deletion success
    if (location.state?.projectDeleted) {
      const message = location.state.message || 'Project deleted successfully!'
      setSuccessMessage(`✅ ${message}`)
      
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
      
      // Clear the location state to prevent showing the message again
      navigate(location.pathname, { replace: true })
      
      // Refresh projects to remove the deleted project
      fetchProjects()
    }
  }, [location.state, navigate, location.pathname, fetchProjects])

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    if (searchQuery === '' && selectedFilter === 'all') {
      return projects
    }
    
    return projects.filter(project => {
      // Enhanced search that includes more fields and keywords
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = searchQuery === '' || 
                           project.name.toLowerCase().includes(searchLower) ||
                           project.description.toLowerCase().includes(searchLower) ||
                           project.type.toLowerCase().includes(searchLower) ||
                           // Search by business type keywords
                           (searchLower === 'saas' && project.type.toLowerCase() === 'saas') ||
                           (searchLower === 'ecommerce' && project.type.toLowerCase() === 'e-commerce') ||
                           (searchLower === 'fintech' && project.type.toLowerCase() === 'fintech') ||
                           (searchLower === 'healthtech' && project.type.toLowerCase() === 'healthtech') ||
                           (searchLower === 'edtech' && project.type.toLowerCase() === 'edtech')
      
      let matchesFilter = true
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'active') {
          matchesFilter = project.status === selectedFilter
        } else {
          matchesFilter = project.type.toLowerCase() === selectedFilter
        }
      }
      
      return matchesSearch && matchesFilter
    })
  }, [projects, searchQuery, selectedFilter])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading projects...</span>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-600 mb-4">⚠️ {error}</div>
        <button 
          onClick={fetchProjects}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-700 text-center font-medium">
            {successMessage}
          </p>
        </div>
      )}

      {/* Content Area */}
      <div>
        {filteredProjects.length === 0 ? (
          // Empty State with Controls Above
          <div className="empty-state-wrapper">
            {/* Controls Section - Above Content */}
            <div className="content-controls">
              <button 
                className="new-project-btn"
                onClick={handleNewProject}
              >
                New project
              </button>
              
              <div className="header-controls">
                <div className="search-container">
                  <Search className="w-4 h-4 search-icon" />
                  <input
                    type="text"
                    placeholder="Search for a project"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                  />
                </div>
              </div>
            </div>
            
            {/* Empty State Content - Below Controls */}
            <div className="empty-state">
              <div className="empty-state-content">
                <h2 className="empty-state-title">
                  {projects.length === 0 
                    ? 'No projects' 
                    : searchQuery 
                      ? `No projects found for "${searchQuery}"` 
                      : 'No projects found'
                  }
                </h2>
                <p className="empty-state-description">
                  {projects.length === 0 
                    ? 'Get started by creating a new project.'
                    : searchQuery
                      ? `Try searching for different keywords or adjust your filter criteria.`
                      : 'Try adjusting your filter criteria to find what you\'re looking for.'
                  }
                </p>
                <button 
                  className="new-project-btn-primary"
                  onClick={handleNewProject}
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Projects Grid
          <div className="projects-view">
            {/* Controls Section - Above Projects */}
            <div className="projects-controls">
              <button 
                className="new-project-btn"
                onClick={handleNewProject}
              >
                New project
              </button>
              
              <div className="header-controls">
                <div className="search-container">
                  <Search className="w-4 h-4 search-icon" />
                  <input
                    type="text"
                    placeholder="Search for a project"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                  />
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card" onClick={() => handleProjectClick(project.id)}>
                  <div className="project-card-header">
                    <div className="project-info">
                      <h3 className="project-name">{project.name}</h3>
                    </div>
                  </div>
                  
                  <div className="project-card-body">
                    <div className="project-type-badge">
                      {project.type}
                    </div>
                    <p className="project-description">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="project-card-footer">
                    <div className="project-status">
                      <span className={`status-text ${project.status}`}>
                        {project.status === 'active' ? 'Active' : ''}
                      </span>
                    </div>
                    <span className="project-updated">
                      Updated {project.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProjects
