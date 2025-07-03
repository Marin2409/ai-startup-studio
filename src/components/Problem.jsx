import React from 'react'
import { motion } from "motion/react"
import { 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  TrendingDown,
  Users,
  FileX,
  Brain,
} from "lucide-react"
import { AuroraText } from './ui/Aurora-text'

const Problem = () => {
  // Key problems entrepreneurs face
  const problems = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Months of Research",
      description: "Entrepreneurs spend 3-6 months researching markets, competitors, and business models before even starting",
      stat: "85% of time wasted",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Expensive Consultants",
      description: "Business consultants charge $150-500/hour for basic business plans and market analysis",
      stat: "$15K+ average cost",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "High Failure Rate",
      description: "90% of startups fail due to poor planning, market misunderstanding, and lack of strategic guidance",
      stat: "90% failure rate",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <FileX className="w-8 h-8" />,
      title: "Generic Templates",
      description: "One-size-fits-all business plan templates don't account for industry specifics or market dynamics",
      stat: "60% irrelevant",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Technical Overwhelm",
      description: "Non-technical founders struggle with technology decisions, development timelines, and MVP planning",
      stat: "70% feel overwhelmed",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Isolated Journey",
      description: "Solo entrepreneurs lack mentorship, feedback, and collaborative tools to refine their ideas",
      stat: "80% work alone",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    }
  ]

  // Shocking statistics
  const shockingStats = [
    {
      number: "6 months",
      label: "Average time to create business plan",
      subtext: "Before getting any feedback"
    },
    {
      number: "$25K",
      label: "Cost of professional consulting",
      subtext: "For basic business planning"
    },
    {
      number: "90%",
      label: "Startup failure rate",
      subtext: "Due to poor planning"
    }
  ]

    return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    
    <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
        >
        <div className="flex items-center justify-center mb-6">
            <AlertTriangle className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-semibold text-lg">The Problem</span>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why Most Startups <AuroraText>Fail</AuroraText> Before They Start
        </h2>

        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            The entrepreneurial journey is riddled with obstacles that prevent great ideas from becoming successful businesses. 
            Here's what's really holding back the next generation of innovators.
        </p>

        {/* Shocking Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {shockingStats.map((stat, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center p-6 bg-white backdrop-blur-sm rounded-2xl border border-red-200 shadow-lg"
            >
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-slate-900 font-semibold mb-1">{stat.label}</div>
                <div className="text-slate-600 text-sm">{stat.subtext}</div>
            </motion.div>
            ))}
        </div>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
        {problems.map((problem, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            className="group relative bg-white rounded-2xl p-8 border border-red-200 hover:border-red-300 transition-all duration-500 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
            {/* Problem Icon */}
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${problem.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {problem.icon}
            </div>
            
            {/* Problem Content */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                {problem.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                {problem.description}
                </p>
            </div>

            {/* Problem Statistic */}
            <div className="flex items-center justify-between">
                <div className="bg-red-100 px-4 py-2 rounded-full border border-red-200">
                <span className="text-red-700 font-bold text-sm">{problem.stat}</span>
                </div>
                <TrendingDown className="w-5 h-5 text-red-500 opacity-60" />
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-orange-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
        ))}
        </motion.div>
    </div>
</section>
)
}

export default Problem
