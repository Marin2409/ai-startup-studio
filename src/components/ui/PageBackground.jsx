// ==========================================
// PAGE BACKGROUND COMPONENT
// ==========================================
// Reusable background component with consistent decorative elements
// Eliminates code duplication across pages and ensures visual consistency

import React from 'react'

/**
 * PageBackground Component
 * 
 * Provides consistent background styling with decorative elements
 * Used across all main pages for visual consistency
 * 
 * @param {string} variant - Background variant ('default', 'hero', 'light')
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Child components to render
 */
const PageBackground = ({ 
  variant = 'default', 
  className = '', 
  children 
}) => {
  
  // Background variant configurations
  const variants = {
    // Default page background (most pages)
    default: 'min-h-screen bg-gradient-to-br from-slate-50 to-gray-100',
    
    // Hero section background (Home page)
    hero: 'min-h-screen bg-gradient-to-br from-gray-50 to-blue-50',
    
    // Light background (Community, Features)
    light: 'min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'
  }

  return (
    <div className={`${variants[variant]} ${className} relative overflow-hidden`}>
      
      {/* ==========================================
          DECORATIVE BACKGROUND ELEMENTS
          ========================================== */}
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-30 pointer-events-none" />
      
      {/* Animated Blur Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Additional Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none" />
      
      {/* Secondary Blur Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* ==========================================
          CONTENT CONTAINER
          ========================================== */}
      
      {/* Content wrapper with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
      
    </div>
  )
}

export default PageBackground 