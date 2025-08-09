import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, UserIcon, HelpCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu"

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const NavbarDashboard = ({ isModalOpen = false }) => {
  const navigate = useNavigate()
  
  // User data state
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const token = localStorage.getItem('token')
        if (!token) {
          // Redirect to login if no token
          navigate('/login')
          return
        }

        console.log('Fetching user profile...')

        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (response.ok && data.success) {
          console.log('User profile fetched successfully:', data.user.first_name)
          setUser(data.user)
        } else {
          console.error('Failed to fetch user profile:', data.message)
          setError(data.message || 'Failed to fetch user profile')
          
          // If unauthorized, redirect to login
          if (response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        setError('Connection error. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
    
    // Listen for profile updates from AccountPreferences
    const handleProfileUpdated = (e) => {
      const detail = e?.detail
      if (!detail) return
      setUser((prev) => prev ? { ...prev, ...detail } : prev)
    }
    window.addEventListener('user:profile-updated', handleProfileUpdated)

    return () => {
      window.removeEventListener('user:profile-updated', handleProfileUpdated)
    }
  }, [navigate])

  // Get display name for user
  const getDisplayName = () => {
    if (!user) return 'Loading...'
    return `${user.first_name} ${user.last_name}`
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U'
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
  }

  // Get subscription plan display
  const getSubscriptionPlan = () => {
    if (!user) return 'Loading...'
    
    // If user has billing info, show the plan
    if (user.billing && user.billing.selected_plan) {
      const plan = user.billing.selected_plan
      const cycle = user.billing.billing_cycle
      
      // Format plan name nicely
      const planName = plan.charAt(0).toUpperCase() + plan.slice(1)
      
      if (cycle && cycle !== 'monthly') {
        return `${planName} (${cycle})`
      }
      return planName
    }
    
    // Default to Free if no billing info
    return 'Free'
  }

  // Dropdown menu handlers
  const handleAccountPreferences = () => {
    navigate('/account-preferences')
  }

  const handleHelp = () => {
    navigate('/help-support')
  }

  const handleLogout = () => {
    console.log('Logging out user...')
    
    // Clear authentication tokens and user data
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // You could also make an API call to invalidate the token on the server
    // fetch(`${API_BASE_URL}/api/user/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
    
    // Navigate to home page
    navigate('/')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`navbar-dashboard ${isModalOpen ? 'navbar-blurred' : ''}`}>
        <div className="navbar-header">
          <div className="header-user-info">
            <div className="loading-skeleton">
              <div className="skeleton-line name"></div>
              <div className="skeleton-line subscription"></div>
            </div>
          </div>
          <div className="header-user-profile">
            <Avatar className="user-avatar-enhanced">
              <AvatarFallback className="avatar-fallback-enhanced">
                <div className="skeleton-avatar"></div>
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    )
  }

  // Error state (but still show basic structure)
  if (error && !user) {
    return (
      <div className={`navbar-dashboard ${isModalOpen ? 'navbar-blurred' : ''}`}>
        <div className="navbar-header">
          <div className="header-user-info">
            <h1 className="user-name">Error Loading User</h1>
            <p className="user-subscription">Unable to load data</p>
          </div>
          <div className="header-user-profile">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="user-avatar-enhanced">
                  <AvatarFallback className="avatar-fallback-enhanced">
                    ER
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-red-600">
                      Error loading profile
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.reload()}>
                  <span>Retry</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`navbar-dashboard ${isModalOpen ? 'navbar-blurred' : ''}`}>
      {/* Header Section */}
      <div className="navbar-header">
        {/* Left Side - User Info */}
        <div className="header-user-info">
          <h1 className="user-name">{getDisplayName()}</h1>
          <p className="user-subscription">{getSubscriptionPlan()}</p>
        </div>
        
        {/* Right Side - User Profile */}
        <div className="header-user-profile">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="user-avatar-enhanced">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="avatar-fallback-enhanced">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleAccountPreferences}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Account Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleHelp}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default NavbarDashboard
