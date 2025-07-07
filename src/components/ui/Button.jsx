// ==========================================
// BUTTON COMPONENT
// ==========================================
// Standardized button component with consistent styling and behavior
// Supports multiple variants, sizes, and states

import React from 'react'

/**
 * Button Component
 * 
 * Standardized button with consistent styling across the application
 * Supports multiple variants, sizes, icons, and loading states
 * 
 * @param {string} variant - Button style variant ('primary', 'secondary', 'outline')
 * @param {string} size - Button size ('small', 'medium', 'large')
 * @param {React.ReactNode} leftIcon - Optional left icon
 * @param {React.ReactNode} rightIcon - Optional right icon
 * @param {boolean} loading - Loading state
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Button content
 * @param {object} props - Additional props
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  children,
  ...props
}) => {
  
  // Button variant styles
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white 
      hover:from-blue-700 hover:to-blue-800 
      shadow-lg hover:scale-105
    `,
    secondary: `
      border-2 border-blue-300 bg-white text-blue-600 
      hover:bg-blue-50 hover:border-blue-400
    `,
    outline: `
      border-2 border-slate-300 text-slate-700 
      hover:bg-slate-50 hover:border-slate-400
    `,
    ghost: `
      text-blue-600 hover:bg-blue-50
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white 
      hover:from-red-600 hover:to-red-700
      shadow-lg hover:scale-105
    `
  }
  
  // Button size styles
  const sizes = {
    small: 'h-10 px-4 text-sm',
    medium: 'h-12 px-6 text-base',
    large: 'h-14 px-8 text-base'
  }
  
  // Base button styles
  const baseStyles = `
    font-semibold rounded-full
    transition-all duration-300 ease-in-out
    flex items-center justify-center
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `
  
  // Handle click with loading/disabled states
  const handleClick = (e) => {
    if (loading || disabled) return
    onClick?.(e)
  }

  return (
    <button
      className={buttonStyles}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      
      {/* ==========================================
          LOADING STATE
          ========================================== */}
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      
      {/* ==========================================
          LEFT ICON
          ========================================== */}
      {leftIcon && !loading && (
        <div className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform">
          {leftIcon}
        </div>
      )}
      
      {/* ==========================================
          BUTTON CONTENT
          ========================================== */}
      <span>{children}</span>
      
      {/* ==========================================
          RIGHT ICON
          ========================================== */}
      {rightIcon && !loading && (
        <div className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
          {rightIcon}
        </div>
      )}
      
    </button>
  )
}

export default Button 