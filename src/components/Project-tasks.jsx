import React, { useState } from 'react'
import {
  Plus,
  Search,
  Users,
  Clock,
  Flag,
  MoreHorizontal,
  Edit3,
  PlayCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Target,
  TrendingUp,
  Kanban,
  List,
  Zap,
  MessageSquare,
  Paperclip,
  Calendar as CalendarIcon
} from 'lucide-react'

const ProjectTasks = () => {
  const [viewMode, setViewMode] = useState('board') // 'board', 'kanban', 'calendar'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSprint, setSelectedSprint] = useState('current')
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [showNewSprintModal, setShowNewSprintModal] = useState(false)
  const [showNewMilestoneModal, setShowNewMilestoneModal] = useState(false)

  // Mock data for sprints
  const sprints = [
    {
      id: 1,
      name: 'Sprint 1 - MVP Core Features',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-01-29',
      progress: 65,
      tasks: 12,
      completed: 8
    },
    {
      id: 2,
      name: 'Sprint 2 - User Authentication',
      status: 'planning',
      startDate: '2024-01-30',
      endDate: '2024-02-13',
      progress: 0,
      tasks: 8,
      completed: 0
    },
    {
      id: 3,
      name: 'Sprint 3 - Payment Integration',
      status: 'upcoming',
      startDate: '2024-02-14',
      endDate: '2024-02-28',
      progress: 0,
      tasks: 6,
      completed: 0
    }
  ]

  // Mock data for milestones
  const milestones = [
    {
      id: 1,
      name: 'MVP Beta Release',
      dueDate: '2024-02-15',
      progress: 72,
      status: 'on-track',
      tasks: 24,
      completed: 17,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Seed Funding Demo',
      dueDate: '2024-03-01',
      progress: 45,
      status: 'at-risk',
      tasks: 18,
      completed: 8,
      priority: 'critical'
    },
    {
      id: 3,
      name: 'Product Launch',
      dueDate: '2024-04-15',
      progress: 25,
      status: 'on-track',
      tasks: 32,
      completed: 8,
      priority: 'high'
    }
  ]

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Design user authentication flow',
      description: 'Create wireframes and user flow for login/signup process',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Chen',
      avatar: '👩‍💻',
      dueDate: '2024-01-25',
      sprint: 1,
      milestone: 1,
      tags: ['design', 'auth'],
      comments: 3,
      attachments: 2,
      timeEstimate: '8h',
      timeSpent: '5h'
    },
    {
      id: 2,
      title: 'Implement JWT authentication',
      description: 'Set up backend authentication with JWT tokens',
      status: 'todo',
      priority: 'high',
      assignee: 'Mike Rodriguez',
      avatar: '👨‍💻',
      dueDate: '2024-01-28',
      sprint: 1,
      milestone: 1,
      tags: ['backend', 'auth'],
      comments: 1,
      attachments: 0,
      timeEstimate: '12h',
      timeSpent: '0h'
    },
    {
      id: 3,
      title: 'Create landing page components',
      description: 'Build responsive React components for marketing site',
      status: 'completed',
      priority: 'medium',
      assignee: 'Alex Kim',
      avatar: '👨‍🎨',
      dueDate: '2024-01-20',
      sprint: 1,
      milestone: 1,
      tags: ['frontend', 'marketing'],
      comments: 5,
      attachments: 3,
      timeEstimate: '16h',
      timeSpent: '14h'
    },
    {
      id: 4,
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      status: 'in-review',
      priority: 'medium',
      assignee: 'Jordan Taylor',
      avatar: '⚙️',
      dueDate: '2024-01-26',
      sprint: 1,
      milestone: 1,
      tags: ['devops', 'automation'],
      comments: 2,
      attachments: 1,
      timeEstimate: '10h',
      timeSpent: '8h'
    },
    {
      id: 5,
      title: 'User testing for onboarding',
      description: 'Conduct user interviews and gather feedback',
      status: 'blocked',
      priority: 'low',
      assignee: 'Emma Wilson',
      avatar: '👩‍🔬',
      dueDate: '2024-01-30',
      sprint: 1,
      milestone: 1,
      tags: ['research', 'ux'],
      comments: 0,
      attachments: 0,
      timeEstimate: '6h',
      timeSpent: '2h'
    }
  ]

  const statusColumns = [
    { id: 'todo', name: 'To Do', color: '#94a3b8', count: tasks.filter(t => t.status === 'todo').length },
    { id: 'in-progress', name: 'In Progress', color: '#3b82f6', count: tasks.filter(t => t.status === 'in-progress').length },
    { id: 'in-review', name: 'In Review', color: '#f59e0b', count: tasks.filter(t => t.status === 'in-review').length },
    { id: 'completed', name: 'Completed', color: '#10b981', count: tasks.filter(t => t.status === 'completed').length },
    { id: 'blocked', name: 'Blocked', color: '#ef4444', count: tasks.filter(t => t.status === 'blocked').length }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#dc2626'
      case 'high': return '#ea580c'
      case 'medium': return '#ca8a04'
      case 'low': return '#65a30d'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4" />
      case 'in-progress': return <PlayCircle className="w-4 h-4" />
      case 'in-review': return <AlertCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'blocked': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getMilestoneStatus = (status) => {
    switch (status) {
      case 'on-track': return { color: '#10b981', label: 'On Track' }
      case 'at-risk': return { color: '#f59e0b', label: 'At Risk' }
      case 'delayed': return { color: '#ef4444', label: 'Delayed' }
      default: return { color: '#6b7280', label: 'Unknown' }
    }
  }

  const currentSprint = sprints.find(s => s.status === 'active') || sprints[0]

  const renderBoardView = () => (
    <div className="tasks-board-container">
      {/* Sprint Info Header */}
      <div className="tasks-sprint-header">
        <div className="sprint-info">
          <div className="sprint-main">
            <h3 className="sprint-title">{currentSprint.name}</h3>
            <div className="sprint-meta">
              <span className="sprint-dates">{currentSprint.startDate} - {currentSprint.endDate}</span>
              <span className="sprint-progress">{currentSprint.completed}/{currentSprint.tasks} tasks completed</span>
            </div>
          </div>
          <div className="sprint-progress-container">
            <div className="sprint-progress-bar">
              <div 
                className="sprint-progress-fill" 
                style={{ width: `${currentSprint.progress}%` }}
              ></div>
            </div>
            <span className="sprint-progress-text">{currentSprint.progress}%</span>
          </div>
        </div>
      </div>

      {/* Board Table */}
      <div className="tasks-board-table">
        {/* Table Header */}
        <div className="board-header">
          <div className="board-header-cell task-name">Task</div>
          <div className="board-header-cell assignee">Assignee</div>
          <div className="board-header-cell status">Status</div>
          <div className="board-header-cell priority">Priority</div>
          <div className="board-header-cell due-date">Due Date</div>
          <div className="board-header-cell progress">Progress</div>
          <div className="board-header-cell actions">Actions</div>
        </div>

        {/* Table Body */}
        <div className="board-body">
          {tasks.map(task => (
            <div key={task.id} className="board-row">
              <div className="board-cell task-name">
                <div className="task-info">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    {task.tags.map(tag => (
                      <span key={tag} className="task-tag">{tag}</span>
                    ))}
                    <div className="task-stats">
                      {task.comments > 0 && (
                        <span className="task-stat">
                          <MessageSquare className="w-3 h-3" />
                          {task.comments}
                        </span>
                      )}
                      {task.attachments > 0 && (
                        <span className="task-stat">
                          <Paperclip className="w-3 h-3" />
                          {task.attachments}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="board-cell assignee">
                <div className="assignee-info">
                  <span className="assignee-avatar">{task.avatar}</span>
                  <span className="assignee-name">{task.assignee}</span>
                </div>
              </div>
              <div className="board-cell status">
                <div className="status-badge" style={{ backgroundColor: statusColumns.find(s => s.id === task.status)?.color }}>
                  {getStatusIcon(task.status)}
                  <span>{statusColumns.find(s => s.id === task.status)?.name}</span>
                </div>
              </div>
              <div className="board-cell priority">
                <div className="priority-badge" style={{ color: getPriorityColor(task.priority) }}>
                  <Flag className="w-4 h-4" />
                  <span>{task.priority}</span>
                </div>
              </div>
              <div className="board-cell due-date">
                <div className="due-date-info">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{task.dueDate}</span>
                </div>
              </div>
              <div className="board-cell progress">
                <div className="task-time-info">
                  <span className="time-spent">{task.timeSpent}</span>
                  <span className="time-estimate">/ {task.timeEstimate}</span>
                </div>
              </div>
              <div className="board-cell actions">
                <button className="task-action-btn">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="task-action-btn">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderKanbanView = () => (
    <div className="tasks-kanban-container">
      <div className="kanban-columns">
        {statusColumns.map(column => (
          <div key={column.id} className="kanban-column">
            <div className="kanban-column-header">
              <div className="column-title" style={{ color: column.color }}>
                <span>{column.name}</span>
                <span className="column-count">{column.count}</span>
              </div>
              <button className="add-task-btn">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="kanban-column-body">
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div key={task.id} className="kanban-card">
                    <div className="card-header">
                      <h4 className="card-title">{task.title}</h4>
                      <div className="card-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
                    </div>
                    <p className="card-description">{task.description}</p>
                    <div className="card-tags">
                      {task.tags.map(tag => (
                        <span key={tag} className="card-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <div className="card-assignee">
                        <span className="assignee-avatar-small">{task.avatar}</span>
                        <span className="assignee-name-small">{task.assignee.split(' ')[0]}</span>
                      </div>
                      <div className="card-meta">
                        <span className="card-due-date">{task.dueDate}</span>
                        <div className="card-stats">
                          {task.comments > 0 && (
                            <span className="card-stat">
                              <MessageSquare className="w-3 h-3" />
                              {task.comments}
                            </span>
                          )}
                          {task.attachments > 0 && (
                            <span className="card-stat">
                              <Paperclip className="w-3 h-3" />
                              {task.attachments}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="tasks-header">
        <div className="tasks-header-content">
          <h1 className="tasks-title">Tasks & Milestones</h1>
          <p className="tasks-subtitle">Manage your project tasks, sprints, and track milestone progress</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="tasks-stats-grid">
        <div className="tasks-stat-card">
          <div className="stat-icon active">
            <Target className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{milestones.filter(m => m.status === 'on-track').length}</span>
            <span className="stat-label">Active Milestones</span>
          </div>
        </div>
        <div className="tasks-stat-card">
          <div className="stat-icon progress">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{currentSprint.progress}%</span>
            <span className="stat-label">Sprint Progress</span>
          </div>
        </div>
        <div className="tasks-stat-card">
          <div className="stat-icon completed">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{tasks.filter(t => t.status === 'completed').length}</span>
            <span className="stat-label">Tasks Completed</span>
          </div>
        </div>
        <div className="tasks-stat-card">
          <div className="stat-icon team">
            <Users className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{new Set(tasks.map(t => t.assignee)).size}</span>
            <span className="stat-label">Team Members</span>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="tasks-milestones-section">
        <div className="section-header">
          <h2 className="section-title">🎯 Milestones</h2>
          <button className="tasks-action-btn primary" onClick={() => setShowNewMilestoneModal(true)}>
            <Plus className="w-4 h-4" />
            New Milestone
          </button>
        </div>
        <div className="milestones-grid">
          {milestones.map(milestone => {
            const statusInfo = getMilestoneStatus(milestone.status)
            return (
              <div key={milestone.id} className="milestone-card">
                <div className="milestone-header">
                  <div className="milestone-info">
                    <h3 className="milestone-name">{milestone.name}</h3>
                    <div className="milestone-meta">
                      <span className="milestone-due">Due: {milestone.dueDate}</span>
                      <span className="milestone-status" style={{ color: statusInfo.color }}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="milestone-priority" style={{ backgroundColor: getPriorityColor(milestone.priority) }}>
                    <Flag className="w-4 h-4" />
                  </div>
                </div>
                <div className="milestone-progress">
                  <div className="progress-info">
                    <span className="progress-label">Progress</span>
                    <span className="progress-value">{milestone.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill milestone" 
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                  <div className="task-count">
                    {milestone.completed}/{milestone.tasks} tasks completed
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="tasks-controls">
        <div className="tasks-controls-left">
          <button className="tasks-action-btn primary" onClick={() => setShowNewTaskModal(true)}>
            <Plus className="w-4 h-4" />
            New Task
          </button>
          <button className="tasks-action-btn secondary" onClick={() => setShowNewSprintModal(true)}>
            <Zap className="w-4 h-4" />
            New Sprint
          </button>
        </div>

        <div className="tasks-controls-center">
          <div className="tasks-search">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tasks-search-input"
            />
          </div>
        </div>

        <div className="tasks-controls-right">
          <div className="tasks-view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'board' ? 'active' : ''}`}
              onClick={() => setViewMode('board')}
            >
              <List className="w-4 h-4" />
              Board
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
            >
              <Kanban className="w-4 h-4" />
              Kanban
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tasks-main-content">
        {viewMode === 'board' ? renderBoardView() : renderKanbanView()}
      </div>
    </div>
  )
}

export default ProjectTasks
