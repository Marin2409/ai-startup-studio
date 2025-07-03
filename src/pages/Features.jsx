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
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import { AuroraText } from '../components/ui/Aurora-text'
import { CONTENT, ANIMATIONS } from '../lib/constants'

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
      description: "AI creates detailed 12-18 month roadmaps with milestone tracking, resource allocation, and automated progress monitoring.",
      benefits: ["Sprint-based planning", "Resource optimization", "Deadline tracking", "Team coordination"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      demo: "Generate 18-month product roadmap"
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
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Main page header */}
          <SectionHeader
            icon={<Sparkles className="w-6 h-6" />}
            badge="Complete Feature Suite"
            title="Everything You Need to Build Your Startup"
            highlightedWord="Build"
            description="From AI-powered business planning to code generation, our comprehensive platform provides all the tools entrepreneurs need to transform ideas into successful businesses."
          />

          {/* ==========================================
              HERO STATISTICS GRID
              ========================================== */}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
            {heroStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={ANIMATIONS.fadeInScale.initial}
                animate={ANIMATIONS.fadeInScale.animate}
                transition={{ ...ANIMATIONS.fadeInScale.transition, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          DETAILED SOLUTION FEATURES
          ========================================== */}
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <SectionHeader
            title="Comprehensive AI-Powered Tools"
            highlightedWord="AI-Powered"
            description="Each tool is designed to solve specific entrepreneurial challenges with cutting-edge AI technology"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 hover:transform hover:scale-105"
              >
                
                {/* ==========================================
                    SOLUTION ICON
                    ========================================== */}
                
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {solution.icon}
                </div>
                
                {/* ==========================================
                    SOLUTION CONTENT
                    ========================================== */}
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-400">
                  {solution.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* ==========================================
                    BENEFITS LIST
                    ========================================== */}
                
                <ul className="space-y-3 mb-6">
                  {solution.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-slate-600">
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
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <SectionHeader
            title="Traditional vs. AI Startup Studio"
            highlightedWord="AI Startup Studio"
            description="See how our AI-powered approach revolutionizes the startup creation process"
          />

          <motion.div
            initial={ANIMATIONS.fadeInUp.initial}
            animate={ANIMATIONS.fadeInUp.animate}
            transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                
                {/* ==========================================
                    TABLE HEADER
                    ========================================== */}
                
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">Traditional Method</th>
                    <th className="px-6 py-4 text-center font-semibold">AI Startup Studio</th>
                    <th className="px-6 py-4 text-center font-semibold">Improvement</th>
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
                      className={`border-b border-slate-100 hover:bg-blue-50 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{item.feature}</td>
                      <td className="px-6 py-4 text-center text-red-600">{item.traditional}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{item.aiStudio}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
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
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future of Startup Creation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who've accelerated their startup journey with our AI-powered platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="large"
                onClick={handleGetStarted}
                leftIcon={<Rocket className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {CONTENT.cta.primary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageBackground>
  )
}

export default Features
