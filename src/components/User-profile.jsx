import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  CreditCard, 
  Trash2, 
  Copy,
  Check,
  Edit3,
  Save,
  X
} from 'lucide-react'

const UserProfile = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('profile')
  const [copiedField, setCopiedField] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Mock user data - in real app this would come from context/props
  const [userData, setUserData] = useState({
    firstName: 'Jose',
    lastName: 'Marin',
    email: 'jamrin2409@gmail.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about AI and startup innovation.',
    website: 'https://josemarin.dev',
    github: 'Marin2409',
    joinDate: 'January 2024',
    subscription: 'Free',
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  })

  const [tempData, setTempData] = useState({ ...userData })

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const handleCopyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleSave = () => {
    setUserData({ ...tempData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData({ ...userData })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setTempData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (type) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }))
  }

  const handleThemeChange = (theme) => {
    setUserData(prev => ({ ...prev, theme }))
  }

  const handleDeleteAccount = () => {
    // In real app, this would trigger account deletion process
    console.log('Account deletion requested')
    setShowDeleteConfirm(false)
    navigate('/')
  }

  const navigationSections = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard },
  ]

  const renderProfileSection = () => (
    <>
      <div className="profile-section">
        <div className="section-header">
          <h3>Profile Information</h3>
          <p>Manage your personal information and account details</p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </div>
              <button className="avatar-edit-btn">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <div className="avatar-info">
              <h4>{userData.firstName} {userData.lastName}</h4>
              <p>Member since {userData.joinDate}</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={isEditing ? tempData.firstName : userData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={isEditing ? tempData.lastName : userData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <div className="input-with-copy">
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="form-input"
                />
                <button
                  onClick={() => handleCopyToClipboard(userData.email, 'email')}
                  className="copy-btn"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={isEditing ? tempData.phone : userData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={isEditing ? tempData.location : userData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                value={isEditing ? tempData.website : userData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>GitHub</label>
              <input
                type="text"
                value={isEditing ? tempData.github : userData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group full-width">
              <label>Bio</label>
              <textarea
                value={isEditing ? tempData.bio : userData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                className="form-textarea"
                rows={3}
              />
            </div>
          </div>

          {isEditing ? (
            <div className="form-actions">
              <button onClick={handleCancel} className="btn-secondary">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          ) : (
            <div className="form-actions">
              <button onClick={() => setIsEditing(true)} className="btn-primary">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone - Only shown in Profile Information section */}
      <div className="danger-zone">
        <div className="section-header">
          <h3>DANGER ZONE</h3>
        </div>
        <div className="danger-card">
          <div className="danger-content">
            <div className="danger-icon">⚠️</div>
            <div className="danger-info">
              <h4>Delete Account</h4>
              <p>Deleting your account is permanent and cannot be undone. Your data will be deleted within 30 days, except we may retain some metadata and logs for longer where required or permitted by law.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </>
  )

  const renderSecuritySection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Security</h3>
        <p>Manage your account security and authentication settings</p>
      </div>
      
      <div className="settings-card">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Change Password</h4>
            <p>Update your account password to keep it secure</p>
          </div>
          <button className="btn-secondary">Change Password</button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <button className="btn-secondary">Enable 2FA</button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Active Sessions</h4>
            <p>Manage your active login sessions across devices</p>
          </div>
          <button className="btn-secondary">View Sessions</button>
        </div>
      </div>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Notifications</h3>
        <p>Configure how you receive notifications and updates</p>
      </div>
      
      <div className="settings-card">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Email Notifications</h4>
            <p>Receive important updates via email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={userData.notifications.email}
              onChange={() => handleNotificationToggle('email')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Push Notifications</h4>
            <p>Get real-time notifications in your browser</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={userData.notifications.push}
              onChange={() => handleNotificationToggle('push')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Marketing Communications</h4>
            <p>Receive updates about new features and promotions</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={userData.notifications.marketing}
              onChange={() => handleNotificationToggle('marketing')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Appearance</h3>
        <p>Customize how AI Startup Studio looks and feels</p>
      </div>
      
      <div className="settings-card">
        <div className="theme-section">
          <div className="setting-info">
            <h4>Theme Mode</h4>
            <p>Choose how AI Startup Studio looks to you. Select a single theme, or sync with your system.</p>
          </div>
          <div className="theme-options">
            {[
              { id: 'dark', label: 'Dark', selected: userData.theme === 'dark' },
              { id: 'light', label: 'Light', selected: userData.theme === 'light' },
              { id: 'system', label: 'System', selected: userData.theme === 'system' }
            ].map(theme => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`theme-option ${theme.selected ? 'selected' : ''}`}
              >
                <div className="theme-preview theme-preview-dark"></div>
                <span>{theme.label}</span>
                {theme.selected && <div className="theme-check"></div>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderBillingSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Billing & Subscription</h3>
        <p>Manage your subscription and billing information</p>
      </div>
      
      <div className="settings-card">
        <div className="subscription-info">
          <div className="subscription-badge">
            <span className="badge-free">{userData.subscription}</span>
          </div>
          <div className="subscription-details">
            <h4>Current Plan: {userData.subscription}</h4>
            <p>You're currently on the free plan with basic features</p>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Payment Method</h4>
            <p>Manage your payment methods and billing address</p>
          </div>
          <button className="btn-secondary">Manage Billing</button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Usage & Limits</h4>
            <p>View your current usage and plan limits</p>
          </div>
          <button className="btn-secondary">View Usage</button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection()
      case 'security':
        return renderSecuritySection()
      case 'notifications':
        return renderNotificationsSection()
      case 'appearance':
        return renderAppearanceSection()
      case 'billing':
        return renderBillingSection()
      default:
        return renderProfileSection()
    }
  }

  return (
    <div className="user-profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1>Account Settings</h1>
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="btn-danger">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
