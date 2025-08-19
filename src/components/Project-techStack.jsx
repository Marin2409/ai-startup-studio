import React from 'react'

const ProjectTechStack = ({ project }) => {

  return (
    <div>
      {/* Header Section */}
      <div className="project-overview-header">
        <div className="project-info">
          <h1 className="project-title">{project.name}</h1>
          <p className="project-description">{project.description}</p>
        </div>
      </div>

      {/* Documents Section - Tech Stack */}
      <h3 className="status-card-title">Tech Stack</h3>
      <div className="status-overview-documents">
      
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Frontend</span>
            <span className="status-label">Frontend</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Backend</span>
            <span className="status-label">Backend</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">UI/UX</span>
            <span className="status-label">UI/UX</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Deployment & Hosting</span>
            <span className="status-label">Deployment & Hosting</span>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default ProjectTechStack
