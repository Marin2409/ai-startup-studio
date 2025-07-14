// ----------------------------------
// Imports                          
// ----------------------------------
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Toggle function to open/close mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Helper function to close mobile menu when nav items are clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Navigate to login page
  const handleSignInClick = () => {
    navigate('/login', { state: { from: '/' } })
    closeMobileMenu() // Close mobile menu if open
  }

  return (
    <div>
      {/* Main navigation container with gradient background and responsive padding */}
      <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-blue-600 to-blue-700 transition-all shadow-sm">
        
        {/* Logo Section - Company branding with logo and text */}
        <Link to="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
          {/* Logo image container with backdrop blur effect */}
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 p-2">
            <img 
              src={assets.logo} 
              alt="AI Startup Studio Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          {/* Company name */}
          <span className="text-white font-bold text-xl">AI Startup Studio</span>
        </Link>
    
        {/* Desktop Navigation Links - Visible on larger screens, hidden on mobile */}
        <ul className="text-white flex items-center justify-center gap-8 flex-1 max-sm:hidden">
          <li><Link className="hover:text-blue-200 transition-colors duration-200" to="/">Home</Link></li>
          <li><Link className="hover:text-blue-200 transition-colors duration-200" to="/pricing">Pricing</Link></li>
          <li><Link className="hover:text-blue-200 transition-colors duration-200" to="/features">Features</Link></li>
          <li><Link className="hover:text-blue-200 transition-colors duration-200" to="/use-cases">Use Cases</Link></li>
          <li><Link className="hover:text-blue-200 transition-colors duration-200" to="/community">Community</Link></li>
        </ul>
    
        {/* Desktop CTA Button - Visible on larger screens, hidden on mobile */} 
        <button type="button" className="bg-white text-blue-600 inline text-sm font-semibold hover:bg-blue-50 active:scale-95 transition-all w-40 h-11 rounded-full shadow-sm cursor-pointer max-sm:hidden" onClick={handleSignInClick}>
          Sign In
        </button>
    
        {/* Mobile Menu Hamburger Button - Visible only on mobile screens */}
        <button 
          aria-label="menu-btn" 
          type="button" 
          className="menu-btn inline-block sm:hidden active:scale-90 transition"
          onClick={toggleMobileMenu}
        >
          {/* Hamburger icon with rotation animation when menu is open */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="30" 
            viewBox="0 0 30 30" 
            fill="#fff"
            className={`transform transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
          >
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
          </svg>
        </button>
    
        {/* Mobile Menu Dropdown - Conditionally rendered based on state */}
        <div className={`mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:hidden border-t border-blue-500/30 shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'}`}>
          {/* Mobile navigation links */}
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li><Link to="/" className="text-sm hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/pricing" className="text-sm hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Pricing</Link></li>
            <li><Link to="/features" className="text-sm hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Features</Link></li>
            <li><Link to="/use-cases" className="text-sm hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Use Cases</Link></li>
            <li><Link to="/community" className="text-sm hover:text-blue-200 transition-colors" onClick={closeMobileMenu}>Community</Link></li>
          </ul>
          
          {/* Mobile CTA Button - Same functionality as desktop version */}
          <button 
            type="button" 
            className="bg-white text-blue-600 mt-6 inline sm:hidden text-sm font-semibold hover:bg-blue-50 active:scale-95 transition-all w-40 h-11 rounded-full shadow-sm cursor-pointer"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
