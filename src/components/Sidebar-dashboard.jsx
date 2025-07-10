import React, { useState, useEffect } from 'react'
import { 
  FolderOpen, 
  Users, 
  Puzzle, 
  BarChart3, 
  CreditCard, 
  Settings,
  Brain,
  Sparkles
} from 'lucide-react'
import { assets } from '../assets/assets'

const Sidebar = ({ activePage, setActivePage }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showText, setShowText] = useState(false)

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

  const menuItems = [
    {
      id: 'Projects',
      label: 'Projects',
      icon: FolderOpen,
    },
    {
      id: 'Team',
      label: 'Team',
      icon: Users,
    },
    {
      id: 'Integrations',
      label: 'Integrations',
      icon: Puzzle,
    },
    {
      id: 'Analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'Billing',
      label: 'Billing',
      icon: CreditCard,
    },
    {
      id: 'AI Tools',
      label: 'AI Tools',
      icon: Settings,
    },
  ]

  const handleItemClick = (itemId) => {
    setActivePage(itemId)
  }

  return (
    <div 
      className={`sidebar ${isHovered ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo/Branding Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
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
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            
            return (
              <li key={item.id} className="sidebar-menu-item">
                <button
                  className={`sidebar-menu-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                  title={!isHovered ? item.label : ''}
                  style={{
                    transitionDelay: showText ? `${index * 20}ms` : `${(menuItems.length - index - 1) * 15}ms`
                  }}
                >
                  <Icon className="sidebar-menu-icon" />
                  <span 
                    className={`sidebar-menu-label ${showText ? 'visible' : 'hidden'}`}
                    style={{
                      transitionDelay: showText ? `${index * 20}ms` : `${(menuItems.length - index - 1) * 15}ms`
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* AI Assistant Section */}
      <div className="sidebar-footer">
        <button 
          className="sidebar-ai-button"
          title={!isHovered ? 'AI Assistant' : ''}
          style={{
            transitionDelay: showText ? '120ms' : '0ms'
          }}
        >
          <div className="sidebar-ai-icon">
            <Brain className="w-5 h-5" />
            <Sparkles className="w-3 h-3 sidebar-ai-sparkle" />
          </div>
          <span 
            className={`sidebar-ai-text ${showText ? 'visible' : 'hidden'}`}
            style={{
              transitionDelay: showText ? '120ms' : '0ms'
            }}
          >
            AI Assistant
          </span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
