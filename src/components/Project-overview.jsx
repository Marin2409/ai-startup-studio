import React from 'react'
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Edit3,
  Eye,
  Building2,
  Target,
  Code,
  Heart,
  Wrench
} from 'lucide-react'

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

  const quickActions = [
    { label: 'View Analytics', icon: BarChart3, color: 'blue' },
    { label: 'Manage Tasks', icon: CheckCircle, color: 'green' },
    { label: 'Team Overview', icon: Users, color: 'purple' },
    { label: 'Documents', icon: FileText, color: 'orange' },
    { label: 'Settings', icon: Settings, color: 'gray' },
    { label: 'Add Update', icon: Plus, color: 'blue' }
  ]

  return (
    <div>
      {/* Header Section */}
      <div className="project-overview-header">
        <div className="project-info">
          <h1 className="project-title">{project.name}</h1>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-actions">
          <button className="action-btn secondary" title="Edit project settings, team, and details">
            <Edit3 className="w-4 h-4" />
            Edit Project
          </button>
          <button className="action-btn primary" title="View public project page for investors and stakeholders">
            <Eye className="w-4 h-4" />
            Public View
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-header">
            <div className="status-info">
              <span className="status-value">{project.progress}%</span>
              <span className="status-label">Overall Progress</span>
            </div>
            <div className="progress-ring">
              <div className="progress-circle" style={{'--progress': `${project.progress}%`}}></div>
            </div>
          </div>
        </div>
        
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">{project.fundingAmount}</span>
            <span className="status-label">Total Funding</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className={`status-value ${project.status.toLowerCase()}`}>{project.status}</span>
            <span className="status-label">Current Status</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">{project.region}</span>
            <span className="status-label">Region</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="overview-grid">
        {/* Project Details Card */}
        <div className="overview-card project-details-card">
          <div className="card-header">
            <h3 className="card-title">Project Details</h3>
            <span className="card-subtitle">Information from your submission</span>
          </div>
          <div className="project-details-grid">
            <div className="detail-item">
              <div className="detail-icon">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Industry: </span>
                <span className="detail-value">{project.industry}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">
                <Users className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Team Size: </span>
                <span className="detail-value">{project.teamSize}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">
                <Target className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Primary Objective: </span>
                <span className="detail-value">{project.objective}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">
                <Clock className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Timeline: </span>
                <span className="detail-value">{project.timeline}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Budget Range: </span>
                <span className="detail-value">{project.budgetRange}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">
                <Code className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Technical Level: </span>
                <span className="detail-value">{project.technicalLevel}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">
                <Heart className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Need Co-founder: </span>
                <span className="detail-value">{project.needCofounder ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Preferred Tech Stack: </span>
                <span className="detail-value">{project.techStack}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="overview-card actions-card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="actions-grid">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button key={index} className={`quick-action ${action.color}`}>
                  <Icon className="w-5 h-5" />
                  <span>{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview