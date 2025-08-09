import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Copy, 
  AlertTriangle, 
  Trash2, 
  X,
  Save,
  ArrowLeft
} from 'lucide-react'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const ProjectSettings = ({ project: initialProject }) => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  
  // Project data state
  const [project, setProject] = useState(initialProject || null)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  
  // UI state
  const [isLoading, setIsLoading] = useState(!initialProject)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  // Fetch project data if not provided via props
  useEffect(() => {
    const fetchProject = async () => {
      if (initialProject) {
        setProject(initialProject)
        setProjectName(initialProject.name)
        setProjectDescription(initialProject.description)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const token = localStorage.getItem('token')
        if (!token) {
          setError('Authentication required')
          return
        }

        console.log('Fetching project settings for ID:', projectId)

        const response = await fetch(`${API_BASE_URL}/api/user/projects/${projectId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (response.ok && data.success) {
          console.log('Project fetched for settings:', data.project.name)
          setProject(data.project)
          setProjectName(data.project.name)
          setProjectDescription(data.project.description)
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
  }, [projectId, initialProject])

  const copyProjectId = () => {
    if (project?.id) {
      navigator.clipboard.writeText(project.id)
      // You could add a toast notification here
      console.log('Project ID copied to clipboard')
    }
  }

  const handleSave = async () => {
    if (!project || !projectName.trim() || !projectDescription.trim()) {
      setError('Project name and description are required')
      return
    }

    try {
      setIsSaving(true)
      setError(null)
      setSaveMessage('')

      const token = localStorage.getItem('token')
      if (!token) {
        setError('Authentication required')
        return
      }

      console.log('Saving project settings...')

      const response = await fetch(`${API_BASE_URL}/api/user/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_name: projectName.trim(),
          project_description: projectDescription.trim()
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log('Project settings saved successfully')
        setSaveMessage('Settings saved successfully!')
        // Update local project state
        setProject(prev => ({
          ...prev,
          name: data.project.name,
          description: data.project.description
        }))
        
        // Clear success message after 3 seconds
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        console.error('Failed to save project:', data.message)
        setError(data.message || 'Failed to save project settings')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      setError('Connection error. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteConfirmation !== projectName) {
      return
    }

    try {
      setIsDeleting(true)
      setError(null)

      const token = localStorage.getItem('token')
      if (!token) {
        setError('Authentication required')
        return
      }

      console.log('Deleting project...')

      const response = await fetch(`${API_BASE_URL}/api/user/projects/${project.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log('Project deleted successfully')
        // Navigate back to dashboard
        navigate('/dashboard', { 
          state: { 
            message: data.message,
            projectDeleted: true 
          } 
        })
      } else {
        console.error('Failed to delete project:', data.message)
        setError(data.message || 'Failed to delete project')
        setIsDeleting(false)
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      setError('Connection error. Please try again.')
      setIsDeleting(false)
    }
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setDeleteConfirmation('')
  }

  const isDeleteButtonEnabled = deleteConfirmation === projectName

  if (isLoading) {
    return (
      <div className="settings-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading project settings...</p>
        </div>
      </div>
    )
  }

  if (error && !project) {
    return (
      <div className="settings-error">
        <div className="error-message">
          <h3>Error Loading Project Settings</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            Try Again
          </button>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="settings-header">
        <h1 className="settings-title">Project Settings</h1>
        <p className="settings-subtitle">Manage your project configuration, access, and danger zone actions</p>
      </div>

      {error && (
        <div className="error-banner">
          <AlertTriangle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {saveMessage && (
        <div className="success-banner">
          <Save className="w-5 h-5" />
          <span>{saveMessage}</span>
        </div>
      )}

      <div className="settings-content">
        {/* General Settings */}
        <div className="settings-section">
          <div className="section-content">
            <div className="section-left">
              <h3 className="section-title">General Settings</h3>
              <p className="section-description">Basic project information and configuration</p>
            </div>
            <div className="section-right">
              <div className="settings-card">
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Project Description</label>
                  <textarea
                    className="form-textarea"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Enter project description"
                    rows="3"
                    maxLength={500}
                  />
                  <span className="char-count">{projectDescription.length}/500</span>
                </div>
                <div className="form-group">
                  <label className="form-label">Project ID</label>
                  <div className="input-with-action">
                    <input
                      type="text"
                      className="form-input readonly"
                      value={project?.id || ''}
                      readOnly
                    />
                    <button className="copy-btn-settings" onClick={copyProjectId}>
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>
                <div className="form-actions">
                  <button 
                    className="btn-cancel"
                    onClick={() => navigate(`/project/${project?.id}`)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-save" 
                    onClick={handleSave}
                    disabled={isSaving || !projectName.trim() || !projectDescription.trim()}
                  >
                    {isSaving ? (
                      <>
                        <div className="spinner-small"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <div className="section-content">
            <div className="section-left">
              <h3 className="section-title danger">Delete Project</h3>
              <p className="section-description">Permanently remove this project and all its data</p>
            </div>
            <div className="section-right">
              <div className="settings-card danger-card">
                <div className="danger-warning">
                  <AlertTriangle className="w-5 h-5" />
                  <div className="danger-info">
                    <span className="danger-title">Deleting this project will remove all project data.</span>
                    <span className="danger-description">This action cannot be undone. Make sure you have backed up any important data.</span>
                  </div>
                </div>
                <button 
                  className="btn-danger"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-header">
              <h3 className="delete-modal-title">Confirm deletion of {projectName}</h3>
              <button className="delete-modal-close" onClick={handleCloseDeleteModal}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="delete-modal-warning">
              <AlertTriangle className="w-5 h-5 warning-icon" />
              <span className="warning-text">This action cannot be undone.</span>
            </div>
            
            <p className="delete-modal-description">
              This will permanently delete the {projectName} project and all of its data.
            </p>
            
            <div className="delete-modal-form">
              <label className="delete-modal-label">
                Type <strong>{projectName}</strong> to confirm.
              </label>
              <input
                type="text"
                className="delete-modal-input"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Type the project name here"
              />
            </div>
            
            <button 
              className={`delete-modal-button ${isDeleteButtonEnabled ? 'enabled' : 'disabled'}`}
              onClick={handleConfirmDelete}
              disabled={!isDeleteButtonEnabled || isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="spinner-small"></div>
                  Deleting...
                </>
              ) : (
                'I understand, delete this project'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectSettings
