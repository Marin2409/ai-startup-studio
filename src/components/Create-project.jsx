import React, { useState } from 'react'
import { Search, Plus, Filter, Settings, LogOut, UserIcon, CreditCard, HelpCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu"

const Createproject = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState([]) // Empty for now to show the "No projects" state

  // Mock user data - in real app this would come from context/props
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    subscription: 'Free',
    avatar: null // null means no avatar uploaded, will show default icon
  }

  const handleNewProject = () => {
    // Handle new project creation
    console.log('Creating new project...')
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Dropdown menu handlers
  const handleProfile = () => {
    console.log('Navigate to profile')
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
    console.log('Logout user')
  }

  return (
    <div className="create-project-container">
      {/* Header Section */}
      <div className="create-project-header">
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
                    {user.subscription} Plan
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
                <span>Billing</span>
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

      {/* Content Area */}
      <div className="create-project-content">
        {projects.length === 0 ? (
          // Empty State with Controls Above
          <div className="empty-state-wrapper">
            {/* Controls Section - Above Content */}
            <div className="content-controls">
              <button 
                className="new-project-btn"
                onClick={handleNewProject}
              >
                New project
              </button>
              
              <div className="header-controls">
                <div className="search-container">
                  <Search className="w-4 h-4 search-icon" />
                  <input
                    type="text"
                    placeholder="Search for a project"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                  />
                </div>
                
                <button className="filter-btn">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Empty State Content - Below Controls */}
            <div className="empty-state">
              <div className="empty-state-content">
                <h2 className="empty-state-title">No projects</h2>
                <p className="empty-state-description">
                  Get started by creating a new project.
                </p>
                <button 
                  className="new-project-btn-primary"
                  onClick={handleNewProject}
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Projects Grid (for future use)
          <div className="projects-grid">
            {/* Projects will be displayed here */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Createproject
