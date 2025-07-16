import React, { useState } from 'react'
import { 
  Plus, 
  Users, 
  CheckCircle, 
  MoreHorizontal,
  UserPlus,
  Search,
  Filter,
  Settings,
  MessageCircle,
  FileText,
  Target,
  TrendingUp, 
  X,
  Send,
  Eye,
} from 'lucide-react'

const Team = () => {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'member',
    workspace: '',
    message: ''
  })
  const [workspaceForm, setWorkspaceForm] = useState({
    name: '',
    description: '',
    privacy: 'private',
    color: 'blue'
  })

  // Mock data
  const workspaces = [
    {
      id: 1,
      name: 'AI Startup Studio',
      description: 'Main project workspace for AI-powered startup development platform',
      members: 8,
      tasks: 24,
      completed: 18,
      color: 'blue',
      privacy: 'private',
      lastActivity: '2 hours ago',
      progress: 75,
      status: 'active'
    },
    {
      id: 2,
      name: 'Fintech Project',
      description: 'Digital banking platform development and strategy',
      members: 5,
      tasks: 16,
      completed: 12,
      color: 'green',
      privacy: 'private',
      lastActivity: '4 hours ago',
      progress: 75,
      status: 'active'
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Q4 marketing initiatives and content strategy',
      members: 4,
      tasks: 12,
      completed: 8,
      color: 'purple',
      privacy: 'team',
      lastActivity: '1 day ago',
      progress: 67,
      status: 'active'
    },
    {
      id: 4,
      name: 'Product Research',
      description: 'Market research and competitive analysis',
      members: 3,
      tasks: 8,
      completed: 6,
      color: 'orange',
      privacy: 'private',
      lastActivity: '2 days ago',
      progress: 75,
      status: 'planning'
    }
  ]

  const teamMembers = [
    {
      id: 1,
      name: 'Jose Marin',
      role: 'Founder & CEO',
      email: 'jose@aistartup.com',
      avatar: null,
      status: 'online',
      workspaces: ['AI Startup Studio', 'Fintech Project'],
      tasksCompleted: 24,
      joinDate: '2024-01-15',
      skills: ['Strategy', 'Leadership', 'Product']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'CTO',
      email: 'sarah@aistartup.com',
      avatar: null,
      status: 'online',
      workspaces: ['AI Startup Studio', 'Product Research'],
      tasksCompleted: 32,
      joinDate: '2024-02-01',
      skills: ['Development', 'AI/ML', 'Architecture']
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Lead Designer',
      email: 'michael@aistartup.com',
      avatar: null,
      status: 'away',
      workspaces: ['AI Startup Studio', 'Marketing Campaign'],
      tasksCompleted: 18,
      joinDate: '2024-02-15',
      skills: ['UI/UX', 'Branding', 'Prototyping']
    },
    {
      id: 4,
      name: 'Emily Johnson',
      role: 'Marketing Manager',
      email: 'emily@aistartup.com',
      avatar: null,
      status: 'offline',
      workspaces: ['Marketing Campaign', 'Product Research'],
      tasksCompleted: 15,
      joinDate: '2024-03-01',
      skills: ['Marketing', 'Content', 'Analytics']
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Full Stack Developer',
      email: 'david@aistartup.com',
      avatar: null,
      status: 'online',
      workspaces: ['AI Startup Studio', 'Fintech Project'],
      tasksCompleted: 28,
      joinDate: '2024-03-15',
      skills: ['React', 'Node.js', 'Database']
    }
  ]

  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'completed task',
      target: 'API Integration',
      workspace: 'AI Startup Studio',
      time: '2 hours ago',
      type: 'task'
    },
    {
      id: 2,
      user: 'Michael Rodriguez',
      action: 'uploaded file',
      target: 'Design System v2.0',
      workspace: 'AI Startup Studio',
      time: '4 hours ago',
      type: 'file'
    },
    {
      id: 3,
      user: 'Emily Johnson',
      action: 'created task',
      target: 'Social Media Campaign',
      workspace: 'Marketing Campaign',
      time: '6 hours ago',
      type: 'task'
    },
    {
      id: 4,
      user: 'David Kim',
      action: 'commented on',
      target: 'Database Schema',
      workspace: 'Fintech Project',
      time: '8 hours ago',
      type: 'comment'
    }
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      task: 'MVP Launch Preparation',
      workspace: 'AI Startup Studio',
      assignee: 'Sarah Chen',
      dueDate: '2024-12-20',
      priority: 'high'
    },
    {
      id: 2,
      task: 'Q4 Marketing Report',
      workspace: 'Marketing Campaign',
      assignee: 'Emily Johnson',
      dueDate: '2024-12-22',
      priority: 'medium'
    },
    {
      id: 3,
      task: 'User Testing Results',
      workspace: 'Product Research',
      assignee: 'Michael Rodriguez',
      dueDate: '2024-12-25',
      priority: 'low'
    }
  ]

  const handleInviteMember = (e) => {
    e.preventDefault()
    console.log('Inviting member:', inviteForm)
    setShowInviteModal(false)
    setInviteForm({ email: '', role: 'member', workspace: '', message: '' })
  }

  const handleCreateWorkspace = (e) => {
    e.preventDefault()
    console.log('Creating workspace:', workspaceForm)
    setShowCreateWorkspaceModal(false)
    setWorkspaceForm({ name: '', description: '', privacy: 'private', color: 'blue' })
  }

  const getWorkspaceColor = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      pink: 'bg-pink-500'
    }
    return colors[color] || colors.blue
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="team-container">
      <div className="team-content">
        {/* Header */}
        <div className="team-header">
          <div className="header-left">
            <h1 className="team-title">Team & Workspaces</h1>
          </div>
          <div className="header-actions">
            <button 
              className="create-workspace-btn"
              onClick={() => setShowCreateWorkspaceModal(true)}
            >
              <Plus className="w-4 h-4" />
              Create Workspace
            </button>
            <button 
              className="invite-member-btn"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="w-4 h-4" />
              Invite Member
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-icon blue">
              <Users className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">{teamMembers.length}</h3>
              <p className="stat-label">Team Members</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon green">
              <Target className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">{workspaces.length}</h3>
              <p className="stat-label">Active Workspaces</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon purple">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">{workspaces.reduce((sum, ws) => sum + ws.tasks, 0)}</h3>
              <p className="stat-label">Total Tasks</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon orange">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">87%</h3>
              <p className="stat-label">Completion Rate</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="team-grid">
          {/* Workspaces Section */}
          <div className="workspaces-section">
            <div className="section-header">
              <h2 className="section-title">Workspaces</h2>
              <button className="section-action">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            <div className="workspaces-grid">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="workspace-card">
                  <div className="workspace-header">
                    <div className="workspace-info">
                      <div className={`workspace-color ${getWorkspaceColor(workspace.color)}`}></div>
                      <div>
                        <h3 className="workspace-name">{workspace.name}</h3>
                        <p className="workspace-description">{workspace.description}</p>
                      </div>
                    </div>
                    <button className="workspace-menu">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="workspace-stats">
                    <div className="stat-group">
                      <div className="stat">
                        <Users className="w-4 h-4" />
                        <span>{workspace.members} members</span>
                      </div>
                      <div className="stat">
                        <CheckCircle className="w-4 h-4" />
                        <span>{workspace.completed}/{workspace.tasks} tasks</span>
                      </div>
                    </div>
                    <div className="workspace-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${workspace.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{workspace.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="workspace-footer">
                    <span className="last-activity">Updated {workspace.lastActivity}</span>
                    <div className="workspace-actions">
                      <button className="action-btn-team">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="action-btn-team">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Create New Workspace Card */}
              <div 
                className="workspace-card create-card"
                onClick={() => setShowCreateWorkspaceModal(true)}
              >
                <div className="create-content">
                  <div className="create-icon">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="create-title">Create New Workspace</h3>
                  <p className="create-description">Set up a new workspace for your team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team & Activity Section */}
          <div className="team-activity-section">
            {/* Team Members */}
            <div className="team-members-card">
              <div className="card-header">
                <h3 className="card-title">Team Members</h3>
                <div className="search-container">
                  <Search className="w-4 h-4 search-icon" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              <div className="members-list">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="member-item">
                    <div className="member-avatar">
                      <div className="avatar-placeholder">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`status-indicator ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="member-info">
                      <h4 className="member-name">{member.name}</h4>
                      <p className="member-role">{member.role}</p>
                      <div className="member-stats">
                        <span className="stat-item">{member.tasksCompleted} tasks</span>
                        <span className="stat-item">{member.workspaces.length} workspaces</span>
                      </div>
                    </div>
                    <button className="member-actions">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-card">
              <div className="card-header">
                <h3 className="card-title">Recent Activity</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'task' && <CheckCircle className="w-4 h-4" />}
                      {activity.type === 'file' && <FileText className="w-4 h-4" />}
                      {activity.type === 'comment' && <MessageCircle className="w-4 h-4" />}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">
                        <strong>{activity.user}</strong> {activity.action} <em>{activity.target}</em>
                      </p>
                      <div className="activity-meta">
                        <span className="workspace-tag">{activity.workspace}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="deadlines-card">
              <div className="card-header">
                <h3 className="card-title">Upcoming Deadlines</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="deadlines-list">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="deadline-item">
                    <div className="deadline-info">
                      <h4 className="deadline-task">{deadline.task}</h4>
                      <p className="deadline-assignee">Assigned to {deadline.assignee}</p>
                      <span className="deadline-workspace">{deadline.workspace}</span>
                    </div>
                    <div className="deadline-meta">
                      <span className={`priority-badge ${getPriorityColor(deadline.priority)}`}>
                        {deadline.priority}
                      </span>
                      <span className="deadline-date">{deadline.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content invite-modal">
            <div className="modal-header">
              <h3 className="modal-title">Invite Team Member</h3>
              <button 
                className="modal-close"
                onClick={() => setShowInviteModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleInviteMember} className="invite-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                  placeholder="Enter email address"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({...inviteForm, role: e.target.value})}
                  className="form-select"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Workspace Access</label>
                <select
                  value={inviteForm.workspace}
                  onChange={(e) => setInviteForm({...inviteForm, workspace: e.target.value})}
                  className="form-select"
                >
                  <option value="">Select workspace</option>
                  {workspaces.map(ws => (
                    <option key={ws.id} value={ws.name}>{ws.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Personal Message (Optional)</label>
                <textarea
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm({...inviteForm, message: e.target.value})}
                  placeholder="Add a personal message to the invitation"
                  className="form-textarea"
                  rows={3}
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="invite-btn">
                  <Send className="w-4 h-4" />
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Workspace Modal */}
      {showCreateWorkspaceModal && (
        <div className="modal-overlay">
          <div className="modal-content workspace-modal">
            <div className="modal-header">
              <h3 className="modal-title">Create New Workspace</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreateWorkspaceModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateWorkspace} className="workspace-form">
              <div className="form-group">
                <label className="form-label">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceForm.name}
                  onChange={(e) => setWorkspaceForm({...workspaceForm, name: e.target.value})}
                  placeholder="Enter workspace name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={workspaceForm.description}
                  onChange={(e) => setWorkspaceForm({...workspaceForm, description: e.target.value})}
                  placeholder="Describe the purpose of this workspace"
                  className="form-textarea"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Privacy</label>
                <select
                  value={workspaceForm.privacy}
                  onChange={(e) => setWorkspaceForm({...workspaceForm, privacy: e.target.value})}
                  className="form-select"
                >
                  <option value="private">Private - Only invited members</option>
                  <option value="team">Team - All team members</option>
                  <option value="public">Public - Anyone in organization</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Color Theme</label>
                <div className="color-picker">
                  {['blue', 'green', 'purple', 'orange', 'red', 'pink'].map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${getWorkspaceColor(color)} ${workspaceForm.color === color ? 'selected' : ''}`}
                      onClick={() => setWorkspaceForm({...workspaceForm, color})}
                    />
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  onClick={() => setShowCreateWorkspaceModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  <Plus className="w-4 h-4" />
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Team
