import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { 
  Briefcase, 
  Clock, 
  Users, 
  Sparkles, 
  ArrowRight,
  Rocket,
  Code,
  CheckCircle,
  Building
} from "lucide-react"

// ==========================================
// UI COMPONENTS
// ==========================================
import PageBackground from '../components/ui/PageBackground'
import { AuroraText } from '../components/ui/Aurora-text'
import { ANIMATIONS, TYPOGRAPHY, SPACING, COMPONENTS } from '../lib/constants'
import Problem from '../components/Problem'
import Solution from '../components/Solution'

const UseCases = () => {
  const [activeCategory, setActiveCategory] = useState('entrepreneurs')
  const [selectedUseCase, setSelectedUseCase] = useState(null)
  const navigate = useNavigate()

  // Main categories
  const categories = [
    {
      id: 'entrepreneurs',
      name: 'First-Time Entrepreneurs',
      icon: <Rocket className="w-6 h-6" />,
      color: 'from-blue-500 to-purple-600',
      description: 'Perfect for those starting their entrepreneurial journey'
    },
    {
      id: 'developers',
      name: 'Solo Developers',
      icon: <Code className="w-6 h-6" />,
      color: 'from-green-500 to-blue-600',
      description: 'Build and scale your SaaS products efficiently'
    },
    {
      id: 'business',
      name: 'Business Owners',
      icon: <Building className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      description: 'Expand and digitize your existing business'
    },
    {
      id: 'teams',
      name: 'Startup Teams',
      icon: <Users className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      description: 'Collaborate effectively on your startup vision'
    }
  ]

  // Detailed use cases for each category
  const useCases = {
    entrepreneurs: [
      {
        id: 1,
        persona: "Sarah, College Graduate",
        title: "From Idea to Business Plan",
        challenge: "Has a social media app idea but no business experience",
        solution: "Uses voice input to describe concept, receives industry classification and generates comprehensive 20-page business plan",
        outcome: "Complete business plan with market analysis and revenue projections",
        features: ["AI Business Plan Generator", "Voice Input", "Market Analysis", "Revenue Modeling"],
        avatar: "👩‍🎓",
        timeframe: "2 hours",
        complexity: "Beginner"
      },
      {
        id: 2,
        persona: "Mike, Career Changer",
        title: "Corporate to Consulting Transition",
        challenge: "Transitioning from corporate job to start consulting business",
        solution: "Uses structured questionnaire to input expertise and target market",
        outcome: "Customized business plan with competitive analysis for investor presentations",
        features: ["Business Plan Generator", "Competitive Analysis", "Financial Projections"],
        avatar: "👨‍💼",
        timeframe: "3 hours",
        complexity: "Intermediate"
      },
      {
        id: 3,
        persona: "James, Non-Technical Founder",
        title: "Development Planning",
        challenge: "Needs mobile app but doesn't understand development process",
        solution: "Gets realistic milestone breakdowns and resource estimates",
        outcome: "Clear roadmap to communicate with technical co-founders or agencies",
        features: ["Project Roadmap", "Resource Planning", "Timeline Estimation"],
        avatar: "👨‍💻",
        timeframe: "1 hour",
        complexity: "Beginner"
      }
    ],
    developers: [
      {
        id: 4,
        persona: "Alex, Full-Stack Developer",
        title: "Solo SaaS Development",
        challenge: "Building SaaS product alone, needs structured approach",
        solution: "Generates 18-month roadmap with sprint-based milestones and Kanban tracking",
        outcome: "Organized development process with automated deadline notifications",
        features: ["Roadmap Generator", "Sprint Planning", "Progress Tracking", "Kanban Board"],
        avatar: "👨‍💻",
        timeframe: "4 hours",
        complexity: "Advanced"
      },
      {
        id: 5,
        persona: "Bootstrap Startup Team",
        title: "Cost-Effective Tech Stack",
        challenge: "Limited budget of $500, need optimal technology choices",
        solution: "Receives recommendations for free-tier services and open-source tools",
        outcome: "Complete tech stack with learning resources and cost projections",
        features: ["Tech Stack Recommender", "Budget Planning", "Cost Analysis"],
        avatar: "👥",
        timeframe: "2 hours",
        complexity: "Intermediate"
      },
      {
        id: 6,
        persona: "Learning Developer",
        title: "Skill Development & Prototyping",
        challenge: "Wants to practice without complex local setup",
        solution: "Uses cloud terminal for real development environments and one-click scaffolding",
        outcome: "Hands-on experience with different frameworks and deployment",
        features: ["Cloud Terminal", "One-Click Scaffolding", "Framework Testing"],
        avatar: "👨‍🎓",
        timeframe: "Ongoing",
        complexity: "Beginner"
      }
    ],
    business: [
      {
        id: 7,
        persona: "Lisa, Restaurant Owner",
        title: "Business Expansion Strategy",
        challenge: "Wants to expand with food delivery service",
        solution: "Inputs expansion idea and receives TAM/SAM/SOM calculations",
        outcome: "Detailed operational plan for new business line with market sizing",
        features: ["Market Analysis", "TAM/SAM/SOM", "Operational Planning"],
        avatar: "👩‍🍳",
        timeframe: "3 hours",
        complexity: "Intermediate"
      },
      {
        id: 8,
        persona: "Local Retailer",
        title: "E-commerce Platform Selection",
        challenge: "Needs e-commerce platform with $10,000 budget",
        solution: "Gets comparison between Shopify, WooCommerce, and custom solutions",
        outcome: "Detailed cost breakdown and platform recommendation with free tier options",
        features: ["Tech Stack Comparison", "Cost Analysis", "Platform Evaluation"],
        avatar: "🏪",
        timeframe: "2 hours",
        complexity: "Intermediate"
      },
      {
        id: 9,
        persona: "David, Freelancer",
        title: "Agency Scaling Strategy",
        challenge: "Looking to scale design agency and formalize operations",
        solution: "Creates formal business plan for investor presentations and loans",
        outcome: "Professional business plan ready for funding applications with financial projections",
        features: ["Business Plan Generator", "Financial Modeling", "Investor Templates"],
        avatar: "🎨",
        timeframe: "4 hours",
        complexity: "Advanced"
      }
    ],
    teams: [
      {
        id: 10,
        persona: "Tech Startup Co-founders",
        title: "Collaborative Business Planning",
        challenge: "Multiple founders need to align on business strategy",
        solution: "Uses collaborative features to refine different business plan sections",
        outcome: "Unified business plan with clear revenue model and marketing strategy",
        features: ["Team Collaboration", "Section Management", "Version Control"],
        avatar: "👥",
        timeframe: "1 week",
        complexity: "Advanced"
      },
      {
        id: 11,
        persona: "E-commerce Startup Team",
        title: "Resource Allocation & Dependencies",
        challenge: "4-person team needs to coordinate complex product launch",
        solution: "Uses dependency mapping to understand critical path",
        outcome: "Optimized resource allocation across frontend, backend, and marketing",
        features: ["Dependency Mapping", "Resource Planning", "Team Coordination"],
        avatar: "🛒",
        timeframe: "2 weeks",
        complexity: "Advanced"
      },
      {
        id: 12,
        persona: "Jennifer, Product Manager",
        title: "Feature Prioritization at Scale",
        challenge: "Has 50+ feature ideas, needs systematic prioritization",
        solution: "Uses RICE scoring and MoSCoW prioritization methods with user impact analysis",
        outcome: "Clear MVP scope with 3-phase release roadmap with user impact analysis",
        features: ["RICE Scoring", "MoSCoW Method", "Release Planning", "User Stories"],
        avatar: "👩‍💼",
        timeframe: "1 week",
        complexity: "Advanced"
      }
    ]
  }

  // Success metrics
  const successMetrics = [
    { label: "Average Time Saved", value: "85%", icon: <Clock className="w-6 h-6" /> },
    { label: "Business Plans Created", value: "2,500+", icon: <Briefcase className="w-6 h-6" /> },
    { label: "Successful Launches", value: "340+", icon: <Rocket className="w-6 h-6" /> },
    { label: "User Satisfaction", value: "98%", icon: <CheckCircle className="w-6 h-6" /> }
  ]

  return (
    <PageBackground variant="default">

      {/* Hero Section */}
      <section className={SPACING.section.desktop}>
        <div className={`${SPACING.container.large} mx-auto text-center`}>
          <motion.div
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
              <span className={`text-blue-600 ${TYPOGRAPHY.weights.semibold} ${TYPOGRAPHY.sizes.body.large}`}>Real Success Stories</span>
            </div>

            <h1 className={`
              ${TYPOGRAPHY.sizes.hero.mobile} 
              lg:${TYPOGRAPHY.sizes.hero.desktop} 
              md:text-9xl 
              ${TYPOGRAPHY.weights.bold} 
              text-slate-900 text-center flex flex-col gap-4
            `}>
            See How <AuroraText>Entrepreneurs</AuroraText> Build Success
            </h1>
            
            <p className={`
              ${TYPOGRAPHY.sizes.body.large} 
              text-slate-600 max-w-3xl mx-auto py-8 
              ${TYPOGRAPHY.weights.light}
            `}>
              Discover how real entrepreneurs, developers, and business owners use AI Startup Studio 
              to accelerate their journey from idea to successful business.
            </p>

            {/* Success Metrics */}
            <div className={`grid grid-cols-2 md:grid-cols-4 ${SPACING.gaps.large} max-w-4xl mx-auto`}>
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={ANIMATIONS.fadeInScale.initial}
                  animate={ANIMATIONS.fadeInScale.animate}
                  transition={{ ...ANIMATIONS.fadeInScale.transition, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-3">
                    {metric.icon}
                  </div>
                  <div className={`${TYPOGRAPHY.sizes.sectionTitle.mobile} ${TYPOGRAPHY.weights.bold} text-slate-900 mb-1`}>{metric.value}</div>
                  <div className={`${TYPOGRAPHY.sizes.caption} text-slate-600`}>{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className={SPACING.section.mobile}>
        <div className={`${SPACING.container.large} mx-auto`}>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${SPACING.gaps.medium}`}>
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  p-6 rounded-2xl text-left ${ANIMATIONS.transition} transform hover:scale-105 cursor-pointer 
                  ${activeCategory === category.id
                    ? 'bg-white shadow-xl ring-2 ring-blue-600'
                    : 'bg-white shadow-lg hover:shadow-xl'
                  }
                `}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className={`${TYPOGRAPHY.sizes.body.large} ${TYPOGRAPHY.weights.semibold} text-slate-900 mb-2`}>{category.name}</h3>
                <p className={`${TYPOGRAPHY.sizes.caption} text-slate-600`}>{category.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className={SPACING.section.mobile}>
        <div className={`${SPACING.container.large} mx-auto`}>
          <motion.div
            key={activeCategory}
            initial={ANIMATIONS.fadeIn.initial}
            animate={ANIMATIONS.fadeIn.animate}
            transition={ANIMATIONS.fadeIn.transition}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${SPACING.gaps.large}`}>
              {useCases[activeCategory]?.map((useCase, index) => (
                <motion.div
                  key={useCase.id}
                  initial={ANIMATIONS.fadeInUp.initial}
                  animate={ANIMATIONS.fadeInUp.animate}
                  transition={{ ...ANIMATIONS.fadeInUp.transition, delay: index * 0.1 }}
                  className={`${COMPONENTS.cards.base} overflow-hidden cursor-pointer ${ANIMATIONS.hover}`}
                  onClick={() => setSelectedUseCase(useCase)}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${TYPOGRAPHY.sizes.sectionTitle.mobile} mb-2`}>{useCase.avatar}</div>
                      <div className={`flex ${SPACING.gaps.small}`}>
                        <span className={`
                          px-2 py-1 ${TYPOGRAPHY.sizes.tiny} ${TYPOGRAPHY.weights.semibold} rounded-full 
                          ${useCase.complexity === 'Beginner' ? 'bg-green-100 text-green-700' :
                            useCase.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }
                        `}>
                          {useCase.complexity}
                        </span>
                        <span className={`px-2 py-1 ${TYPOGRAPHY.sizes.tiny} ${TYPOGRAPHY.weights.semibold} rounded-full bg-blue-100 text-blue-700`}>
                          {useCase.timeframe}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-slate-900 mb-2`}>{useCase.title}</h3>
                    <p className={`text-blue-600 ${TYPOGRAPHY.weights.medium} mb-3 ${TYPOGRAPHY.sizes.body.base}`}>{useCase.persona}</p>
                    <p className={`text-slate-600 ${TYPOGRAPHY.sizes.caption}`}>{useCase.challenge}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className={`${TYPOGRAPHY.weights.semibold} text-slate-900 mb-2 ${TYPOGRAPHY.sizes.body.base}`}>Solution:</h4>
                      <p className={`text-slate-600 ${TYPOGRAPHY.sizes.caption} mb-3`}>{useCase.solution}</p>
                      
                      <h4 className={`${TYPOGRAPHY.weights.semibold} text-slate-900 mb-2 ${TYPOGRAPHY.sizes.body.base}`}>Outcome:</h4>
                      <p className={`text-slate-600 ${TYPOGRAPHY.sizes.caption}`}>{useCase.outcome}</p>
                    </div>

                    {/* Features Used */}
                    <div className="mb-4">
                      <h4 className={`${TYPOGRAPHY.weights.semibold} text-slate-900 mb-2 ${TYPOGRAPHY.sizes.body.base}`}>Features Used:</h4>
                      <div className={`flex flex-wrap ${SPACING.gaps.small}`}>
                        {useCase.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className={`px-3 py-1 bg-blue-50 text-blue-700 ${TYPOGRAPHY.sizes.tiny} ${TYPOGRAPHY.weights.medium} rounded-full`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* To-Do: REMOVE COMMUNITY LINK FOR NOW UNTIL BACKEND IS FULLY IMPLEMENTED */}
                    {/* <button 
                      onClick={() => {
                        navigate('/community')
                        window.scrollTo({ top: 0 })
                      }}
                      className={`
                        w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl 
                        ${TYPOGRAPHY.weights.semibold} hover:from-blue-700 hover:to-purple-700 
                        ${ANIMATIONS.transition} flex items-center justify-center cursor-pointer
                      `}
                    >
                      View Full Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <Problem />

      {/* Solution Section */}
      <Solution />
      
    </PageBackground>
  )
}

export default UseCases
