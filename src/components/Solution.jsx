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
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { AuroraText } from './ui/Aurora-text'

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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-semibold text-lg">The Solution</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            AI Startup Studio <AuroraText>Transforms</AuroraText> Everything
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            We've reimagined the entire startup creation process with AI-powered tools that eliminate 
            traditional barriers and accelerate your journey from idea to successful business.
          </p>
        </motion.div>

        {/* Before vs After Transformations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            The Transformation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformations.map((transform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                {/* Before */}
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-3">
                      {transform.before.icon}
                    </div>
                    <div>
                      <div className="font-bold text-red-700">{transform.before.title}</div>
                      <div className="text-sm text-red-600">{transform.before.description}</div>
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
                      <div className="font-bold text-green-700">{transform.after.title}</div>
                      <div className="text-sm text-green-600">{transform.after.description}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Proven Results for Entrepreneurs
          </h3>
          <p className="text-blue-100 text-lg mb-12 max-w-3xl mx-auto">
            Join thousands of successful entrepreneurs who've accelerated their startup journey with our AI-powered platform
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{metric.metric}</div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <div className="text-blue-200 text-sm">{metric.description}</div>
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
            <button className="group bg-white text-blue-600 h-14 px-8 text-base font-semibold transition-all duration-300 hover:bg-blue-50 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transform cursor-pointer mx-auto" onClick={handleGetStarted}>
                <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform text-blue-600" />
                Start Building Your Startup
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-blue-600" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Solution
