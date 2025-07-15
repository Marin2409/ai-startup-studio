import React from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar, 
  Target, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Edit3,
  Eye
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

  // Mock data for enhanced features
  const keyMetrics = [
    { 
      label: 'Monthly Recurring Revenue', 
      value: '$47.2K', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign 
    },
    { 
      label: 'Active Users', 
      value: '2,847', 
      change: '+8.2%', 
      trend: 'up',
      icon: Users 
    },
    { 
      label: 'Burn Rate', 
      value: '$23.1K/mo', 
      change: '-5.3%', 
      trend: 'down',
      icon: TrendingDown 
    },
    { 
      label: 'Runway', 
      value: '18 months', 
      change: '+2 mo', 
      trend: 'up',
      icon: Calendar 
    }
  ]

  const recentActivity = [
    { 
      type: 'milestone', 
      title: 'MVP Development Completed', 
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'green'
    },
    { 
      type: 'team', 
      title: 'Sarah joined as Lead Designer', 
      time: '1 day ago',
      icon: Users,
      color: 'blue'
    },
    { 
      type: 'funding', 
      title: 'Series A Round Discussion', 
      time: '3 days ago',
      icon: DollarSign,
      color: 'purple'
    },
    { 
      type: 'product', 
      title: 'User Authentication Released', 
      time: '5 days ago',
      icon: Activity,
      color: 'green'
    }
  ]

  const milestones = [
    { 
      title: 'Market Research', 
      status: 'completed', 
      progress: 100,
      dueDate: 'Completed'
    },
    { 
      title: 'MVP Development', 
      status: 'completed', 
      progress: 100,
      dueDate: 'Completed'
    },
    { 
      title: 'Beta Testing', 
      status: 'in-progress', 
      progress: 75,
      dueDate: 'Dec 15, 2024'
    },
    { 
      title: 'Series A Preparation', 
      status: 'pending', 
      progress: 25,
      dueDate: 'Jan 30, 2025'
    }
  ]

  const teamSummary = {
    totalMembers: 8,
    activeToday: 6,
    departments: [
      { name: 'Engineering', count: 4, color: '#3b82f6' },
      { name: 'Design', count: 2, color: '#8b5cf6' },
      { name: 'Marketing', count: 1, color: '#10b981' },
      { name: 'Operations', count: 1, color: '#f59e0b' }
    ]
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
    <div className="project-overview">
      {/* Header Section */}
      <div className="project-overview-header">
        <div className="project-info">
          <h1 className="project-title">{project.name}</h1>
          <p className="project-subtitle">{project.description}</p>
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
          <div className="status-badge">
            <span className={`badge ${project.badge.toLowerCase().replace(/[^a-z]/g, '-')}`}>
              {project.badge}
            </span>
          </div>
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
          <div className="status-indicator">
            <div className={`indicator-dot ${project.status.toLowerCase()}`}></div>
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
        {/* Key Metrics */}
        <div className="overview-card metrics-card">
          <div className="card-header">
            <h3 className="card-title">Key Metrics</h3>
            <span className="card-subtitle">Last 30 days</span>
          </div>
          <div className="metrics-grid">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <div key={index} className="metric-item">
                  <div className="metric-header">
                    <div className="metric-icon">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className={`metric-change ${metric.trend}`}>
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                  <div className="metric-content">
                    <span className="metric-value">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="overview-card activity-card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="activity-content">
                    <span className="activity-title">{activity.title}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Milestone Progress */}
        <div className="overview-card milestones-card">
          <div className="card-header">
            <h3 className="card-title">Milestone Progress</h3>
            <span className="card-subtitle">Current roadmap</span>
          </div>
          <div className="milestones-list">
            {milestones.map((milestone, index) => (
              <div key={index} className="milestone-item">
                <div className="milestone-header">
                  <span className="milestone-title">{milestone.title}</span>
                  <span className={`milestone-status ${milestone.status}`}>
                    {milestone.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                    {milestone.status === 'in-progress' && <Clock className="w-4 h-4" />}
                    {milestone.status === 'pending' && <AlertCircle className="w-4 h-4" />}
                  </span>
                </div>
                <div className="milestone-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{milestone.progress}%</span>
                </div>
                <span className="milestone-due">{milestone.dueDate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Summary */}
        <div className="overview-card team-card">
          <div className="card-header">
            <h3 className="card-title">Team Overview</h3>
            <span className="card-subtitle">{teamSummary.activeToday}/{teamSummary.totalMembers} active today</span>
          </div>
          <div className="team-stats">
            <div className="team-metric">
              <span className="team-value">{teamSummary.totalMembers}</span>
              <span className="team-label">Total Members</span>
            </div>
            <div className="team-departments">
              {teamSummary.departments.map((dept, index) => (
                <div key={index} className="department-item">
                  <div 
                    className="department-indicator" 
                    style={{ backgroundColor: dept.color }}
                  ></div>
                  <span className="department-name">{dept.name}</span>
                  <span className="department-count">{dept.count}</span>
                </div>
              ))}
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

        {/* Project Health */}
        <div className="overview-card health-card">
          <div className="card-header">
            <h3 className="card-title">Project Health</h3>
            <span className="card-subtitle">Overall assessment</span>
          </div>
          <div className="health-indicators">
            <div className="health-item">
              <span className="health-label">Financial</span>
              <div className="health-bar">
                <div className="health-fill excellent" style={{ width: '85%' }}></div>
              </div>
              <span className="health-score">85%</span>
            </div>
            <div className="health-item">
              <span className="health-label">Development</span>
              <div className="health-bar">
                <div className="health-fill good" style={{ width: '78%' }}></div>
              </div>
              <span className="health-score">78%</span>
            </div>
            <div className="health-item">
              <span className="health-label">Market</span>
              <div className="health-bar">
                <div className="health-fill warning" style={{ width: '65%' }}></div>
              </div>
              <span className="health-score">65%</span>
            </div>
            <div className="health-item">
              <span className="health-label">Team</span>
              <div className="health-bar">
                <div className="health-fill excellent" style={{ width: '92%' }}></div>
              </div>
              <span className="health-score">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview