import React, { useState } from 'react'
import { 
  Copy, 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  Pause, 
  Globe, 
  Users, 
  Crown,
  ArrowUpRight,
  Database,
  Download,
  X
} from 'lucide-react'

const ProjectSettings = ({ project }) => {
  const [projectName, setProjectName] = useState(project?.name || 'ai-startup-studio')
  const [projectDescription, setProjectDescription] = useState(project?.description || 'AI-powered startup development platform with automated tools and resources.')
  const [isPublic, setIsPublic] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const projectId = 'pqcotbczcpbgqdymwtxc'

  const copyProjectId = () => {
    navigator.clipboard.writeText(projectId)
    // In real app, show toast notification
  }

  const handleSave = () => {
    // In real app, API call to save project settings
    console.log('Saving project settings...')
  }

  const handleRestart = () => {
    // In real app, API call to restart project
    console.log('Restarting project...')
  }

  const handlePause = () => {
    // In real app, API call to pause project
    console.log('Pausing project...')
  }

  const handleTransfer = () => {
    // In real app, open transfer modal
    console.log('Transferring project...')
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    if (deleteConfirmation === projectName) {
      // In real app, API call to delete project
      console.log('Deleting project...')
      setShowDeleteModal(false)
      setDeleteConfirmation('')
    }
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setDeleteConfirmation('')
  }

  const handleUpgradeToPro = () => {
    // In real app, navigate to billing/upgrade
    console.log('Upgrading to Pro...')
  }

  const handleExportData = () => {
    // In real app, trigger data export
    console.log('Exporting project data...')
  }

  const handleViewUsage = () => {
    // In real app, navigate to usage analytics
    console.log('Viewing project usage...')
  }

  const isDeleteButtonEnabled = deleteConfirmation === projectName

  return (
    <div>
      <div className="settings-header">
        <h1 className="settings-title">Project Settings</h1>
        <p className="settings-subtitle">Manage your project configuration, access, and danger zone actions</p>
      </div>

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
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Project ID</label>
                  <div className="input-with-action">
                    <input
                      type="text"
                      className="form-input readonly"
                      value={projectId}
                      readOnly
                    />
                    <button className="copy-btn-settings" onClick={copyProjectId}>
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-cancel">Cancel</button>
                  <button className="btn-save" onClick={handleSave}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Visibility */}
        <div className="settings-section">
          <div className="section-content">
            <div className="section-left">
              <h3 className="section-title">Project Visibility</h3>
              <p className="section-description">Control who can access your project</p>
            </div>
            <div className="section-right">
              <div className="settings-card">
                <div className="visibility-option">
                  <div className="option-info">
                    <div className="option-icon">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="option-details">
                      <span className="option-title">Private Project</span>
                      <span className="option-description">Only team members can access</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                    className="radio-input"
                  />
                </div>
                <div className="visibility-option">
                  <div className="option-info">
                    <div className="option-icon">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="option-details">
                      <span className="option-title">Public Project</span>
                      <span className="option-description">Anyone with the link can view</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                    className="radio-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Domains */}
        <div className="settings-section">
          <div className="section-content">
            <div className="section-left">
              <h3 className="section-title">Custom Domains</h3>
              <p className="section-description">Present a branded experience to your users</p>
            </div>
            <div className="section-right">
              <div className="settings-card pro-feature">
                <div className="pro-banner">
                  <Crown className="w-5 h-5" />
                  <div className="pro-info">
                    <span className="pro-title">Custom domains are a Pro Plan add-on</span>
                    <span className="pro-description">Paid Plans come with free vanity subdomains or Custom Domains for an additional $10/month per domain.</span>
                  </div>
                  <button className="btn-upgrade" onClick={handleUpgradeToPro}>
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Actions */}
        <div className="settings-section">
          <div className="section-content">
            <div className="section-left">
              <h3 className="section-title">Project Actions</h3>
              <p className="section-description">Manage project state and operations</p>
            </div>
            <div className="section-right">
              <div className="settings-card">
                <div className="action-item">
                  <div className="action-info">
                    <RefreshCw className="w-5 h-5 action-icon" />
                    <div className="action-details">
                      <span className="action-title">Restart Project</span>
                      <span className="action-description">Your project will not be available for a few minutes.</span>
                    </div>
                  </div>
                  <button className="btn-action" onClick={handleRestart}>
                    Restart Project
                  </button>
                </div>
                <div className="action-item">
                  <div className="action-info">
                    <Pause className="w-5 h-5 action-icon" />
                    <div className="action-details">
                      <span className="action-title">Pause Project</span>
                      <span className="action-description">Your project will not be accessible while it is paused.</span>
                    </div>
                  </div>
                  <button className="btn-action" onClick={handlePause}>
                    Pause Project
                  </button>
                </div>
                <div className="action-item">
                  <div className="action-info">
                    <Database className="w-5 h-5 action-icon" />
                    <div className="action-details">
                      <span className="action-title">Export Project Data</span>
                      <span className="action-description">Download a backup of your project data and configurations.</span>
                    </div>
                  </div>
                  <button className="btn-action" onClick={handleExportData}>
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Usage */}
        <div className="settings-section">
          <div className="section-content">
            <div className="section-left">
              <h3 className="section-title">Project Usage</h3>
              <p className="section-description">Monitor resource consumption and analytics</p>
            </div>
            <div className="section-right">
              <div className="settings-card">
                <div className="usage-notice">
                  <div className="usage-info">
                    <Database className="w-5 h-5" />
                    <div className="usage-details">
                      <span className="usage-title">Project usage statistics have been moved</span>
                      <span className="usage-description">You may view your project's usage under your organization's settings</span>
                    </div>
                  </div>
                  <button className="btn-action" onClick={handleViewUsage}>
                    View Project Usage
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Project */}
        <div className="settings-section">
          <div className="section-content">
            <div className="section-left">
              <h3 className="section-title">Transfer Project</h3>
              <p className="section-description">Transfer your project to a different organization</p>
            </div>
            <div className="section-right">
              <div className="settings-card">
                <div className="transfer-info">
                  <div className="transfer-details">
                    <ArrowUpRight className="w-5 h-5" />
                    <div className="transfer-content">
                      <span className="transfer-title">Transfer project to another organization</span>
                      <span className="transfer-description">To transfer projects, the owner must be a member of both the source and target organizations.</span>
                    </div>
                  </div>
                  <button className="btn-action" onClick={handleTransfer}>
                    Transfer Project
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
                    <span className="danger-title">Deleting this project will also remove your database.</span>
                    <span className="danger-description">Make sure you have made a backup if you want to keep your data.</span>
                  </div>
                </div>
                <button 
                  className="btn-danger"
                  onClick={handleDelete}
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
                Type {projectName} to confirm.
              </label>
              <input
                type="text"
                className="delete-modal-input"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Type the project name in here"
              />
            </div>
            
            <button 
              className={`delete-modal-button ${isDeleteButtonEnabled ? 'enabled' : 'disabled'}`}
              onClick={handleConfirmDelete}
              disabled={!isDeleteButtonEnabled}
            >
              I understand, delete this project
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectSettings
