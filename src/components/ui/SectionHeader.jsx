// ==========================================
// SECTION HEADER COMPONENT
// ==========================================
// Standardized section headers with consistent typography and spacing
// Ensures visual consistency across all page sections

import React from 'react'
import { motion } from 'motion/react'
import { AuroraText } from './Aurora-text'
import { ANIMATIONS, TYPOGRAPHY } from '../../lib/constants'

/**
 * SectionHeader Component
 * 
 * Standardized header for page sections with consistent styling
 * Includes optional icon, badge, title, subtitle, and description
 * 
 * @param {React.ReactNode} icon - Optional icon component (Lucide icon)
 * @param {string} badge - Optional badge text
 * @param {string} title - Main section title
 * @param {string} highlightedWord - Word to highlight with AuroraText
 * @param {string} subtitle - Optional subtitle
 * @param {string} description - Section description
 * @param {boolean} centered - Whether to center align content (default: true)
 * @param {string} className - Additional CSS classes
 */
const SectionHeader = ({
  icon,
  badge,
  title,
  highlightedWord,
  subtitle,
  description,
  centered = true,
  className = ''
}) => {
  
  // Split title to highlight specific word
  const renderTitle = () => {
    if (!highlightedWord) {
      return title
    }
    
    const parts = title.split(highlightedWord)
    return (
      <>
        {parts[0]}
        <AuroraText>{highlightedWord}</AuroraText>
        {parts[1]}
      </>
    )
  }

  return (
    <motion.div
      initial={ANIMATIONS.fadeIn.initial}
      animate={ANIMATIONS.fadeIn.animate}
      transition={ANIMATIONS.fadeIn.transition}
      className={`
        ${centered ? 'text-center' : 'text-left'} 
        mb-16 
        ${className}
      `}
    >
      
      {/* ==========================================
          BADGE WITH ICON
          ========================================== */}
      {(icon || badge) && (
        <div className={`
          flex items-center ${centered ? 'justify-center' : 'justify-start'} 
          mb-6
        `}>
          {/* Icon */}
          {icon && (
            <div className="w-6 h-6 text-blue-600 mr-2">
              {icon}
            </div>
          )}
          
          {/* Badge Text */}
          {badge && (
            <span className="text-blue-600 font-semibold text-lg">
              {badge}
            </span>
          )}
        </div>
      )}
      
      {/* ==========================================
          MAIN TITLE
          ========================================== */}
      <h2 className={`
        ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
        lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
        ${TYPOGRAPHY.weights.bold} 
        text-slate-900 
        mb-6
      `}>
        {renderTitle()}
      </h2>
      
      {/* ==========================================
          SUBTITLE
          ========================================== */}
      {subtitle && (
        <h3 className={`
          ${TYPOGRAPHY.sizes.body.large}
          ${TYPOGRAPHY.weights.medium}
          text-slate-700
          mb-4
        `}>
          {subtitle}
        </h3>
      )}
      
      {/* ==========================================
          DESCRIPTION
          ========================================== */}
      {description && (
        <p className={`
          ${TYPOGRAPHY.sizes.body.large}
          text-slate-600 
          ${centered ? 'max-w-3xl mx-auto' : 'max-w-4xl'} 
          leading-relaxed
        `}>
          {description}
        </p>
      )}
      
    </motion.div>
  )
}

export default SectionHeader 