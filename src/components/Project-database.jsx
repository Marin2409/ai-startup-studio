import React from 'react'

const ProjectDatabase = ({ project }) => {

  return (
    <div>
      {/* Header Section */}
      <div className="project-overview-header">
        <div className="project-info">
          <h1 className="project-title">{project.name}</h1>
          <p className="project-description">{project.description}</p>
        </div>
      </div>

      {/* Documents Section - Database */}
      <h3 className="status-card-title">Database</h3>
      <div className="status-overview-documents">
      
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Database Schema</span>
            <span className="status-label">Database Schema</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Tables</span>
            <span className="status-label">Tables</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDatabase
