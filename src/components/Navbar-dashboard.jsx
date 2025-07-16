import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, LogOut, UserIcon, CreditCard, HelpCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu"

const NavbarDashboard = ({ isModalOpen = false }) => {
  const navigate = useNavigate()

  // Mock user data - in real app this would come from context/props
  const user = {
    firstName: 'Jose',
    lastName: 'Marin',
    email: 'jamrin2409@gmail.com',
    subscription: 'Free',
    avatar: null // null means no avatar uploaded, will show default icon
  }

  // Dropdown menu handlers
  const handleProfile = () => {
    navigate('/user-profile')
  }

  const handleSettings = () => {
    console.log('Navigate to settings')
  }

  const handleBilling = () => {
    console.log('Navigate to billing')
  }

  const handleHelp = () => {
    console.log('Navigate to help')
  }

  const handleLogout = () => {
    // In a real app, you would also:
    // - Clear authentication tokens
    // - Clear user session data
    // - Clear localStorage/sessionStorage
    console.log('Logging out user...')
    
    // Navigate to home page
    navigate('/')
  }

  return (
    <div className={`navbar-dashboard ${isModalOpen ? 'navbar-blurred' : ''}`}>
      {/* Header Section */}
      <div className="navbar-header">
        {/* Left Side - User Info */}
        <div className="header-user-info">
          <h1 className="user-name">{user.firstName} {user.lastName}</h1>
          <p className="user-subscription">{user.subscription}</p>
        </div>
        
        {/* Right Side - User Profile */}
        <div className="header-user-profile">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="user-avatar-enhanced">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="avatar-fallback-enhanced">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBilling}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Themes</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettings}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
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
