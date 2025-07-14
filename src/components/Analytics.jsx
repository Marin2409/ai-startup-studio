import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Target, 
  Brain, 
  Zap, 
  BarChart3, 
  PieChart, 
  Activity,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  ChevronDown,
  FolderOpen
} from 'lucide-react'

const Analytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [selectedProject, setSelectedProject] = useState('all')

  // Mock projects data for dropdown
  const projects = [
    { id: 'all', name: 'All Projects', type: 'overview' },
    { id: 'ai-startup-studio', name: 'AI Startup Studio', type: 'SaaS' },
    { id: 'fintech-app', name: 'Fintech App', type: 'Fintech' },
    { id: 'ecommerce-platform', name: 'E-commerce Platform', type: 'E-commerce' },
    { id: 'healthcare-saas', name: 'Healthcare SaaS', type: 'SaaS' },
    { id: 'edtech-mobile', name: 'EdTech Mobile', type: 'EdTech' }
  ]

  // Function to get analytics data based on selected project
  const getAnalyticsData = (projectId) => {
    if (projectId === 'all') {
      return {
        overviewStats: [
          { title: 'Active Projects', value: '12', change: '+2', trend: 'up', icon: Target, color: 'blue' },
          { title: 'AI Tools Used', value: '847', change: '+23%', trend: 'up', icon: Brain, color: 'purple' },
          { title: 'Hours Saved', value: '156', change: '+18', trend: 'up', icon: Clock, color: 'green' },
          { title: 'Success Rate', value: '78%', change: '+5%', trend: 'up', icon: CheckCircle, color: 'emerald' }
        ],
        projectPerformance: [
          { name: 'AI Startup Studio', progress: 85, status: 'On Track', stage: 'Series A', health: 'excellent' },
          { name: 'Fintech App', progress: 72, status: 'On Track', stage: 'Seed', health: 'good' },
          { name: 'E-commerce Platform', progress: 45, status: 'At Risk', stage: 'Pre-seed', health: 'warning' },
          { name: 'Healthcare SaaS', progress: 91, status: 'Ahead', stage: 'Series A', health: 'excellent' },
          { name: 'EdTech Mobile', progress: 38, status: 'Behind', stage: 'Validation', health: 'critical' }
        ],
        insights: [
          { type: 'success', title: 'Strong AI Tool Adoption', message: 'Your team is effectively using AI tools, saving 156 hours this month.', icon: Zap },
          { type: 'warning', title: 'Project at Risk', message: 'E-commerce Platform is falling behind schedule. Consider resource reallocation.', icon: AlertTriangle },
          { type: 'info', title: 'Peak Productivity', message: 'Thursday shows highest activity. Consider scheduling important tasks then.', icon: Activity }
        ]
      }
    } else {
      // Single project analytics
      const project = projects.find(p => p.id === projectId)
      return {
        overviewStats: [
          { title: 'Project Progress', value: '85%', change: '+12%', trend: 'up', icon: Target, color: 'blue' },
          { title: 'AI Tools Used', value: '142', change: '+8%', trend: 'up', icon: Brain, color: 'purple' },
          { title: 'Hours Saved', value: '28', change: '+5', trend: 'up', icon: Clock, color: 'green' },
          { title: 'Tasks Completed', value: '67', change: '+15', trend: 'up', icon: CheckCircle, color: 'emerald' }
        ],
        projectPerformance: [
          { name: project?.name || 'Selected Project', progress: 85, status: 'On Track', stage: 'Series A', health: 'excellent' }
        ],
        insights: [
          { type: 'success', title: 'Excellent Progress', message: `${project?.name} is performing above expectations with strong momentum.`, icon: Zap },
          { type: 'info', title: 'AI Tool Efficiency', message: 'Business Plan Generator has been your most valuable tool for this project.', icon: Brain },
          { type: 'info', title: 'Next Milestone', message: 'Focus on MVP development to maintain current trajectory.', icon: Target }
        ]
      }
    }
  }

  const analyticsData = getAnalyticsData(selectedProject)

  const aiToolsUsage = [
    { tool: 'Business Plan Generator', usage: 245, timesSaved: 42, successRate: 87 },
    { tool: 'Roadmap Creator', usage: 189, timesSaved: 31, successRate: 92 },
    { tool: 'MVP Prioritizer', usage: 156, timesSaved: 28, successRate: 78 },
    { tool: 'Market Analyzer', usage: 134, timesSaved: 25, successRate: 84 },
    { tool: 'Pitch Deck Builder', usage: 123, timesSaved: 20, successRate: 89 }
  ]

  const weeklyActivity = [
    { day: 'Mon', projects: 8, aiTools: 15, hours: 6.5 },
    { day: 'Tue', projects: 12, aiTools: 23, hours: 8.2 },
    { day: 'Wed', projects: 10, aiTools: 18, hours: 7.1 },
    { day: 'Thu', projects: 15, aiTools: 28, hours: 9.3 },
    { day: 'Fri', projects: 14, aiTools: 25, hours: 8.7 },
    { day: 'Sat', projects: 6, aiTools: 12, hours: 4.2 },
    { day: 'Sun', projects: 4, aiTools: 8, hours: 2.8 }
  ]

  const getHealthColor = (health) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'text-green-600'
      case 'Ahead': return 'text-blue-600'
      case 'At Risk': return 'text-yellow-600'
      case 'Behind': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const selectedProjectData = projects.find(p => p.id === selectedProject)

  return (
    <div className="analytics-container">
      <div className="analytics-content">
        {/* Header */}
        <div className="analytics-header">
          <div className="header-left">
            <h1 className="analytics-title">Analytics Dashboard</h1>
          </div>
          <div className="header-actions">
            <div className="project-selector">
              <select 
                value={selectedProject} 
                onChange={(e) => setSelectedProject(e.target.value)}
                className="project-select"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                    {project.type !== 'overview' && ` (${project.type})`}
                  </option>
                ))}
              </select>
              <ChevronDown className="select-icon" />
            </div>
            <select 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="time-range-select"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="export-btn">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="overview-stats">
          {analyticsData.overviewStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <div className={`stat-icon ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`stat-trend ${stat.trend}`}>
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-title">{stat.title}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Analytics Grid */}
        <div className="analytics-grid">
          {/* Project Performance */}
          <div className="analytics-card project-performance">
            <div className="card-header">
              <h3 className="card-title">
                {selectedProject === 'all' ? 'Project Performance' : 'Project Details'}
              </h3>
              <div className="card-actions">
                <button className="card-action-btn">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="card-content">
              <div className="performance-table">
                <div className="table-header">
                  <span>Project</span>
                  <span>Progress</span>
                  <span>Status</span>
                  <span>Stage</span>
                  <span>Health</span>
                </div>
                {analyticsData.projectPerformance.map((project, index) => (
                  <div key={index} className="table-row">
                    <div className="project-info">
                      <span className="project-name">{project.name}</span>
                    </div>
                    <div className="progress-cell">
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{project.progress}%</span>
                    </div>
                    <div className={`status-cell ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                    <div className="stage-cell">
                      <span className="stage-badge">{project.stage}</span>
                    </div>
                    <div className="health-cell">
                      <span className={`health-badge ${getHealthColor(project.health)}`}>
                        {project.health}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tools Usage */}
          <div className="analytics-card ai-tools-usage">
            <div className="card-header">
              <h3 className="card-title">AI Tools Performance</h3>
              <div className="card-actions">
                <button className="card-action-btn">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="card-content">
              <div className="tools-grid">
                {aiToolsUsage.map((tool, index) => (
                  <div key={index} className="tool-card">
                    <div className="tool-header">
                      <h4 className="tool-name">{tool.tool}</h4>
                      <div className="tool-metrics">
                        <span className="metric-badge usage">{tool.usage} uses</span>
                      </div>
                    </div>
                    <div className="tool-stats">
                      <div className="stat-item">
                        <span className="stat-label">Time Saved</span>
                        <span className="stat-value">{tool.timesSaved}h</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Success Rate</span>
                        <span className="stat-value">{tool.successRate}%</span>
                      </div>
                    </div>
                    <div className="tool-progress">
                      <div 
                        className="tool-progress-bar" 
                        style={{ width: `${tool.successRate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="analytics-card weekly-activity">
            <div className="card-header">
              <h3 className="card-title">Weekly Activity</h3>
              <div className="card-actions">
                <button className="card-action-btn">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="card-content">
              <div className="activity-chart">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="activity-day">
                    <div className="day-bars">
                      <div 
                        className="bar projects-bar" 
                        style={{ height: `${(day.projects / 15) * 100}%` }}
                        title={`${day.projects} projects`}
                      ></div>
                      <div 
                        className="bar ai-tools-bar" 
                        style={{ height: `${(day.aiTools / 28) * 100}%` }}
                        title={`${day.aiTools} AI tools`}
                      ></div>
                    </div>
                    <span className="day-label">{day.day}</span>
                    <span className="day-hours">{day.hours}h</span>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color projects"></div>
                  <span>Projects</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color ai-tools"></div>
                  <span>AI Tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="analytics-card insights-panel">
            <div className="card-header">
              <h3 className="card-title">Key Insights</h3>
              <div className="card-actions">
                <button className="card-action-btn">
                  <Brain className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="card-content">
              <div className="insights-list">
                {analyticsData.insights.map((insight, index) => {
                  const Icon = insight.icon
                  return (
                    <div key={index} className={`insight-item ${insight.type}`}>
                      <div className="insight-icon">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="insight-content">
                        <h4 className="insight-title">{insight.title}</h4>
                        <p className="insight-message">{insight.message}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
