import React, { useState } from 'react'
import { motion } from "motion/react";  
import { useNavigate } from 'react-router-dom'
import { 
  Brain, 
  CheckCircle,
  Zap,
  Target,
  Rocket,
  BarChart3,
  Code,
  Users,
  Globe,
  Shield,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { AuroraText } from './ui/Aurora-text';
import { TYPOGRAPHY, ANIMATIONS } from '../lib/constants';

const Features = () => {
  // Navigation hook
  const navigate = useNavigate()
  
  // State for active feature tab
  const [activeTab, setActiveTab] = useState(0);

  // Main features data
  const mainFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Business Plans",
      description: "Generate comprehensive 15-20 page business plans with market analysis, financial projections, and strategic insights in minutes.",
      details: [
        "Market research & competitive analysis",
        "Financial projections & revenue models",
        "Risk assessment & mitigation strategies",
        "Executive summary & pitch deck generation"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Roadmaps",
      description: "Create detailed 12-18 month roadmaps with milestone tracking, resource allocation, and automated progress monitoring.",
      details: [
        "Milestone-based development planning",
        "Resource allocation & budget tracking",
        "Progress monitoring & analytics",
        "Team collaboration & task management"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "MVP Prioritization",
      description: "AI-powered feature analysis that identifies the most critical features for your minimum viable product launch.",
      details: [
        "Feature importance scoring",
        "User impact analysis",
        "Development effort estimation",
        "Market validation guidance"
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100"
    }
  ];

  // Additional features
  const additionalFeatures = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Generation",
      description: "AI-powered code scaffolding and boilerplate generation"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Market Analytics",
      description: "Real-time market insights and trend analysis"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Management",
      description: "Collaborative workspace and team coordination tools"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Scaling",
      description: "Multi-market expansion strategies and localization"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Assessment",
      description: "Automated risk analysis and mitigation strategies"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Launch Support",
      description: "Go-to-market strategies and launch execution plans"
    }
  ];

  return (
    // Main features section with transparent background to show Home page gradient
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-20 pointer-events-none"></div>
      
      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-semibold text-lg">Powerful Features</span>
          </div>

          <h2 className={`
              ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
              lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
              ${TYPOGRAPHY.weights.bold} 
              text-slate-900 mb-8
            `}>
              Everything You Need to <AuroraText>Launch</AuroraText>
            </h2>
            <p className={`
              ${TYPOGRAPHY.sizes.body.large} 
              text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8 
              ${TYPOGRAPHY.weights.light}
            `}>
              Our comprehensive AI-powered platform provides all the tools, insights, and guidance you need to transform your startup idea into a thriving business.
            </p>
        </motion.div>

        {/* Main features grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={`group relative p-8 rounded-2xl ${feature.bgColor} border border-transparent hover:border-slate-200 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-lg cursor-pointer`}
              onClick={() => setActiveTab(index)}
            >
              {/* Feature icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-500`}>
                {feature.icon}
              </div>
              
              {/* Feature content */}
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-400">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Feature details */}
              <ul className="space-y-2 mb-6">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Learn more button */}
              <button 
                onClick={() => {
                  navigate('/features')
                  window.scrollTo({ top: 0})
                }}
                className="group/btn flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 cursor-pointer"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional features section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Plus Many More Features
            </h3>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light">
              Comprehensive tools and capabilities designed to support every aspect of your startup journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-400"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-slate-600 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:text-blue-600 transition-all duration-400">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-400">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              7 AI Tools, One Platform
            </h3>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Seamlessly integrated AI-powered tools that work together to accelerate your startup journey 
              from idea to successful launch.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">10x</div>
                <div className="text-blue-200">Faster Development</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-blue-200">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-200">AI Assistance</div>
              </div>
            </div>

            <button 
            className={`
              group bg-white text-blue-600 
              h-14 px-8 ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.semibold} 
              ${ANIMATIONS.transition} hover:bg-blue-50 
              flex items-center justify-center rounded-full 
              shadow-lg hover:scale-105 transform cursor-pointer mx-auto
            `}
              onClick={() => {
                navigate('/features')
                window.scrollTo({ top: 0 })
              }}
              >
              Explore All Features
              <ArrowRight className={`w-4 h-4 ml-2 group-hover:translate-x-1 ${ANIMATIONS.transition} text-blue-600`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
