import React from 'react'

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

export default ProjectOverview