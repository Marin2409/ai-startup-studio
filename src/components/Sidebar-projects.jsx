import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard,
  CheckSquare, 
  Users, 
  Map,
  Settings,
  Sparkles,
  Database,
  HardDrive,
  Package,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { assets } from '../assets/assets'

const SidebarProjects = ({ activePage, setActivePage }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showText, setShowText] = useState(false)
  const navigate = useNavigate()

  // Delay text appearance/disappearance for smoother animation
  useEffect(() => {
    let timeout
    if (isHovered) {
      // Delay text appearance when expanding
      timeout = setTimeout(() => setShowText(true), 150)
    } else {
      // Delay text disappearance when collapsing for smoother close
      timeout = setTimeout(() => setShowText(false), 100)
    }
    return () => clearTimeout(timeout)
  }, [isHovered])

  const handleLogoClick = () => {
    navigate('/dashboard')
  }

  const menuStructure = [
    {
      type: 'item',
      id: 'Overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      type: 'section',
      title: 'Management',
      items: [
        {
          id: 'Tasks',
          label: 'Tasks',
          icon: CheckSquare,
        },
        {
          id: 'Calendar',
          label: 'Calendar',
          icon: Calendar,
        },
        {
          id: 'TechStacks',
          label: 'Tech Stacks',
          icon: Package,
        },
        {
          id: 'Team',
          label: 'Team',
          icon: Users,
        },
        {
          id: 'Financials',
          label: 'Financials',
          icon: DollarSign,
        },
      ]
    },
    {
      type: 'section',
      title: 'Data and Storage',
      items: [
        {
          id: 'Assets',
          label: 'Assets',
          icon: HardDrive,
        },
        {
          id: 'Database',
          label: 'Database',
          icon: Database,
        },
      ]
    },
    {
      type: 'section',
      title: 'Project settings',
      items: [
        {
          id: 'Settings',
          label: 'Settings',
          icon: Settings,
        },
      ]
    },
  ]

  const handleItemClick = (itemId) => {
    setActivePage(itemId)
  }

  const renderMenuItem = (item, index, totalItems) => {
    const Icon = item.icon
    const isActive = activePage === item.id
    
    return (
      <li key={item.id} className="sidebar-menu-item">
        <button
          className={`sidebar-menu-button ${isActive ? 'active' : ''}`}
          onClick={() => handleItemClick(item.id)}
          title={!isHovered ? item.label : ''}
          style={{
            transitionDelay: showText ? `${index * 20}ms` : `${(totalItems - index - 1) * 15}ms`
          }}
        >
          <Icon className="sidebar-menu-icon" />
          <span 
            className={`sidebar-menu-label ${showText ? 'visible' : 'hidden'}`}
            style={{
              transitionDelay: showText ? `${index * 20}ms` : `${(totalItems - index - 1) * 15}ms`
            }}
          >
            {item.label}
          </span>
        </button>
      </li>
    )
  }

  const renderSection = (section, startIndex) => {
    return (
      <div key={section.title} className="sidebar-section">
        <div className={`sidebar-section-title ${showText ? 'visible' : 'hidden'}`}>
          {section.title}
        </div>
        <ul className="sidebar-section-menu">
          {section.items.map((item, index) => 
            renderMenuItem(item, startIndex + index, menuStructure.reduce((acc, curr) => 
              acc + (curr.type === 'item' ? 1 : curr.items.length), 0))
          )}
        </ul>
      </div>
    )
  }

  let itemIndex = 0

  return (
    <div 
      className={`sidebar ${isHovered ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo/Branding Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <div className="sidebar-logo-icon">
            <img 
              src={assets.logo} 
              alt="AI Startup Studio" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className={`sidebar-logo-text ${showText ? 'visible' : 'hidden'}`}>
            AI Startup Studio
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* Overview Item */}
        <ul className="sidebar-menu">
          {renderMenuItem(menuStructure[0], itemIndex++, menuStructure.reduce((acc, curr) => 
            acc + (curr.type === 'item' ? 1 : curr.items.length), 0))}
        </ul>

        {/* Sections */}
        {menuStructure.slice(1).map(section => {
          const sectionElement = renderSection(section, itemIndex)
          itemIndex += section.items.length
          return sectionElement
        })}
      </nav>

      {/* AI Assistant Footer */}
      <div className="sidebar-footer">
        <button 
          className="sidebar-upgrade-button"
          onClick={() => setActivePage('AIAssistant')}
        >
          <div className="sidebar-upgrade-icon">
            <Map className="w-5 h-5" />
            <Sparkles className="w-3 h-3 sidebar-upgrade-sparkle" />
          </div>
          <span className={`sidebar-upgrade-text ${showText ? 'visible' : 'hidden'}`}>
            AI Assistant
          </span>
        </button>
      </div>
    </div>
  )
}

export default SidebarProjects  

