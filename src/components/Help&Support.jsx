import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  BookOpen, 
  HelpCircle, 
  Bug, 
  Lightbulb, 
  Users, 
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Star,
  Heart,
  Send,
  Download,
  Video,
  FileText,
  Zap
} from 'lucide-react'

const HelpSupport = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const [supportTicket, setSupportTicket] = useState({
    category: '',
    priority: 'medium',
    subject: '',
    description: ''
  })
  const [showThankYou, setShowThankYou] = useState(false)

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const handleTicketSubmit = (e) => {
    e.preventDefault()
    // Simulate ticket submission
    console.log('Support ticket submitted:', supportTicket)
    setShowThankYou(true)
    setTimeout(() => {
      setShowThankYou(false)
      setSupportTicket({
        category: '',
        priority: 'medium',
        subject: '',
        description: ''
      })
    }, 3000)
  }

  const handleTicketChange = (field, value) => {
    setSupportTicket(prev => ({ ...prev, [field]: value }))
  }

  const navigationSections = [
    { id: 'overview', label: 'Help Center', icon: HelpCircle },
    { id: 'faq', label: 'FAQ', icon: MessageCircle },
    { id: 'contact', label: 'Contact Support', icon: Phone },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'resources', label: 'Resources', icon: Lightbulb },
  ]

  const quickActions = [
    {
      title: 'Start a Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'blue',
      action: () => console.log('Start live chat')
    },
    {
      title: 'Submit a Ticket',
      description: 'Send us a detailed support request',
      icon: Bug,
      color: 'green',
      action: () => setActiveSection('contact')
    },
    {
      title: 'Browse Documentation',
      description: 'Find guides and tutorials',
      icon: BookOpen,
      color: 'purple',
      action: () => setActiveSection('documentation')
    },
    {
      title: 'Feature Request',
      description: 'Suggest improvements or new features',
      icon: Lightbulb,
      color: 'orange',
      action: () => setActiveSection('contact')
    }
  ]

  const supportStats = [
    { label: 'Avg Response Time', value: '< 2 hours', icon: Clock },
    { label: 'Resolution Rate', value: '98.5%', icon: CheckCircle },
    { label: 'Customer Rating', value: '4.9/5', icon: Star },
    { label: 'Articles', value: '150+', icon: FileText }
  ]

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create my first AI startup project?',
          answer: 'To create your first project, click the "New Project" button on your dashboard. Choose your project type, enter basic information like name and description, select your tech stack, and configure initial settings. Our AI assistant will guide you through the process and suggest best practices based on your startup type.'
        },
        {
          question: 'What AI tools are available in the platform?',
          answer: 'Our platform includes business plan generation, market analysis tools, financial modeling, competitive analysis, user persona creation, content generation, and technical architecture planning. All tools are powered by advanced AI to help accelerate your startup development process.'
        },
        {
          question: 'How do I invite team members to my project?',
          answer: 'Go to your project dashboard, click on "Team" in the sidebar, then click "Invite Members". Enter their email addresses and select their roles (Admin, Developer, Designer, etc.). They\'ll receive an invitation email to join your project workspace.'
        }
      ]
    },
    {
      category: 'Account & Billing',
      questions: [
        {
          question: 'How can I upgrade my subscription plan?',
          answer: 'Visit your Account Preferences > Billing & Subscription section. You can view available plans and upgrade instantly. All upgrades are prorated, and you\'ll only pay the difference for the remaining billing period.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans. All payments are processed securely through Stripe.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your billing settings. Your account will remain active until the end of your current billing period, and you\'ll retain access to all your projects and data.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'Why is my project loading slowly?',
          answer: 'Slow loading can be caused by large file uploads, complex AI computations, or network issues. Try refreshing the page, clearing your browser cache, or switching to a different browser. If the issue persists, contact our technical support team.'
        },
        {
          question: 'How do I export my project data?',
          answer: 'Go to Project Settings > Export Data. You can export your business plan as PDF, financial models as Excel files, and technical documentation as markdown. Enterprise users can also access raw data exports via API.'
        },
        {
          question: 'Is my data secure and backed up?',
          answer: 'Yes, all data is encrypted in transit and at rest. We perform automated daily backups with 99.9% uptime guarantee. Your data is stored in secure, SOC 2 compliant data centers with redundant systems.'
        }
      ]
    }
  ]

  const documentationSections = [
    {
      title: 'Quick Start Guide',
      description: 'Get up and running in 5 minutes',
      icon: Zap,
      articles: ['Creating Your First Project', 'Setting Up Your Team', 'Using AI Tools']
    },
    {
      title: 'Project Management',
      description: 'Master project organization and collaboration',
      icon: Users,
      articles: ['Project Templates', 'Team Collaboration', 'Task Management', 'Milestone Planning']
    },
    {
      title: 'AI Tools Guide',
      description: 'Learn to leverage our AI features',
      icon: Lightbulb,
      articles: ['Business Plan Generator', 'Market Analysis', 'Financial Modeling', 'Tech Stack Builder']
    },
    {
      title: 'API Documentation',
      description: 'Integrate with external tools and services',
      icon: FileText,
      articles: ['Authentication', 'Project API', 'Webhooks', 'Rate Limits']
    }
  ]

  const renderOverviewSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Welcome to Help Center</h3>
      </div>

      {/* Search Bar */}
      <div className="help-search-container">
        <div className="help-search">
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help articles, guides, and FAQs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="help-search-input"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="help-quick-actions">
        <h4>Quick Actions</h4>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={action.action}
                className={`quick-action-card ${action.color}`}
              >
                <div className="action-icon">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="action-content">
                  <h5>{action.title}</h5>
                  <p>{action.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 action-arrow" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Support Stats */}
      <div className="help-stats">
        <h4>Support Statistics</h4>
        <div className="stats-grid">
          {supportStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="help-stat-card">
                <div className="stat-icon">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="popular-articles">
        <h4>Popular Articles</h4>
        <div className="articles-list">
          <a href="#" className="article-link">
            <BookOpen className="w-4 h-4" />
            <span>Getting Started with AI Startup Studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a href="#" className="article-link">
            <Users className="w-4 h-4" />
            <span>Managing Your Startup Team</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a href="#" className="article-link">
            <Lightbulb className="w-4 h-4" />
            <span>Using AI Tools for Business Planning</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a href="#" className="article-link">
            <CheckCircle className="w-4 h-4" />
            <span>Best Practices for Project Management</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )

  const renderFAQSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Frequently Asked Questions</h3>
      </div>

      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="faq-category">
          <h4 className="faq-category-title">{category.category}</h4>
          <div className="faq-questions">
            {category.questions.map((faq, faqIndex) => {
              const isExpanded = expandedFAQ === `${categoryIndex}-${faqIndex}`
              return (
                <div key={faqIndex} className="faq-item">
                  <button
                    onClick={() => toggleFAQ(`${categoryIndex}-${faqIndex}`)}
                    className="faq-question"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                  {isExpanded && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  const renderContactSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Contact Support</h3>
      </div>

      {showThankYou ? (
        <div className="thank-you-message">
          <CheckCircle className="w-12 h-12" />
          <h4>Thank you for contacting us!</h4>
          <p>We've received your support ticket and will respond within 2 hours during business hours.</p>
        </div>
      ) : (
        <>
          {/* Contact Methods */}
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon chat">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="method-info">
                <h5>Live Chat</h5>
                <p>Available 24/7 for immediate assistance</p>
                <button className="method-button">Start Chat</button>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon email">
                <Mail className="w-6 h-6" />
              </div>
              <div className="method-info">
                <h5>Email Support</h5>
                <p>support@aistartupstudio.com</p>
                <span className="response-time">Response within 2 hours</span>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon phone">
                <Phone className="w-6 h-6" />
              </div>
              <div className="method-info">
                <h5>Phone Support</h5>
                <p>+1 (555) 123-4567</p>
                <span className="response-time">Mon-Fri 9AM-6PM PST</span>
              </div>
            </div>
          </div>

          {/* Support Ticket Form */}
          <div className="settings-card">
            <h4>Submit a Support Ticket</h4>
            <form onSubmit={handleTicketSubmit} className="support-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={supportTicket.category}
                    onChange={(e) => handleTicketChange('category', e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing & Account</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={supportTicket.priority}
                    onChange={(e) => handleTicketChange('priority', e.target.value)}
                    className="form-input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={supportTicket.subject}
                  onChange={(e) => handleTicketChange('subject', e.target.value)}
                  className="form-input"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={supportTicket.description}
                  onChange={(e) => handleTicketChange('description', e.target.value)}
                  className="form-textarea"
                  rows={5}
                  placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )

  const renderDocumentationSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Documentation</h3>
      </div>

      <div className="documentation-grid">
        {documentationSections.map((section, index) => {
          const Icon = section.icon
          return (
            <div key={index} className="doc-section-card">
              <div className="doc-header">
                <div className="doc-icon">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="doc-info">
                  <h5>{section.title}</h5>
                  <p>{section.description}</p>
                </div>
              </div>
              <div className="doc-articles">
                {section.articles.map((article, articleIndex) => (
                  <a key={articleIndex} href="#" className="doc-article-link">
                    <FileText className="w-4 h-4" />
                    <span>{article}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Video Tutorials */}
      <div className="video-tutorials">
        <h4>Video Tutorials</h4>
        <div className="tutorials-grid">
          <div className="tutorial-card">
            <div className="tutorial-thumbnail">
              <Video className="w-8 h-8" />
              <span className="duration">5:32</span>
            </div>
            <div className="tutorial-info">
              <h6>Getting Started with AI Startup Studio</h6>
              <p>Learn the basics in under 6 minutes</p>
            </div>
          </div>
          <div className="tutorial-card">
            <div className="tutorial-thumbnail">
              <Video className="w-8 h-8" />
              <span className="duration">8:15</span>
            </div>
            <div className="tutorial-info">
              <h6>Creating Your First Business Plan</h6>
              <p>Step-by-step business plan generation</p>
            </div>
          </div>
          <div className="tutorial-card">
            <div className="tutorial-thumbnail">
              <Video className="w-8 h-8" />
              <span className="duration">6:41</span>
            </div>
            <div className="tutorial-info">
              <h6>Team Collaboration Features</h6>
              <p>Work effectively with your team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCommunitySection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Community</h3>
      </div>

      <div className="community-cards">
        <div className="community-card">
          <div className="community-header">
            <Users className="w-6 h-6" />
            <div>
              <h5>Community Forum</h5>
              <p>Discuss ideas and get feedback from other founders</p>
            </div>
          </div>
          <div className="community-stats">
            <span>12.5k Members</span>
            <span>•</span>
            <span>850 Active Today</span>
          </div>
          <button className="community-button">Join Forum</button>
        </div>

        <div className="community-card">
          <div className="community-header">
            <MessageCircle className="w-6 h-6" />
            <div>
              <h5>Discord Server</h5>
              <p>Real-time chat with entrepreneurs and our team</p>
            </div>
          </div>
          <div className="community-stats">
            <span>8.2k Members</span>
            <span>•</span>
            <span>320 Online</span>
          </div>
          <button className="community-button">Join Discord</button>
        </div>

        <div className="community-card">
          <div className="community-header">
            <Star className="w-6 h-6" />
            <div>
              <h5>Success Stories</h5>
              <p>Read inspiring stories from successful founders</p>
            </div>
          </div>
          <div className="community-stats">
            <span>150+ Stories</span>
            <span>•</span>
            <span>$50M+ Raised</span>
          </div>
          <button className="community-button">Read Stories</button>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="settings-card">
        <h4>Community Guidelines</h4>
        <div className="guidelines-list">
          <div className="guideline-item">
            <Heart className="w-4 h-4" />
            <span>Be respectful and supportive of fellow entrepreneurs</span>
          </div>
          <div className="guideline-item">
            <CheckCircle className="w-4 h-4" />
            <span>Share knowledge and experiences to help others</span>
          </div>
          <div className="guideline-item">
            <AlertCircle className="w-4 h-4" />
            <span>No spam, self-promotion, or off-topic discussions</span>
          </div>
          <div className="guideline-item">
            <Users className="w-4 h-4" />
            <span>Keep discussions constructive and professional</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderResourcesSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Resources</h3>  
      </div>

      <div className="resources-grid">
        <div className="resource-category">
          <h5>Templates & Tools</h5>
          <div className="resource-links">
            <a href="#" className="resource-link">
              <Download className="w-4 h-4" />
              <span>Business Plan Template</span>
            </a>
            <a href="#" className="resource-link">
              <Download className="w-4 h-4" />
              <span>Financial Model Template</span>
            </a>
            <a href="#" className="resource-link">
              <Download className="w-4 h-4" />
              <span>Pitch Deck Template</span>
            </a>
            <a href="#" className="resource-link">
              <Download className="w-4 h-4" />
              <span>Market Research Guide</span>
            </a>
          </div>
        </div>

        <div className="resource-category">
          <h5>Learning Materials</h5>
          <div className="resource-links">
            <a href="#" className="resource-link">
              <BookOpen className="w-4 h-4" />
              <span>Startup Fundamentals Course</span>
            </a>
            <a href="#" className="resource-link">
              <BookOpen className="w-4 h-4" />
              <span>AI in Business Whitepaper</span>
            </a>
            <a href="#" className="resource-link">
              <BookOpen className="w-4 h-4" />
              <span>Fundraising Best Practices</span>
            </a>
            <a href="#" className="resource-link">
              <BookOpen className="w-4 h-4" />
              <span>Growth Hacking Strategies</span>
            </a>
          </div>
        </div>

        <div className="resource-category">
          <h5>External Tools</h5>
          <div className="resource-links">
            <a href="#" className="resource-link">
              <ExternalLink className="w-4 h-4" />
              <span>Legal Resources</span>
            </a>
            <a href="#" className="resource-link">
              <ExternalLink className="w-4 h-4" />
              <span>Accounting Software</span>
            </a>
            <a href="#" className="resource-link">
              <ExternalLink className="w-4 h-4" />
              <span>Design Tools</span>
            </a>
            <a href="#" className="resource-link">
              <ExternalLink className="w-4 h-4" />
              <span>Marketing Platforms</span>
            </a>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="settings-card">
        <h4>System Status</h4>
        <div className="status-items">
          <div className="status-item">
            <div className="status-indicator operational"></div>
            <span>All Systems Operational</span>
            <span className="status-time">Last updated: 2 minutes ago</span>
          </div>
          <div className="status-item">
            <div className="status-indicator operational"></div>
            <span>AI Services</span>
            <span className="status-time">99.9% uptime</span>
          </div>
          <div className="status-item">
            <div className="status-indicator operational"></div>
            <span>API Services</span>
            <span className="status-time">99.8% uptime</span>
          </div>
        </div>
        <a href="#" className="status-link">
          <ExternalLink className="w-4 h-4" />
          View Full Status Page
        </a>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverviewSection()
      case 'faq':
        return renderFAQSection()
      case 'contact':
        return renderContactSection()
      case 'documentation':
        return renderDocumentationSection()
      case 'community':
        return renderCommunitySection()
      case 'resources':
        return renderResourcesSection()
      default:
        return renderOverviewSection()
    }
  }

  return (
    <div className="user-profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1>Help & Support</h1>
        <button onClick={handleBackToDashboard} className="back-button">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Navigation Sidebar */}
        <div className="profile-nav">
          <nav className="nav-sections">
            {navigationSections.map(section => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`nav-section-item ${activeSection === section.id ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="profile-main">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default HelpSupport
