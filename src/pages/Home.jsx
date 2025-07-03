// ==========================================
// HOME PAGE COMPONENT
// ==========================================
// Main landing page showcasing AI Startup Studio platform
// Combines Hero, Features, Showcase, Testimonials, and CTA sections

import React from 'react'
import PageBackground from '../components/ui/PageBackground'

// ==========================================
// SECTION COMPONENTS
// ==========================================
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Features from '../components/Features'
import Showcase from '../components/Showcase'

/**
 * Home Component
 * 
 * Main landing page that presents the complete value proposition
 * of AI Startup Studio through a series of optimized sections
 * 
 * Section Flow:
 * 1. Hero - Primary value proposition and CTAs
 * 2. Features - Core platform capabilities
 * 3. Showcase - Step-by-step workflow demonstration
 * 4. Testimonials - Social proof and user success stories
 * 5. CTA - Final conversion opportunity
 */
const Home = () => {
  return (
    <PageBackground variant="hero">
      
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      {/* Primary value proposition with main CTAs */}
      <Hero />

      {/* ==========================================
          FEATURES SECTION  
          ========================================== */}
      {/* Core AI-powered tools and capabilities */}
      <Features />

      {/* ==========================================
          SHOWCASE SECTION
          ========================================== */}
      {/* Interactive workflow demonstration */}
      <Showcase />

      {/* ==========================================
          TESTIMONIALS SECTION
          ========================================== */}
      {/* Social proof and user success stories */}
      <Testimonials />

      {/* ==========================================
          CALL TO ACTION SECTION
          ========================================== */}
      {/* Final conversion opportunity */}
      <CTA />

    </PageBackground>
  )
}

export default Home
