// ==========================================
// HERO COMPONENT
// ==========================================
// Main hero section showcasing primary value proposition
// Features animated elements, CTAs, and social proof

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  UserPlus,
} from "lucide-react"

// ==========================================
// UI COMPONENTS
// ==========================================
import { Badge } from './ui/Badge-ui'
import Button from './ui/Button'
import { HeroVideoDialog } from './ui/Hero-video-dialog'
import { TypingAnimation } from './ui/Typing-animation'
import { AuroraText } from './ui/Aurora-text'
import { CONTENT, ANIMATIONS, TYPOGRAPHY } from '../lib/constants'

/**
 * Hero Component
 * 
 * Primary hero section featuring:
 * - Compelling headline with AuroraText effect
 * - Dual CTA buttons (primary and secondary)
 * - Social proof statistics
 * - Hero video demonstration
 * - CEO testimonial quote
 */
const Hero = () => {
  // ==========================================
  // NAVIGATION
  // ==========================================
  
  const navigate = useNavigate()

  // Navigation handler for CTAs
  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/' } })
  }

  // Navigation handler for Features badge
  const handleFeaturesClick = () => {
    navigate('/features')
    window.scrollTo({ top: 0 })
  }

  // ==========================================
  // SOCIAL PROOF STATISTICS
  // ==========================================
  
  const socialProofStats = [
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      number: CONTENT.stats.startups,
      label: "Startups launched"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      number: CONTENT.stats.timeReduction,
      label: "Time reduction"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      number: CONTENT.stats.tools,
      label: "AI tools integrated"
    }
  ]

  return (
    <div className="min-h-screen relative flex w-full flex-col gap-6 items-center justify-center px-4 py-15 mx-auto">

      {/* ==========================================
          BACKGROUND DECORATIONS
          ========================================== */}
      
      {/* Background grid and blur effects are now handled by PageBackground component */}
      <div className="max-w-7xl mx-auto relative z-10"></div>

      {/* ==========================================
          NEW FEATURE BADGE
          ========================================== */}
      
      <motion.div 
        initial={ANIMATIONS.fadeInUp.initial}
        animate={ANIMATIONS.fadeInUp.animate}
        transition={ANIMATIONS.fadeInUp.transition}
        className="flex flex-col justify-center items-center w-full"
      >
        <Badge 
          variant="secondary" 
          className="cursor-pointer mb-6 px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-all"
          onClick={handleFeaturesClick}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Now with {CONTENT.stats.tools} Integrated AI-Powered Tools
        </Badge>
      </motion.div>

      {/* ==========================================
          HERO TITLE
          ========================================== */}
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`
          ${TYPOGRAPHY.sizes.hero.mobile} 
          lg:${TYPOGRAPHY.sizes.hero.desktop} 
          md:text-9xl 
          ${TYPOGRAPHY.weights.bold} 
          text-slate-900 text-center flex flex-col gap-4
        `}
      >
        <h1>AI Startup <AuroraText>Studio</AuroraText></h1>
        <span className={`
          text-3xl lg:text-4xl md:text-5xl 
          ${TYPOGRAPHY.weights.normal} 
          text-slate-600
        `}>
          {CONTENT.company.tagline}
        </span>
      </motion.div>

      {/* ==========================================
          HERO DESCRIPTION
          ========================================== */}
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`
          ${TYPOGRAPHY.weights.light} 
          ${TYPOGRAPHY.sizes.body.base} 
          md:${TYPOGRAPHY.sizes.body.large} 
          text-slate-600 py-4 text-center max-w-4xl mx-auto leading-relaxed
        `}
      >
        {CONTENT.company.description}. Generate business plans, roadmaps, 
        and development environments with intelligent automation. Replace expensive consultants 
        with AI that understands your vision.
      </motion.div>
      
      {/* ==========================================
          HERO BUTTONS
          ========================================== */}
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 relative z-10 items-center mt-4"
      >
        {/* Primary CTA */}
        <Button
          variant="primary"
          size="large"
          onClick={handleGetStarted}
          leftIcon={<Rocket className="w-5 h-5" />}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {CONTENT.cta.primary}
        </Button>

        {/* Secondary CTA */}
        <Button
          variant="secondary"
          size="large"
          onClick={handleGetStarted}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          {CONTENT.cta.secondary}
        </Button>
      </motion.div>

      {/* ==========================================
          SOCIAL PROOF STATISTICS
          ========================================== */}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-8 mt-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {socialProofStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                {stat.icon}
                <span className="text-2xl font-bold text-slate-900 ml-2">{stat.number}</span>
              </div>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ==========================================
          HERO VIDEO
          ========================================== */}
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative group"
      >
        {/* Video container with fade effect - mask only applied to thumbnails */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="hero-video-mask">
            <HeroVideoDialog
              className="block dark:hidden"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
              thumbnailAlt="Hero Video"
            />
            <HeroVideoDialog
              className="hidden dark:block"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
              thumbnailAlt="Hero Video"
            />
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          CEO TESTIMONIAL
          ========================================== */}
      
      <TypingAnimation className={`
        ${TYPOGRAPHY.weights.light} 
        ${TYPOGRAPHY.sizes.body.base} 
        md:${TYPOGRAPHY.sizes.body.large} 
        text-slate-600 py-4 text-center max-w-4xl mx-auto leading-relaxed
      `}>
        "We transform visionary ideas into intelligent solutions."
      </TypingAnimation>
      
      <p className={`
        ${TYPOGRAPHY.weights.light} 
        ${TYPOGRAPHY.sizes.body.base} 
        md:${TYPOGRAPHY.sizes.body.large} 
        text-slate-600 py-4 text-center max-w-4xl mx-auto leading-relaxed
      `}>
        <AuroraText>AI Startup Studio CEO - Jose Marin</AuroraText>
      </p>
    </div>
  )
}

export default Hero
