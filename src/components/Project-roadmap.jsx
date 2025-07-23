import React, { useState } from 'react'
import {
  Flag,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Rocket,
  Building,
  Play,
  Plus,
  Search
} from 'lucide-react'

const ProjectRoadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Roadmap phases with visual styling
  const phases = [
    {
      id: 'planning',
      name: 'Planning & Validation',
      description: 'Market research, idea validation, and team formation',
      color: '#3b82f6',
      icon: Target,
      status: 'completed',
      progress: 95,
      duration: '3 months',
      startDate: '2023-10-01',
      endDate: '2023-12-31'
    },
    {
      id: 'mvp',
      name: 'MVP Development',
      description: 'Core product development and initial testing',
      color: '#10b981',
      icon: Zap,
      status: 'completed',
      progress: 88,
      duration: '4 months',
      startDate: '2024-01-01',
      endDate: '2024-04-30'
    },
    {
      id: 'beta',
      name: 'Beta & Testing',
      description: 'User testing, feedback integration, and refinement',
      color: '#f59e0b',
      icon: Play,
      status: 'in-progress',
      progress: 65,
      duration: '2 months',
      startDate: '2024-05-01',
      endDate: '2024-06-30'
    },
    {
      id: 'launch',
      name: 'Launch & Growth',
      description: 'Product launch, marketing, and user acquisition',
      color: '#8b5cf6',
      icon: Rocket,
      status: 'upcoming',
      progress: 25,
      duration: '6 months',
      startDate: '2024-07-01',
      endDate: '2024-12-31'
    },
    {
      id: 'scale',
      name: 'Scale & Expansion',
      description: 'Market expansion, feature development, and team growth',
      color: '#ef4444',
      icon: Building,
      status: 'upcoming',
      progress: 0,
      duration: '12 months',
      startDate: '2025-01-01',
      endDate: '2025-12-31'
    }
  ]

  // Detailed milestones for each phase
  const milestones = [
    // Planning & Validation Phase
    {
      id: 1,
      phaseId: 'planning',
      title: 'Market Research Complete',
      description: 'Comprehensive analysis of target market and competitors',
      status: 'completed',
      progress: 100,
      dueDate: '2023-10-15',
      completedDate: '2023-10-12',
      priority: 'high',
      assignee: 'Research Team',
      tags: ['research', 'market'],
      dependencies: []
    },
    {
      id: 2,
      phaseId: 'planning',
      title: 'Business Model Validated',
      description: 'Revenue streams and pricing strategy confirmed',
      status: 'completed',
      progress: 100,
      dueDate: '2023-11-01',
      completedDate: '2023-10-28',
      priority: 'critical',
      assignee: 'Business Team',
      tags: ['business', 'strategy'],
      dependencies: [1]
    },
    {
      id: 3,
      phaseId: 'planning',
      title: 'Core Team Assembled',
      description: 'Key team members hired and onboarded',
      status: 'completed',
      progress: 100,
      dueDate: '2023-11-30',
      completedDate: '2023-11-25',
      priority: 'high',
      assignee: 'HR Team',
      tags: ['team', 'hiring'],
      dependencies: []
    },
    {
      id: 4,
      phaseId: 'planning',
      title: 'Technical Architecture',
      description: 'System design and technology stack finalized',
      status: 'completed',
      progress: 90,
      dueDate: '2023-12-15',
      completedDate: '2023-12-10',
      priority: 'critical',
      assignee: 'Tech Team',
      tags: ['technical', 'architecture'],
      dependencies: [2]
    },

    // MVP Development Phase
    {
      id: 5,
      phaseId: 'mvp',
      title: 'Core Features Development',
      description: 'Essential product features implementation',
      status: 'completed',
      progress: 100,
      dueDate: '2024-02-28',
      completedDate: '2024-02-25',
      priority: 'critical',
      assignee: 'Dev Team',
      tags: ['development', 'features'],
      dependencies: [4]
    },
    {
      id: 6,
      phaseId: 'mvp',
      title: 'Authentication System',
      description: 'User registration, login, and security implementation',
      status: 'completed',
      progress: 100,
      dueDate: '2024-01-31',
      completedDate: '2024-01-28',
      priority: 'high',
      assignee: 'Backend Team',
      tags: ['auth', 'security'],
      dependencies: [4]
    },
    {
      id: 7,
      phaseId: 'mvp',
      title: 'UI/UX Design System',
      description: 'Complete design system and user interface',
      status: 'completed',
      progress: 95,
      dueDate: '2024-03-15',
      completedDate: '2024-03-12',
      priority: 'high',
      assignee: 'Design Team',
      tags: ['design', 'ui/ux'],
      dependencies: []
    },
    {
      id: 8,
      phaseId: 'mvp',
      title: 'MVP Testing & QA',
      description: 'Comprehensive testing and quality assurance',
      status: 'completed',
      progress: 85,
      dueDate: '2024-04-15',
      completedDate: '2024-04-10',
      priority: 'critical',
      assignee: 'QA Team',
      tags: ['testing', 'qa'],
      dependencies: [5, 6, 7]
    },

    // Beta & Testing Phase
    {
      id: 9,
      phaseId: 'beta',
      title: 'Beta User Recruitment',
      description: 'Recruit and onboard beta testing users',
      status: 'completed',
      progress: 100,
      dueDate: '2024-05-15',
      completedDate: '2024-05-12',
      priority: 'high',
      assignee: 'Marketing Team',
      tags: ['beta', 'users'],
      dependencies: [8]
    },
    {
      id: 10,
      phaseId: 'beta',
      title: 'Feedback Collection System',
      description: 'Implement user feedback and analytics tracking',
      status: 'completed',
      progress: 100,
      dueDate: '2024-05-20',
      completedDate: '2024-05-18',
      priority: 'medium',
      assignee: 'Analytics Team',
      tags: ['feedback', 'analytics'],
      dependencies: []
    },
    {
      id: 11,
      phaseId: 'beta',
      title: 'Feature Refinements',
      description: 'Implement user feedback and optimize performance',
      status: 'in-progress',
      progress: 70,
      dueDate: '2024-06-15',
      priority: 'high',
      assignee: 'Dev Team',
      tags: ['development', 'optimization'],
      dependencies: [9, 10]
    },
    {
      id: 12,
      phaseId: 'beta',
      title: 'Security Audit',
      description: 'Third-party security assessment and fixes',
      status: 'in-progress',
      progress: 40,
      dueDate: '2024-06-30',
      priority: 'critical',
      assignee: 'Security Team',
      tags: ['security', 'audit'],
      dependencies: []
    },

    // Launch & Growth Phase
    {
      id: 13,
      phaseId: 'launch',
      title: 'Marketing Campaign',
      description: 'Launch marketing and PR campaign',
      status: 'upcoming',
      progress: 30,
      dueDate: '2024-07-15',
      priority: 'high',
      assignee: 'Marketing Team',
      tags: ['marketing', 'launch'],
      dependencies: [11]
    },
    {
      id: 14,
      phaseId: 'launch',
      title: 'Customer Support Setup',
      description: 'Establish customer support and documentation',
      status: 'upcoming',
      progress: 20,
      dueDate: '2024-08-01',
      priority: 'medium',
      assignee: 'Support Team',
      tags: ['support', 'documentation'],
      dependencies: []
    },
    {
      id: 15,
      phaseId: 'launch',
      title: 'Series A Funding',
      description: 'Secure Series A funding round',
      status: 'upcoming',
      progress: 15,
      dueDate: '2024-09-30',
      priority: 'critical',
      assignee: 'Leadership Team',
      tags: ['funding', 'investment'],
      dependencies: [13]
    },

    // Scale & Expansion Phase
    {
      id: 16,
      phaseId: 'scale',
      title: 'International Expansion',
      description: 'Enter European and Asian markets',
      status: 'upcoming',
      progress: 0,
      dueDate: '2025-06-30',
      priority: 'high',
      assignee: 'Business Development',
      tags: ['expansion', 'international'],
      dependencies: [15]
    },
    {
      id: 17,
      phaseId: 'scale',
      title: 'Enterprise Features',
      description: 'Develop B2B and enterprise-grade features',
      status: 'upcoming',
      progress: 0,
      dueDate: '2025-03-31',
      priority: 'medium',
      assignee: 'Product Team',
      tags: ['enterprise', 'features'],
      dependencies: []
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'in-progress': return '#3b82f6'
      case 'upcoming': return '#64748b'
      case 'at-risk': return '#ef4444'
      default: return '#64748b'
    }
  }

  // TODO: Add filter and search functionality
  
  const currentPhase = phases.find(phase => phase.status === 'in-progress') || phases[0]
  const completedPhases = phases.filter(phase => phase.status === 'completed').length
  const totalMilestones = milestones.length
  const completedMilestones = milestones.filter(m => m.status === 'completed').length
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100)

  // Filter functionality
  const filteredPhases = phases.filter(phase => {
    // Phase filter
    if (selectedPhase !== 'all' && phase.id !== selectedPhase) {
      return false
    }
    
    // Search filter - search in phase name, description, and related milestones
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const phaseMatches = phase.name.toLowerCase().includes(searchLower) ||
                          phase.description.toLowerCase().includes(searchLower)
      
      const phaseMilestones = milestones.filter(m => m.phaseId === phase.id)
      const milestoneMatches = phaseMilestones.some(milestone => 
        milestone.title.toLowerCase().includes(searchLower) ||
        milestone.description.toLowerCase().includes(searchLower) ||
        milestone.assignee.toLowerCase().includes(searchLower) ||
        milestone.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
      
      return phaseMatches || milestoneMatches
    }
    
    return true
  })

  const renderPhaseView = () => (
    <div className="roadmap-phases">
      {filteredPhases.length > 0 ? (
        <div className="phases-grid">
          {filteredPhases.map(phase => {
            const PhaseIcon = phase.icon
            let phaseMilestones = milestones.filter(m => m.phaseId === phase.id)
            
            // Apply search filter to milestones if there's a search query
            if (searchQuery) {
              const searchLower = searchQuery.toLowerCase()
              phaseMilestones = phaseMilestones.filter(milestone =>
                milestone.title.toLowerCase().includes(searchLower) ||
                milestone.description.toLowerCase().includes(searchLower) ||
                milestone.assignee.toLowerCase().includes(searchLower) ||
                milestone.tags.some(tag => tag.toLowerCase().includes(searchLower))
              )
            }
            
            return (
              <div key={phase.id} className={`phase-card ${phase.status}`}>
                <div className="phase-card-header">
                  <div className="phase-card-icon" style={{ backgroundColor: phase.color }}>
                    <PhaseIcon className="w-8 h-8" />
                  </div>
                  <div className="phase-card-info">
                    <h3 className="phase-card-name">{phase.name}</h3>
                    <p className="phase-card-description">{phase.description}</p>
                  </div>
                </div>
                
                <div className="phase-card-stats">
                  <div className="phase-stat">
                    <span className="stat-label">Progress</span>
                    <span className="stat-value">{phase.progress}%</span>
                  </div>
                  <div className="phase-stat">
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">{phase.duration}</span>
                  </div>
                  <div className="phase-stat">
                    <span className="stat-label">Milestones</span>
                    <span className="stat-value">{milestones.filter(m => m.phaseId === phase.id).length}</span>
                  </div>
                </div>

                <div className="phase-card-progress">
                  <div className="progress-bar-large">
                    <div 
                      className="progress-fill-large" 
                      style={{ width: `${phase.progress}%`, backgroundColor: phase.color }}
                    ></div>
                  </div>
                </div>

                <div className="phase-card-milestones">
                  {phaseMilestones.slice(0, 3).map(milestone => (
                    <div key={milestone.id} className="milestone-preview">
                      <div 
                        className="milestone-status-dot" 
                        style={{ backgroundColor: getStatusColor(milestone.status) }}
                      ></div>
                      <span className="milestone-preview-title">{milestone.title}</span>
                    </div>
                  ))}
                  {phaseMilestones.length > 3 && (
                    <div className="milestone-preview">
                      <span className="more-milestones">+{phaseMilestones.length - 3} more</span>
                    </div>
                  )}
                  {phaseMilestones.length === 0 && searchQuery && (
                    <div className="milestone-preview">
                      <span className="no-milestones">No matching milestones</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="roadmap-empty-state">
          <div className="empty-state-content">
            <Flag className="w-12 h-12" />
            <h3>No phases found</h3>
            <p>
              {searchQuery 
                ? `No phases or milestones match "${searchQuery}"` 
                : selectedPhase !== 'all' 
                  ? `No phases found for the selected filter`
                  : 'No phases available'
              }
            </p>
            {(searchQuery || selectedPhase !== 'all') && (
              <button 
                className="roadmap-action-btn secondary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedPhase('all')
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="roadmap-container">
      {/* Header */}
      <div className="roadmap-header">
        <div className="roadmap-header-content">
          <h1 className="roadmap-title">Project Roadmap</h1>
          <p className="roadmap-subtitle">Track your startup journey from idea to scale</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="roadmap-stats-grid">
        <div className="roadmap-stat-card">
          <div className="stat-icon overall">
            <Target className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{overallProgress}%</span>
            <span className="stat-label">Overall Progress</span>
          </div>
        </div>
        <div className="roadmap-stat-card">
          <div className="stat-icon phases">
            <Flag className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{completedPhases}/{phases.length}</span>
            <span className="stat-label">Phases Complete</span>
          </div>
        </div>
        <div className="roadmap-stat-card">
          <div className="stat-icon milestones">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{completedMilestones}/{totalMilestones}</span>
            <span className="stat-label">Milestones Done</span>
          </div>
        </div>
        <div className="roadmap-stat-card">
          <div className="stat-icon current">
            <Clock className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{currentPhase.name}</span>
            <span className="stat-label">Current Phase</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="roadmap-controls">
        <div className="roadmap-controls-left">
          <button className="roadmap-action-btn primary">
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
          <div className="phase-filter">
            <select 
              value={selectedPhase} 
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="phase-select"
            >
              <option value="all">All Phases</option>
              {phases.map(phase => (
                <option key={phase.id} value={phase.id}>{phase.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="roadmap-controls-center">
          <div className="roadmap-search">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search milestones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="roadmap-search-input"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="roadmap-content">
        {renderPhaseView()}
      </div>
    </div>
  )
}

export default ProjectRoadmap