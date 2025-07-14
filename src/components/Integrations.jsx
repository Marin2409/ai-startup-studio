import React, { useState } from 'react'
import { Github, HardDrive, MessageSquare, ExternalLink, Check, X, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog"

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState({
    github: false,
    googleDrive: false,
    slack: false
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState(null)
  const [selectedProject, setSelectedProject] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Mock projects data - in real app this would come from API
  const availableProjects = [
    {
      id: 1,
      name: 'ai-startup-studio',
      type: 'SaaS',
      description: 'AI-powered startup development platform',
      status: 'active'
    },
    {
      id: 2,
      name: 'temp-2',
      type: 'E-commerce',
      description: 'Modern e-commerce solution',
      status: 'active'
    },
    {
      id: 3,
      name: 'fintech-app',
      type: 'Fintech',
      description: 'Digital banking platform',
      status: 'development'
    },
    {
      id: 4,
      name: 'healthtech-platform',
      type: 'Healthtech',
      description: 'Healthcare management system',
      status: 'active'
    },
    {
      id: 5,
      name: 'edtech-learning',
      type: 'Edtech',
      description: 'Online learning platform',
      status: 'development'
    }
  ]

  const handleConnect = (integration) => {
    if (integration === 'github' && !connectedIntegrations.github) {
      setSelectedIntegration(integration)
      setIsModalOpen(true)
    } else {
      // For other integrations or disconnect, just toggle
      setConnectedIntegrations(prev => ({
        ...prev,
        [integration]: !prev[integration]
      }))
    }
  }

  const handleProjectLink = () => {
    if (!selectedProject) return

    const project = availableProjects.find(p => p.id === parseInt(selectedProject))
    
    // Connect the integration
    setConnectedIntegrations(prev => ({
      ...prev,
      [selectedIntegration]: true
    }))

    // Show success message
    setSuccessMessage(`Success, your project "${project.name}" has been linked to ${getIntegrationName(selectedIntegration)}!`)
    setShowSuccessMessage(true)

    // Close modal and reset
    setIsModalOpen(false)
    setSelectedProject('')
    setSelectedIntegration(null)

    // Hide success message after 4 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 4000)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject('')
    setSelectedIntegration(null)
  }

  const getIntegrationName = (integrationId) => {
    const names = {
      github: 'GitHub',
      googleDrive: 'Google Drive',
      slack: 'Slack'
    }
    return names[integrationId] || integrationId
  }

  const integrations = [
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect any of your GitHub repositories to a project.',
      detailedDescription: 'You will be able to connect a GitHub repository to a Supabase project. The GitHub app will watch for changes in your repository such as file changes, branch changes as well as pull request activity.',
      icon: Github,
      color: '#24292e',
      buttonText: 'Add new project connection',
      connectedText: 'Connected to GitHub',
      isConnected: connectedIntegrations.github
    },
    {
      id: 'googleDrive',
      name: 'Google Drive',
      description: 'Connect your Google Drive to sync files and documents.',
      detailedDescription: 'Sync your project files with Google Drive. Upload, download, and manage your project documents directly from your dashboard. Keep your team files organized and accessible.',
      icon: HardDrive,
      color: '#4285f4',
      buttonText: 'Install Google Drive Integration',
      connectedText: 'Connected to Google Drive',
      isConnected: connectedIntegrations.googleDrive
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect your Slack workspace for team notifications.',
      detailedDescription: 'Get real-time notifications about your projects directly in your Slack channels. Stay updated on project progress, team activities, and important milestones.',
      icon: MessageSquare,
      color: '#4a154b',
      buttonText: 'Install Slack Integration',
      connectedText: 'Connected to Slack',
      isConnected: connectedIntegrations.slack
    }
  ]

  return (
    <div className="integrations-container">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <div className="success-content">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>{successMessage}</span>
            <button 
              onClick={() => setShowSuccessMessage(false)}
              className="success-close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="integrations-content">
        <div className="integrations-header">
          <h1 className="integrations-title">Integrations</h1>
        </div>

        <div className="integrations-grid">
          {integrations.map((integration) => {
            const Icon = integration.icon
            
            return (
              <div key={integration.id} className="integration-card">
                <div className="integration-card-left">
                  <div className="integration-header">
                    <div 
                      className="integration-icon"
                      style={{ backgroundColor: integration.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="integration-info">
                      <h3 className="integration-name">{integration.name}</h3>
                      <p className="integration-description">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="integration-card-right">
                  <div className="integration-details">
                    <h4 className="integration-details-title">
                      How will {integration.name} connections work?
                    </h4>
                    <p className="integration-details-description">
                      {integration.detailedDescription}
                    </p>
                  </div>

                  <div className="integration-actions">
                    <button
                      className={`integration-button ${integration.isConnected ? 'connected' : 'connect'}`}
                      onClick={() => handleConnect(integration.id)}
                    >
                      {integration.isConnected ? (
                        <>
                          <Check className="w-4 h-4" />
                          {integration.connectedText}
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          {integration.buttonText}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Project Selection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="project-selection-modal">
          <DialogHeader>
            <DialogTitle>Select Project to Connect</DialogTitle>
            <DialogDescription>
              Choose which project you want to connect to {selectedIntegration && getIntegrationName(selectedIntegration)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="project-selection-content">
            <div className="project-list">
              {availableProjects.map((project) => (
                <div
                  key={project.id}
                  className={`project-option ${selectedProject === project.id.toString() ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(project.id.toString())}
                >
                  <div className="project-option-info">
                    <h4 className="project-option-name">{project.name}</h4>
                    <p className="project-option-description">{project.description}</p>
                    <div className="project-option-meta">
                      <span className="project-type">{project.type}</span>
                      <span className={`project-status ${project.status}`}>
                        {project.status === 'active' ? 'Active' : 'Development'}
                      </span>
                    </div>
                  </div>
                  <div className="project-option-radio">
                    <div className={`radio-button ${selectedProject === project.id.toString() ? 'checked' : ''}`}>
                      {selectedProject === project.id.toString() && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={handleCloseModal}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProjectLink}
              disabled={!selectedProject}
              className="link-btn"
            >
              Link Project
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Integrations
