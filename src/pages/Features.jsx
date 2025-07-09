// ==========================================
// FEATURES PAGE COMPONENT
// ==========================================
// Comprehensive features showcase demonstrating AI-powered capabilities
// Highlights tools, benefits, and competitive advantages

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { 
  Brain, 
  Zap, 
  Users, 
  Target, 
  CheckCircle, 
  Rocket, 
  Code, 
  BarChart3,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react'

// ==========================================
// UI COMPONENTS
// ==========================================
import PageBackground from '../components/ui/PageBackground'
import Button from '../components/ui/Button-component'
import { AuroraText } from '../components/ui/Aurora-text'
import { CONTENT, ANIMATIONS, TYPOGRAPHY, SPACING, COMPONENTS } from '../lib/constants'

/**
 * Features Component
 * 
 * Detailed features page showcasing:
 * - Hero section with key statistics
 * - Six core AI-powered solutions
 * - Traditional vs AI comparison table
 * - Final conversion CTA
 */
const Features = () => {
  // ==========================================
  // STATE & NAVIGATION
  // ==========================================
  
  const [activeFeature, setActiveFeature] = useState(0)
  const navigate = useNavigate()

  // Navigation handler for CTAs
  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/features' } })
  }

  // ==========================================
  // HERO STATISTICS DATA
  // ==========================================
  
  const heroStats = [
    { number: "7", label: "AI Tools", icon: <Brain className="w-5 h-5" /> },
    { number: "10x", label: "Faster", icon: <Zap className="w-5 h-5" /> },
    { number: "95%", label: "Success Rate", icon: <Target className="w-5 h-5" /> },
    { number: "24/7", label: "Available", icon: <Clock className="w-5 h-5" /> }
  ]

  // ==========================================
  // MAIN SOLUTION FEATURES DATA
  // ==========================================
  
  const solutions = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Business Intelligence",
      description: "Generate comprehensive business plans with market analysis, financial projections, and strategic recommendations in minutes",
      benefits: ["15-20 page business plans", "Real-time market data", "Industry-specific insights", "Financial modeling"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      demo: "Create a business plan in 5 minutes"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Smart Development Roadmaps",
      description: "AI creates detailed 12-18 month roadmaps with milestone tracking, automated progress monitoring, etc.",
      benefits: ["Sprint-based planning", "Resource optimization", "Deadline tracking", "Team coordination"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      demo: "18-month product roadmap"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "MVP Prioritization Engine",
      description: "AI analyzes feature importance, user impact, and development effort to identify the most critical features for your launch.",
      benefits: ["RICE scoring method", "User impact analysis", "Effort estimation", "Market validation"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      demo: "Prioritize 50+ features automatically"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code Generation & Scaffolding",
      description: "Generate production-ready code scaffolding, database schemas, and API endpoints to accelerate development.",
      benefits: ["Multiple tech stacks", "Clean architecture", "Documentation included", "Best practices"],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      demo: "Generate React + Node.js starter"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Market Analytics",
      description: "Access live market data, competitor analysis, and trend insights to make informed strategic decisions.",
      benefits: ["50+ data sources", "Competitor tracking", "Market sizing", "Trend analysis"],
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      demo: "Analyze fintech market trends"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Workspace",
      description: "Team collaboration tools with role-based permissions, version control, and integrated communication.",
      benefits: ["Team management", "Version control", "Real-time collaboration", "Progress tracking"],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      demo: "Collaborate with 5 team members"
    }
  ]

  // ==========================================
  // FEATURE COMPARISON DATA
  // ==========================================
  
  const comparisonFeatures = [
    { feature: "Business Plan Generation", traditional: "6 months", aiStudio: "5 minutes", improvement: "99% faster" },
    { feature: "Market Research", traditional: "$15,000", aiStudio: "Included", improvement: "100% savings" },
    { feature: "Roadmap Planning", traditional: "Manual", aiStudio: "AI-Powered", improvement: "10x accuracy" },
    { feature: "Code Generation", traditional: "Not available", aiStudio: "Full-stack", improvement: "Weeks saved" },
    { feature: "Team Collaboration", traditional: "Email/Slack", aiStudio: "Integrated", improvement: "Seamless" },
    { feature: "Market Analytics", traditional: "Expensive tools", aiStudio: "Built-in", improvement: "Real-time" }
  ]

  return (
    <PageBackground variant="light">

      {/* ==========================================
          HERO SECTION
          ========================================== */}
      
      <section className={SPACING.section.desktop}>
        <div className={`${SPACING.container.large} mx-auto`}>
          
          {/* Main page header */}
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
              <span className={`text-blue-600 ${TYPOGRAPHY.weights.semibold} ${TYPOGRAPHY.sizes.body.large}`}>Complete Feature Suite</span>
            </div>

            <h1 className={`
              ${TYPOGRAPHY.sizes.hero.mobile} 
              lg:${TYPOGRAPHY.sizes.hero.desktop} 
              md:text-9xl 
              ${TYPOGRAPHY.weights.bold} 
              text-slate-900 text-center flex flex-col gap-4
            `}>
              <span>Everything you need</span>
              <span>to build</span>
              <span>your <AuroraText>Startup</AuroraText></span>
            </h1>
            
            <p className={`
              ${TYPOGRAPHY.sizes.body.large} 
              text-slate-600 max-w-3xl mx-auto py-8 
              ${TYPOGRAPHY.weights.light}
            `}>
              From AI-powered business planning to code generation, our comprehensive platform provides all the tools entrepreneurs need to transform ideas into successful businesses.
            </p>
          </motion.div>

          {/* ==========================================
              HERO STATISTICS GRID
              ========================================== */}
          
          <div className={`grid grid-cols-2 md:grid-cols-4 ${SPACING.gaps.medium} max-w-4xl mx-auto mt-12`}>
            {heroStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={ANIMATIONS.fadeInScale.initial}
                animate={ANIMATIONS.fadeInScale.animate}
                transition={{ ...ANIMATIONS.fadeInScale.transition, delay: 0.2 + index * 0.1 }}
                className={`
                  group relative overflow-hidden
                  bg-white/70 backdrop-blur-sm rounded-2xl p-6 
                  border border-white/20 shadow-xl 
                  hover:shadow-2xl hover:scale-105 hover:bg-white/80
                  ${ANIMATIONS.transition}
                `}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content container with better alignment */}
                <div className="relative z-10 text-center">
                  {/* Icon with enhanced styling */}
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <div className="scale-110">
                      {stat.icon}
                    </div>
                  </div>
                  
                  {/* Number with better typography */}
                  <div className={`
                    ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
                    ${TYPOGRAPHY.weights.bold} 
                    text-slate-900 mb-1 
                    group-hover:text-blue-600 
                    ${ANIMATIONS.transition}
                  `}>
                    {stat.number}
                  </div>
                  
                  {/* Label with improved styling */}
                  <div className={`
                    ${TYPOGRAPHY.sizes.body.base} 
                    ${TYPOGRAPHY.weights.medium} 
                    text-slate-600 
                    group-hover:text-slate-700 
                    ${ANIMATIONS.transition}
                  `}>
                    {stat.label}
                  </div>
                </div>
                
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          DETAILED SOLUTION FEATURES
          ========================================== */}
      
      <section className={SPACING.section.desktop}>
        <div className={`${SPACING.container.large} mx-auto`}>
          
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
            className={`text-center ${SPACING.section.mobile}`}
          >
            <h2 className={`
              ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
              lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
              ${TYPOGRAPHY.weights.bold} 
              text-gray-900 mb-6
            `}>
              Comprehensive <AuroraText>AI-Powered</AuroraText> Tools
            </h2>
            
            <p className={`
              ${TYPOGRAPHY.sizes.body.large} 
              text-slate-600 max-w-3xl mx-auto leading-relaxed 
              ${TYPOGRAPHY.weights.light}
            `}>
               Each tool is designed to solve specific entrepreneurial challenges with cutting-edge AI technology
             </p>
          </motion.div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${SPACING.gaps.large}`}>
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, delay: index * 0.1 }}
                className={`group ${COMPONENTS.cards.base} p-8 ${ANIMATIONS.hover} hover:border-blue-200 hover:transform hover:scale-105`}
              >
                
                {/* ==========================================
                    SOLUTION ICON
                    ========================================== */}
                
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 ${ANIMATIONS.transition}`}>
                  {solution.icon}
                </div>
                
                {/* ==========================================
                    SOLUTION CONTENT
                    ========================================== */}
                
                <h3 className={`
                  ${TYPOGRAPHY.sizes.cardTitle} 
                  ${TYPOGRAPHY.weights.bold} 
                  text-slate-900 mb-3 group-hover:text-blue-600 ${ANIMATIONS.transition}
                `}>
                  {solution.title}
                </h3>
                <p className={`text-slate-600 leading-relaxed mb-6 ${TYPOGRAPHY.sizes.body.base}`}>
                  {solution.description}
                </p>

                {/* ==========================================
                    BENEFITS LIST
                    ========================================== */}
                
                <ul className={`space-y-3 mb-6`}>
                  {solution.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className={`flex items-center ${TYPOGRAPHY.sizes.caption} text-slate-600`}>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* ==========================================
                    DEMO CTA BUTTON
                    ========================================== */}
                
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handleGetStarted}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full"
                >
                  {solution.demo}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURE COMPARISON TABLE
          ========================================== */}
      
      <section className={SPACING.section.desktop}>
        <div className={`${SPACING.container.large} mx-auto`}>
          
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
            className={`text-center ${SPACING.section.mobile}`}
          >
            <h2 className={`
              ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
              lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
              ${TYPOGRAPHY.weights.bold} 
              text-gray-900 mb-6
            `}>
              Traditional vs. <AuroraText>AI Startup Studio</AuroraText>
            </h2>
            
            <p className={`
              ${TYPOGRAPHY.sizes.body.large} 
              text-slate-600 max-w-3xl mx-auto leading-relaxed 
              ${TYPOGRAPHY.weights.light}
            `}>
               See how our AI-powered approach revolutionizes the startup creation process
             </p>
          </motion.div>

          <motion.div
            initial={ANIMATIONS.fadeInUp.initial}
            animate={ANIMATIONS.fadeInUp.animate}
            transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.2 }}
            className={`${COMPONENTS.cards.base} overflow-hidden`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                
                {/* ==========================================
                    TABLE HEADER
                    ========================================== */}
                
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className={`px-6 py-4 text-left ${TYPOGRAPHY.weights.semibold}`}>Feature</th>
                    <th className={`px-6 py-4 text-center ${TYPOGRAPHY.weights.semibold}`}>Traditional Method</th>
                    <th className={`px-6 py-4 text-center ${TYPOGRAPHY.weights.semibold}`}>AI Startup Studio</th>
                    <th className={`px-6 py-4 text-center ${TYPOGRAPHY.weights.semibold}`}>Improvement</th>
                  </tr>
                </thead>
                
                {/* ==========================================
                    TABLE BODY
                    ========================================== */}
                
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className={`border-b border-slate-100 hover:bg-blue-50 ${ANIMATIONS.transition} ${
                        index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                      }`}
                    >
                      <td className={`px-6 py-4 ${TYPOGRAPHY.weights.medium} text-slate-900`}>{item.feature}</td>
                      <td className={`px-6 py-4 text-center text-red-600 ${TYPOGRAPHY.sizes.body.base}`}>{item.traditional}</td>
                      <td className={`px-6 py-4 text-center text-green-600 ${TYPOGRAPHY.weights.semibold} ${TYPOGRAPHY.sizes.body.base}`}>{item.aiStudio}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`
                          bg-green-100 text-green-800 px-3 py-1 rounded-full 
                          ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium}
                        `}>
                          {item.improvement}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          FINAL CTA SECTION
          ========================================== */}
      
      <section className={`${SPACING.section.desktop} bg-gradient-to-r from-blue-600 to-purple-600`}>
        <div className={`${SPACING.container.medium} mx-auto text-center`}>
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
          >
            <h2 className={`
              ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
              lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
              ${TYPOGRAPHY.weights.bold} 
              text-white mb-6
            `}>
              Ready to Experience the Future of Startup Creation?
            </h2>
            <p className={`
              ${TYPOGRAPHY.sizes.body.large} 
              text-blue-100 mb-8 max-w-2xl mx-auto 
              ${TYPOGRAPHY.weights.light}
            `}>
              Join thousands of entrepreneurs who've accelerated their startup journey with our AI-powered platform
            </p>
            
            <div className={`flex flex-col sm:flex-row ${SPACING.gaps.medium} justify-center`}>
              <button className={`
                group bg-white text-blue-600 h-14 px-8 
                ${TYPOGRAPHY.sizes.body.base} ${TYPOGRAPHY.weights.semibold} 
                ${ANIMATIONS.transition} hover:bg-blue-50 
                flex items-center justify-center rounded-full 
                shadow-lg hover:scale-105 transform cursor-pointer mx-auto
              `} onClick={handleGetStarted}>
                  <Rocket className={`w-5 h-5 mr-2 group-hover:translate-x-1 ${ANIMATIONS.transition} text-blue-600`} />
                  Start Building Your Startup
                  <ArrowRight className={`w-4 h-4 ml-2 group-hover:translate-x-1 ${ANIMATIONS.transition} text-blue-600`} />
              </button>
            </div>
          </motion.div>
    </div>
      </section>
    </PageBackground>
  )
}

export default Features
