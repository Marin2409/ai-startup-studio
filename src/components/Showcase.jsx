import React, { useState } from 'react'
import { motion } from "motion/react";
import { useNavigate } from 'react-router-dom'
import { FileText, BarChart3, Settings, Target, Code, Users, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

// ==========================================
// UI COMPONENTS
// ==========================================
import { AuroraText } from './ui/Aurora-text'
import { ANIMATIONS, TYPOGRAPHY, SPACING, COMPONENTS } from '../lib/constants'

const Showcase = () => {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    { 
      step: 1, 
      title: "Generate Business Plan", 
      description: "AI creates comprehensive 15-20 page business plans with market analysis and financial projections",
      icon: <FileText className="w-6 h-6" />, 
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      duration: "5 minutes"
    },
    { 
      step: 2, 
      title: "Create Project Roadmap", 
      description: "Smart roadmaps with milestone tracking and automated progress monitoring",
      icon: <BarChart3 className="w-6 h-6" />, 
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      duration: "10 minutes"
    },
    { 
      step: 3, 
      title: "Select Tech Stack", 
      description: "AI recommends optimal technology choices based on your project requirements",
      icon: <Settings className="w-6 h-6" />, 
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      duration: "3 minutes"
    },
    { 
      step: 4, 
      title: "Prioritize MVP Features", 
      description: "Feature importance scoring with user impact analysis and development effort estimation",
      icon: <Target className="w-6 h-6" />, 
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      duration: "8 minutes"
    },
    { 
      step: 5, 
      title: "Build Prototype", 
      description: "AI-powered code generation and boilerplate creation for rapid prototyping",
      icon: <Code className="w-6 h-6" />, 
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
      duration: "2 hours"
    },
    { 
      step: 6, 
      title: "Launch & Scale", 
      description: "Team collaboration tools, launch strategies, and scaling guidance",
      icon: <Users className="w-6 h-6" />, 
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
      duration: "Ongoing"
    }
  ]

  return (
    <div>
      {/* Integration Showcase */}
      <section className={SPACING.section.desktop}>
        <div className={`${SPACING.container.large} mx-auto`}>
          
          {/* Section Header */}
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold text-lg">Complete Workflow</span>
            </div>
            <h2 className={`
              ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
              lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
              ${TYPOGRAPHY.weights.bold} 
              text-slate-900 mb-8
            `}>
              Your Complete <AuroraText>Startup Journey</AuroraText>
            </h2>
            <p className={`
              ${TYPOGRAPHY.sizes.body.large} 
              text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8 
              ${TYPOGRAPHY.weights.light}
            `}>
              From initial idea to successful launch - see how our integrated AI tools work together 
              to accelerate every stage of your startup development process.
            </p>
            
            {/* Key Stats */}
            <div className={`flex flex-wrap justify-center ${SPACING.gaps.large} text-center`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className={`text-slate-700 ${TYPOGRAPHY.weights.medium}`}>6 Integrated Steps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className={`text-slate-700 ${TYPOGRAPHY.weights.medium}`}>3 Hours Total Time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className={`text-slate-700 ${TYPOGRAPHY.weights.medium}`}>95% Success Rate</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Steps Container */}
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={{ ...ANIMATIONS.fadeIn.transition, delay: 0.2 }}
            className={`${COMPONENTS.cards.base} p-8 md:p-12 relative overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-32 translate-x-32 opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-24 -translate-x-24 opacity-50 pointer-events-none"></div>
            
            {/* Steps Grid */}
            <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${SPACING.gaps.large} mb-12`}>
              {steps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={ANIMATIONS.fadeInScale.initial}
                  animate={ANIMATIONS.fadeInScale.animate}
                  transition={{ ...ANIMATIONS.fadeInScale.transition, delay: 0.4 + index * 0.1 }}
                  className={`group relative p-6 rounded-2xl ${item.bgColor} border border-transparent hover:border-slate-200 hover:bg-white transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Icon and Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-full">
                        STEP {item.step}
                      </span>
                      <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <h3 className={`
                    ${TYPOGRAPHY.sizes.body.base} 
                    ${TYPOGRAPHY.weights.bold} 
                    text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-400
                  `}>
                    {item.title}
                  </h3>
                  <p className={`${TYPOGRAPHY.sizes.caption} text-slate-600 leading-relaxed mb-4`}>
                    {item.description}
                  </p>
                  
                  {/* Arrow for flow indication */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                  )}
                  
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA Section */}
            <motion.div
              initial={ANIMATIONS.stagger.item.initial}
              animate={ANIMATIONS.stagger.item.animate}
              transition={{ ...ANIMATIONS.stagger.item.transition, delay: 1.0 }}
              className="relative z-10 text-center pt-8 border-t border-slate-200"
            >
              <h3 className={`
                ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
                ${TYPOGRAPHY.weights.bold} 
                text-slate-900 mb-4
              `}>
                See What We're Used For
              </h3>
              <p className={`text-slate-600 mb-6 max-w-2xl mx-auto`}>
                Discover real-world success stories and see how entrepreneurs across different industries are using our AI platform to build thriving startups.
              </p>
              <button 
                onClick={() => {
                  navigate('/use-cases')
                  window.scrollTo({ top: 0 })
                }}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white h-14 px-8 text-base font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transform cursor-pointer mx-auto"
              >
                Check Our Use Cases
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Showcase
