import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { 
  Zap, 
  Target, 
  Rocket,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Clock, 
  Shield,
  ArrowRight
} from "lucide-react"
import { AuroraText } from './ui/Aurora-text'
import { ANIMATIONS, TYPOGRAPHY, SPACING } from '../lib/constants'

const Solution = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/use-cases' } })
  }

  // Before vs After comparison
  const transformations = [
    {
      before: {
        icon: <Clock className="w-6 h-6" />,
        title: "6 months research",
        description: "Manual market analysis",
        color: "text-red-500"
      },
      after: {
        icon: <Zap className="w-6 h-6" />,
        title: "5 minutes generation",
        description: "AI-powered insights",
        color: "text-green-500"
      }
    },
    {
      before: {
        icon: <DollarSign className="w-6 h-6" />,
        title: "$25K consulting",
        description: "Expensive experts",
        color: "text-red-500"
      },
      after: {
        icon: <Target className="w-6 h-6" />,
        title: "$79/month access",
        description: "AI expertise 24/7",
        color: "text-green-500"
      }
    },
    {
      before: {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "90% failure rate",
        description: "Poor planning",
        color: "text-red-500"
      },
      after: {
        icon: <CheckCircle className="w-6 h-6" />,
        title: "95% success rate",
        description: "Data-driven decisions",
        color: "text-green-500"
      }
    }
  ]

  

  // Success metrics
  const successMetrics = [
    {
      metric: "10x",
      label: "Faster Planning",
      description: "Complete business plans in minutes"
    },
    {
      metric: "95%",
      label: "Cost Reduction",
      description: "Compared to traditional consulting"
    },
    {
      metric: "85%",
      label: "Time Savings",
      description: "From idea to MVP launch"
    },
    {
      metric: "98%",
      label: "User Satisfaction",
      description: "Entrepreneurs love our platform"
    }
  ]

  return (
    <section className={SPACING.section.desktop}>
      
      <div className={`${SPACING.container.large} mx-auto relative z-10`}>
        
        {/* Section Header */}
        <motion.div
          initial={ANIMATIONS.fadeIn.initial}
          animate={ANIMATIONS.fadeIn.animate}
          transition={ANIMATIONS.fadeIn.transition}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-blue-600 mr-2" />
            <span className={`text-blue-600 ${TYPOGRAPHY.weights.semibold} ${TYPOGRAPHY.sizes.body.large}`}>The Solution</span>
          </div>
          
          <h2 className={`
            ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
            lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
            ${TYPOGRAPHY.weights.bold} 
            text-gray-900 mb-6
          `}>
            AI Startup Studio <AuroraText>Transforms</AuroraText> Everything
          </h2>
          
          <p className={`
            ${TYPOGRAPHY.sizes.body.large} 
            text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12 
            ${TYPOGRAPHY.weights.light}
          `}>
            We've reimagined the entire startup creation process with AI-powered tools that eliminate 
            traditional barriers and accelerate your journey from idea to successful business.
          </p>
        </motion.div>

        {/* Before vs After Transformations */}
        <motion.div
          initial={ANIMATIONS.fadeIn.initial}
          animate={ANIMATIONS.fadeIn.animate}
          transition={{ ...ANIMATIONS.fadeIn.transition, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className={`
            ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
            ${TYPOGRAPHY.weights.bold} 
            text-center text-slate-900 mb-12
          `}>
            The Transformation
          </h3>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 ${SPACING.gaps.large}`}>
            {transformations.map((transform, index) => (
              <motion.div
                key={index}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                {/* Before */}
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-3">
                      {transform.before.icon}
                    </div>
                    <div>
                      <div className={`${TYPOGRAPHY.weights.bold} text-red-700`}>{transform.before.title}</div>
                      <div className={`${TYPOGRAPHY.sizes.caption} text-red-600`}>{transform.before.description}</div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* After */}
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-3">
                      {transform.after.icon}
                    </div>
                    <div>
                      <div className={`${TYPOGRAPHY.weights.bold} text-green-700`}>{transform.after.title}</div>
                      <div className={`${TYPOGRAPHY.sizes.caption} text-green-600`}>{transform.after.description}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        

        {/* Success Metrics */}
        <motion.div
          initial={ANIMATIONS.fadeIn.initial}
          animate={ANIMATIONS.fadeIn.animate}
          transition={{ ...ANIMATIONS.fadeIn.transition, delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center"
        >
          <h3 className={`
            ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
            ${TYPOGRAPHY.weights.bold} 
            mb-4
          `}>
            Proven Results for Entrepreneurs
          </h3>
          <p className={`
            text-blue-100 
            ${TYPOGRAPHY.sizes.body.base} 
            mb-12 max-w-3xl mx-auto
          `}>
            Join thousands of successful entrepreneurs who've accelerated their startup journey with our AI-powered platform
          </p>
          
          <div className={`grid grid-cols-2 md:grid-cols-4 ${SPACING.gaps.large}`}>
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={ANIMATIONS.fadeInScale.initial}
                animate={ANIMATIONS.fadeInScale.animate}
                transition={{ ...ANIMATIONS.fadeInScale.transition, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className={`${TYPOGRAPHY.sizes.sectionTitle.desktop} ${TYPOGRAPHY.weights.bold} mb-2`}>{metric.metric}</div>
                <div className={`${TYPOGRAPHY.sizes.body.base} ${TYPOGRAPHY.weights.semibold} mb-1`}>{metric.label}</div>
                <div className={`text-blue-200 ${TYPOGRAPHY.sizes.caption}`}>{metric.description}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Solution
