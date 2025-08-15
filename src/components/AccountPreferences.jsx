import React, { useState, useRef, useEffect } from 'react'
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

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const AccountPreferences = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [activeSection, setActiveSection] = useState('profile')
  const [copiedField, setCopiedField] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [avatarImage, setAvatarImage] = useState(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState('')
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' })

  const showToast = (type, message) => {
    setToast({ visible: true, type, message })
    // Auto-hide after 3 seconds
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => {
      setToast(t => ({ ...t, visible: false }))
    }, 3000)
  }

  // User data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    joinDate: '',
    subscription: 'Free',
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  })

  const [tempData, setTempData] = useState({ ...userData })

  // Fetch current user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (response.ok && data.success) {
          const u = data.user
          const createdAt = u.created_at ? new Date(u.created_at) : null
          const joinDate = createdAt ? createdAt.toLocaleString('en-US', { month: 'long', year: 'numeric' }) : ''

          const mapped = {
            firstName: u.first_name || '',
            lastName: u.last_name || '',
            email: u.email || '',
            phone: u.phone || '',
            company: u.company || '',
            address: u.address || '',
            city: u.city || '',
            state: u.state || '',
            joinDate,
            subscription: (u.billing && u.billing.selected_plan)
              ? (u.billing.selected_plan.charAt(0).toUpperCase() + u.billing.selected_plan.slice(1))
              : 'Free',
            theme: 'dark',
            notifications: { email: true, push: true, marketing: false }
          }

          setUserData(mapped)
          setTempData({ ...mapped })
        } else {
          if (response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
            return
          }
          console.error('Failed to fetch profile:', data.message)
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
    }

    fetchUserProfile()
  }, [navigate])

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

  const handleSave = async () => {
    try {
      setSaveError('')
      setSaveSuccess('')
      setSaveLoading(true)
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      // Basic client-side validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      if (!emailRegex.test((tempData.email || '').trim())) {
        setSaveError('Please provide a valid email address')
        showToast('error', 'Please provide a valid email address')
        setSaveLoading(false)
        return
      }
      const phoneVal = (tempData.phone || '').trim()
      if (phoneVal && !/^\+?[\d\s\-\(\)\.]+$/.test(phoneVal)) {
        setSaveError('Please provide a valid phone number')
        showToast('error', 'Please provide a valid phone number')
        setSaveLoading(false)
        return
      }

      // Build a payload with only changed fields
      const payload = {}
      if ((tempData.firstName || '').trim() !== (userData.firstName || '').trim()) {
        payload.first_name = (tempData.firstName || '').trim()
      }
      if ((tempData.lastName || '').trim() !== (userData.lastName || '').trim()) {
        payload.last_name = (tempData.lastName || '').trim()
      }
      if ((tempData.email || '').trim().toLowerCase() !== (userData.email || '').trim().toLowerCase()) {
        payload.email = (tempData.email || '').trim().toLowerCase()
      }
      if ((tempData.phone || '').trim() !== (userData.phone || '').trim()) {
        payload.phone = (tempData.phone || '').trim() || null
      }
      if ((tempData.company || '').trim() !== (userData.company || '').trim()) {
        payload.company = (tempData.company || '').trim() || null
      }
      if ((tempData.address || '').trim() !== (userData.address || '').trim()) {
        payload.address = (tempData.address || '').trim() || null
      }
      if ((tempData.city || '').trim() !== (userData.city || '').trim()) {
        payload.city = (tempData.city || '').trim() || null
      }
      if ((tempData.state || '').trim() !== (userData.state || '').trim()) {
        payload.state = (tempData.state || '').trim() || null
      }

      if (Object.keys(payload).length === 0) {
        setSaveLoading(false)
        setSaveSuccess('')
        showToast('success', 'No changes to save')
        return
      }

      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const u = data.user
        const createdAt = u.created_at ? new Date(u.created_at) : null
        const joinDate = createdAt ? createdAt.toLocaleString('en-US', { month: 'long', year: 'numeric' }) : userData.joinDate

        const mapped = {
          firstName: u.first_name || '',
          lastName: u.last_name || '',
          email: u.email || '',
          phone: u.phone || '',
          company: u.company || '',
          address: u.address || '',
          city: u.city || '',
          state: u.state || '',
          joinDate,
          subscription: userData.subscription,
          theme: userData.theme,
          notifications: userData.notifications
        }

        setUserData(mapped)
        setTempData({ ...mapped })
        setIsEditing(false)
        // Notify other UI (e.g., Navbar) of updated profile
        try {
          window.dispatchEvent(new CustomEvent('user:profile-updated', {
            detail: {
              first_name: u.first_name,
              last_name: u.last_name,
              email: u.email,
              phone: u.phone
            }
          }))
        } catch (e) {
          // no-op if window is not available
        }
        setSaveSuccess('Profile updated successfully')
        showToast('success', 'Profile updated successfully')
      } else {
        console.error('Failed to update profile:', data.message)
        setSaveError(data.message || 'Failed to update profile')
        showToast('error', data.message || 'Failed to update profile')
        if (response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      setSaveError('Connection error. Please try again.')
      showToast('error', 'Connection error. Please try again.')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleCancel = () => {
    setTempData({ ...userData })
    setIsEditing(false)
    setAvatarImage(null)
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
    // Open confirmation modal
    setShowDeleteConfirm(true)
  }

  const navigationSections = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    // { id: 'billing', label: 'Billing & Subscription', icon: CreditCard },
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
              {avatarImage ? (
                <img 
                  src={avatarImage} 
                  alt="Profile Avatar" 
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </div>
              )}
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
              <label>Address</label>
              <input
                type="text"
                value={(isEditing ? tempData.address : userData.address) || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className="form-input"
                placeholder={userData.address ? undefined : 'Add address'}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={(isEditing ? tempData.city : userData.city) || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                disabled={!isEditing}
                className="form-input"
                placeholder={userData.city ? undefined : 'Add city'}
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                value={(isEditing ? tempData.state : userData.state) || ''}
                onChange={(e) => handleInputChange('state', e.target.value)}
                disabled={!isEditing}
                className="form-input"
                placeholder={userData.state ? undefined : 'Add state'}
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={isEditing ? tempData.company : userData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <div className="input-with-copy">
                <input
                  type="email"
                  value={isEditing ? tempData.email : userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
                <button
                  onClick={() => handleCopyToClipboard(userData.email, 'email')}
                  className="copy-btn-user-profile"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={(isEditing ? tempData.phone : userData.phone) || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="form-input"
                placeholder={userData.phone ? undefined : 'Add phone number'}
              />
            </div>
            
          </div>

          {isEditing ? (
            <div className="form-actions">
              <button onClick={handleCancel} className="btn-secondary">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
                <button onClick={handleSave} className="btn-primary" disabled={saveLoading}>
                <Save className="w-4 h-4 mr-2" />
                  {saveLoading ? 'Saving...' : 'Save Changes'}
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
        
        {/* <div className="setting-item">
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
        </div> */}

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
        
        {/* <div className="setting-item">
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
        </div> */}
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

  // const renderBillingSection = () => (
  //   <div className="profile-section">
  //     <div className="section-header">
  //       <h3>Billing & Subscription</h3>
  //       <p>Manage your subscription and billing information</p>
  //     </div>
      
  //     <div className="settings-card">
  //       <div className="subscription-info">
  //         <div className="subscription-badge">
  //           <span className="badge-free">{userData.subscription}</span>
  //         </div>
  //         <div className="subscription-details">
  //           <h4>Current Plan: {userData.subscription}</h4>
  //           <p>
  //             {(() => {
  //               switch (userData.subscription) {
  //                 case 'Free':
  //                   return "You're currently on the free plan with basic features";
  //                 case 'Builder':
  //                   return "You're currently on the Builder plan with Extended Features";
  //                 case 'Enterprise':
  //                   return "You're currently on the Enterprise plan with Full extended Features";
  //                 default:
  //                   return userData.subscription
  //                     ? `You're currently on the ${userData.subscription} plan`
  //                     : "You're currently on a plan";
  //               }
  //             })()}
  //           </p>
  //         </div>
  //       </div>
        
  //       <div className="setting-item">
  //         <div className="setting-info">
  //           <h4>Payment Method</h4>
  //           <p>Manage your payment methods and billing address</p>
  //         </div>
  //         <button className="btn-secondary">Manage Billing</button>
  //       </div>
        
  //       <div className="setting-item">
  //         <div className="setting-info">
  //           <h4>Usage & Limits</h4>
  //           <p>View your current usage and plan limits</p>
  //         </div>
  //         <button className="btn-secondary">View Usage</button>
  //       </div>
  //     </div>
  //   </div>
  // )

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
      // case 'billing':
      //   return renderBillingSection()
      default:
        return renderProfileSection()
    }
  }

  return (
    <div className="user-profile-container">
      {/* Floating Toast */}
      {toast.visible && (
        <div
          className={`toast ${toast.type}`}
          role={toast.type === 'error' ? 'alert' : 'status'}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1000,
            minWidth: 280,
            padding: '12px 14px',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            background: toast.type === 'error' ? '#fee2e2' : '#e6f6ee',
            color: toast.type === 'error' ? '#991b1b' : '#065f46',
            border: `1px solid ${toast.type === 'error' ? '#fecaca' : '#a7f3d0'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 600 }}>
              {toast.type === 'error' ? 'Error' : 'Success'}
            </span>
            <span style={{ opacity: 0.9 }}>{toast.message}</span>
            <button
              onClick={() => setToast(t => ({ ...t, visible: false }))}
              style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      )}
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
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token')
                    if (!token) {
                      navigate('/login')
                      return
                    }
                    const resp = await fetch(`${API_BASE_URL}/api/user/profile`, {
                      method: 'DELETE',
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }
                    })
                    const data = await resp.json()
                    if (resp.ok && data.success) {
                      showToast('success', 'Account deleted')
                      // Clear auth and redirect home
                      localStorage.removeItem('token')
                      localStorage.removeItem('user')
                      setShowDeleteConfirm(false)
                      navigate('/')
                    } else {
                      showToast('error', data.message || 'Failed to delete account')
                    }
                  } catch (e) {
                    showToast('error', 'Connection error. Please try again.')
                  }
                }}
                className="btn-danger"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountPreferences
