// ----------------------------------
// Imports                          
// ----------------------------------
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { 
  Check, 
  X, 
  Rocket, 
  Crown,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Brain,
  Target,
} from "lucide-react"
import { AuroraText } from '../components/ui/Aurora-text'
import FAQ from '../components/FAQ'

const Pricing = () => {
  // State for billing toggle
  const [isAnnual, setIsAnnual] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/pricing' } })
  }

  // Pricing plans data
  const plans = [
    {
      name: "Starter",
      subtitle: "Perfect for exploring AI startup creation",
      price: 0,
      annualPrice: 0,
      badge: "Free Forever",
      badgeColor: "bg-green-100 text-green-700",
      icon: <Rocket className="w-6 h-6" />,
      description: "Get started with core AI tools and see the magic in action",
      buttonText: "Start Free",
      buttonStyle: "border-2 border-slate-300 text-slate-700 hover:bg-slate-50",
      popular: false,
      features: [
        { name: "1 Active Project", included: true, highlight: true },
        { name: "Basic AI Business Plan Generator", included: true, limit: "5 plans/month" },
        { name: "Core Template Library", included: true, limit: "10 templates" },
        { name: "Simple Roadmap Generator", included: true },
        { name: "Basic Project Dashboard", included: true, limit: "Read-only" },
        { name: "Community Support", included: true },
        { name: "PDF Exports", included: true },
        { name: "Team Collaboration", included: false },
        { name: "Advanced AI Features", included: false },
        { name: "Development Environment", included: false },
        { name: "Priority Support", included: false }
      ]
    },
    {
      name: "Professional",
      subtitle: "Complete toolkit for serious entrepreneurs",
      price: 79,
      annualPrice: 63,
      badge: "Most Popular",
      badgeColor: "bg-blue-100 text-blue-700",
      icon: <Brain className="w-6 h-6" />,
      description: "Everything you need to build and launch your startup successfully",
      buttonText: "Start Professional",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
      popular: true,
      features: [
        { name: "Unlimited Projects", included: true, highlight: true },
        { name: "Full AI Business Plan Generator", included: true },
        { name: "Complete Template Library", included: true, limit: "50+ templates" },
        { name: "Advanced Roadmap Generator", included: true },
        { name: "Tech Stack Recommender", included: true },
        { name: "MVP Feature Prioritizer", included: true },
        { name: "Cloud Development Environment", included: true },
        { name: "Team Collaboration", included: true, limit: "Up to 5 members" },
        { name: "Market Research Engine", included: true },
        { name: "Financial Modeling & Projections", included: true },
        { name: "AI Content Assistant", included: true },
        { name: "Priority Email Support", included: true }
      ]
    },
    {
      name: "Enterprise",
      subtitle: "Advanced features for teams and accelerators",
      price: 299,
      annualPrice: 239,
      badge: "Full Power",
      badgeColor: "bg-purple-100 text-purple-700",
      icon: <Crown className="w-6 h-6" />,
      description: "Enterprise-grade platform with advanced AI and global capabilities",
      buttonText: "Contact Sales",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
      popular: false,
      features: [
        { name: "Everything in Professional", included: true, highlight: true },
        { name: "Unlimited Team Members", included: true },
        { name: "Marketplace & Community Platform", included: true },
        { name: "Advanced Analytics & BI", included: true },
        { name: "Legal & Compliance Management", included: true },
        { name: "Funding & Investment Tools", included: true },
        { name: "Enterprise SSO & Integration", included: true },
        { name: "White-label & Custom Branding", included: true },
        { name: "Autonomous Business Operations", included: true },
        { name: "Global Expansion Features", included: true },
        { name: "Dedicated Success Manager", included: true },
        { name: "Priority Phone Support", included: true }
      ]
    }
  ]

  // Key features showcase
  const keyFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "10x Faster Development",
      description: "AI-powered tools accelerate every step of your startup journey"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "98% Market Accuracy",
      description: "Data-driven insights ensure your startup hits the right market"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security keeps your intellectual property safe"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 relative">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold text-lg">Simple, Transparent Pricing</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl md:text-9xl font-bold text-slate-900 text-center flex flex-col gap-4">
              Choose Your <AuroraText>Success Path</AuroraText>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto py-8">
              From free exploration to enterprise acceleration, we have the perfect plan 
              to help you build your dream startup with AI-powered precision.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 mb-4`}>
                      {plan.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-600 mb-4">{plan.subtitle}</p>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-slate-900">
                        ${isAnnual ? plan.annualPrice : plan.price}
                      </span>
                      <span className="text-slate-600 ml-1">
                        {plan.price === 0 ? '' : '/month'}
                      </span>
                      {isAnnual && plan.price > 0 && (
                        <div className="text-sm text-green-600 mt-1">
                          Save ${(plan.price - plan.annualPrice) * 12}/year
                        </div>
                      )}
                    </div>

                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                        <div className="ml-3">
                          <span className={`text-sm ${feature.included ? 'text-slate-900' : 'text-slate-400'} ${feature.highlight ? 'font-semibold' : ''}`}>
                            {feature.name}
                          </span>
                          {feature.limit && (
                            <span className="text-xs text-slate-500 ml-2">({feature.limit})</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 ease-in-out cursor-pointer ${plan.buttonStyle} hover:scale-105 transform shadow-lg hover:shadow-xl`} onClick={handleGetStarted}>
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why Choose <AuroraText>AI Startup Studio?</AuroraText>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who've accelerated their startup journey with our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Startup?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 2,500+ entrepreneurs who've accelerated their startup journey with AI
            </p>
            <button className="group bg-white text-blue-600 h-14 px-8 text-base font-semibold transition-all duration-300 hover:bg-blue-50 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transform cursor-pointer mx-auto" onClick={handleGetStarted}>
                <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform text-blue-600" />
                  Start Building Your Startup
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-blue-600" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
