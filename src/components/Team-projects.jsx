import React, { useState } from 'react'
import { 
  Users, 
  CheckCircle, 
  MoreHorizontal,
  UserPlus,
  Search,
  MessageCircle,
  FileText,
  Target,
  TrendingUp, 
  X,
  Send,
  Eye,
  Clock,
  GitBranch,
  Code,
  Palette,
  BarChart3,
  Star
} from 'lucide-react'

const TeamProjects = () => {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'developer',
    message: ''
  })

  // Mock project-specific team data
  const projectTeam = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Lead Developer',
      email: 'sarah@aistartup.com',
      avatar: null,
      status: 'online',
      joinDate: '2024-02-01',
      projectRole: 'Tech Lead',
      tasksCompleted: 32,
      tasksAssigned: 8,
      contributions: {
        commits: 156,
        pullRequests: 23,
        codeReviews: 45,
        hoursThisWeek: 42
      },
      skills: ['React', 'Node.js', 'AI/ML', 'Architecture'],
      lastActive: '2 hours ago',
      performance: 95
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'UI/UX Designer',
      email: 'michael@aistartup.com',
      avatar: null,
      status: 'away',
      joinDate: '2024-02-15',
      projectRole: 'Design Lead',
      tasksCompleted: 18,
      tasksAssigned: 5,
      contributions: {
        designs: 24,
        prototypes: 8,
        userFlows: 12,
        hoursThisWeek: 38
      },
      skills: ['Figma', 'Prototyping', 'User Research', 'Branding'],
      lastActive: '4 hours ago',
      performance: 88
    },
    {
      id: 3,
      name: 'David Kim',
      role: 'Full Stack Developer',
      email: 'david@aistartup.com',
      avatar: null,
      status: 'online',
      joinDate: '2024-03-15',
      projectRole: 'Backend Developer',
      tasksCompleted: 28,
      tasksAssigned: 6,
      contributions: {
        commits: 89,
        pullRequests: 15,
        codeReviews: 32,
        hoursThisWeek: 45
      },
      skills: ['Node.js', 'Database', 'API Design', 'DevOps'],
      lastActive: '1 hour ago',
      performance: 92
    },
    {
      id: 4,
      name: 'Emily Johnson',
      role: 'Product Manager',
      email: 'emily@aistartup.com',
      avatar: null,
      status: 'offline',
      joinDate: '2024-03-01',
      projectRole: 'Product Owner',
      tasksCompleted: 15,
      tasksAssigned: 3,
      contributions: {
        userStories: 45,
        sprints: 8,
        stakeholderMeetings: 12,
        hoursThisWeek: 35
      },
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
      lastActive: '1 day ago',
      performance: 85
    }
  ]

  const projectActivity = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'merged pull request',
      target: 'User Authentication API',
      time: '2 hours ago',
      type: 'code',
      impact: 'high'
    },
    {
      id: 2,
      user: 'Michael Rodriguez',
      action: 'completed design',
      target: 'Dashboard UI Components',
      time: '4 hours ago',
      type: 'design',
      impact: 'medium'
    },
    {
      id: 3,
      user: 'David Kim',
      action: 'deployed to staging',
      target: 'Payment Integration',
      time: '6 hours ago',
      type: 'deploy',
      impact: 'high'
    },
    {
      id: 4,
      user: 'Emily Johnson',
      action: 'updated user stories',
      target: 'Q4 Sprint Planning',
      time: '8 hours ago',
      type: 'planning',
      impact: 'medium'
    }
  ]

  const projectStats = {
    totalMembers: projectTeam.length,
    activeMembers: projectTeam.filter(m => m.status === 'online').length,
    totalTasks: projectTeam.reduce((sum, m) => sum + m.tasksAssigned, 0),
    completedTasks: projectTeam.reduce((sum, m) => sum + m.tasksCompleted, 0),
    averagePerformance: Math.round(projectTeam.reduce((sum, m) => sum + m.performance, 0) / projectTeam.length),
    totalHours: projectTeam.reduce((sum, m) => sum + m.contributions.hoursThisWeek, 0)
  }

  const handleInviteMember = (e) => {
    e.preventDefault()
    console.log('Inviting member to project:', inviteForm)
    setShowInviteModal(false)
    setInviteForm({ email: '', role: 'developer', message: '' })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'code': return <Code className="w-4 h-4" />
      case 'design': return <Palette className="w-4 h-4" />
      case 'deploy': return <GitBranch className="w-4 h-4" />
      case 'planning': return <Target className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const filteredTeam = projectTeam.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.projectRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div>
        {/* Header */}
        <div className="team-header">
          <div className="header-left">
            <h1 className="team-title">Project Team</h1>
            <p className="team-subtitle">Manage team members and track project contributions</p>
          </div>
          <div className="header-actions">
            <button 
              className="invite-member-btn"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="w-4 h-4" />
              Invite Member
            </button>
          </div>
        </div>

        {/* Project Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-icon blue">
              <Users className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">{projectStats.totalMembers}</h3>
              <p className="stat-label">Team Members</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon green">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">{projectStats.completedTasks}</h3>
              <p className="stat-label">Tasks Completed</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon purple">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">{projectStats.averagePerformance}%</h3>
              <p className="stat-label">Avg Performance</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon orange">
              <Clock className="w-5 h-5" />
            </div>
            <div className="stat-content">
              <h3 className="stat-value-team">{projectStats.totalHours}h</h3>
              <p className="stat-label">This Week</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="team-grid">
          {/* Team Members Section */}
          <div className="team-members-section">
            <div className="section-header">
              <h2 className="section-title">Team Members</h2>
              <div className="search-container">
                <Search className="w-4 h-4 search-icon" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="team-members-grid">
              {filteredTeam.map((member) => (
                <div key={member.id} className="team-member-card">
                  <div className="member-header">
                    <div className="member-avatar">
                      <div className="avatar-placeholder">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-role">{member.projectRole}</p>
                      <div className="member-meta">
                        <span className="member-status">{member.status}</span>
                        <span className="member-join">Joined {member.joinDate}</span>
                      </div>
                    </div>
                    <button className="member-menu">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="member-stats">
                    <div className="stat-row">
                      <div className="stat-item-member">
                        <CheckCircle className="w-4 h-4" />
                        <span>{member.tasksCompleted} completed</span>
                      </div>
                      <div className="stat-item-member">
                        <Target className="w-4 h-4" />
                        <span>{member.tasksAssigned} assigned</span>
                      </div>
                    </div>
                    <div className="performance-bar">
                      <div className="performance-fill" style={{ width: `${member.performance}%` }}></div>
                      <span className="performance-text">{member.performance}%</span>
                    </div>
                  </div>
                  
                  <div className="member-skills">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="skill-tag more">+{member.skills.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="member-footer">
                    <span className="last-active">Active {member.lastActive}</span>
                    <div className="member-actions">
                      <button className="action-btn-team" title="View Profile">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="action-btn-team" title="Message">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Activity Section */}
          <div className="project-activity-section">
            <div className="activity-card">
              <div className="card-header">
                <h3 className="card-title">Recent Project Activity</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activity-list">
                {projectActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">
                        <strong>{activity.user}</strong> {activity.action} <em>{activity.target}</em>
                      </p>
                      <div className="activity-meta">
                        <span className={`impact-badge ${getImpactColor(activity.impact)}`}>
                          {activity.impact} impact
                        </span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Performance */}
            <div className="performance-card">
              <div className="card-header">
                <h3 className="card-title">Team Performance</h3>
                <button className="view-all-btn">View Details</button>
              </div>
              <div className="performance-metrics">
                <div className="metric-item">
                  <div className="metric-header">
                    <BarChart3 className="w-4 h-4" />
                    <span>Code Quality</span>
                  </div>
                  <div className="metric-value">94%</div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-header">
                    <Clock className="w-4 h-4" />
                    <span>On-Time Delivery</span>
                  </div>
                  <div className="metric-value">87%</div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-header">
                    <Star className="w-4 h-4" />
                    <span>Team Satisfaction</span>
                  </div>
                  <div className="metric-value">92%</div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '92%' }}></div>
                  </div>
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
              <h3 className="modal-title">Invite Team Member to Project</h3>
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
                <label className="form-label">Project Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({...inviteForm, role: e.target.value})}
                  className="form-select"
                >
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="qa">QA Engineer</option>
                  <option value="devops">DevOps Engineer</option>
                  <option value="analyst">Business Analyst</option>
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
    </div>
  )
}

export default TeamProjects
