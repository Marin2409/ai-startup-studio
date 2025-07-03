// ==========================================
// PRICING PAGE COMPONENT
// ==========================================
// Comprehensive pricing page with plans, features, and FAQ
// Showcases transparent pricing with annual/monthly toggle

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

// ==========================================
// UI COMPONENTS
// ==========================================
import PageBackground from '../components/ui/PageBackground'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import { AuroraText } from '../components/ui/Aurora-text'
import FAQ from '../components/FAQ'
import { CONTENT, ANIMATIONS } from '../lib/constants'

/**
 * Pricing Component
 * 
 * Complete pricing page featuring:
 * - Three-tier pricing structure (Starter, Professional, Enterprise)
 * - Annual/monthly billing toggle with savings
 * - Detailed feature comparison
 * - Key benefits showcase
 * - Integrated FAQ section
 * - Strong CTAs throughout
 */
const Pricing = () => {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  // Billing cycle toggle (monthly/annual)
  const [isAnnual, setIsAnnual] = useState(false)
  const navigate = useNavigate()

  // Navigation handler for CTAs
  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/pricing' } })
  }

  // ==========================================
  // PRICING PLANS DATA
  // ==========================================
  
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
      buttonVariant: "outline",
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
      buttonVariant: "primary",
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
      buttonVariant: "primary",
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

  // ==========================================
  // KEY FEATURES SHOWCASE
  // ==========================================
  
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
    <PageBackground variant="default">

      {/* ==========================================
          PAGE HEADER SECTION
          ========================================== */}
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Main page header */}
          <SectionHeader
            icon={<Sparkles className="w-6 h-6" />}
            badge="Simple, Transparent Pricing"
            title="Choose Your Success Path"
            highlightedWord="Success Path"
            description="From free exploration to enterprise acceleration, we have the perfect plan to help you build your dream startup with AI-powered precision."
          />

          {/* ==========================================
              BILLING TOGGLE
              ========================================== */}
          
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
        </div>
      </section>

      {/* ==========================================
          PRICING CARDS SECTION
          ========================================== */}
      
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  
                  {/* ==========================================
                      PLAN HEADER
                      ========================================== */}
                  
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 mb-4">
                      {plan.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-600 mb-4">{plan.subtitle}</p>
                    
                    {/* Pricing display */}
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

                  {/* ==========================================
                      FEATURES LIST
                      ========================================== */}
                  
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

                  {/* ==========================================
                      CTA BUTTON
                      ========================================== */}
                  
                  <Button
                    variant={plan.buttonVariant}
                    size="large"
                    onClick={handleGetStarted}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          KEY FEATURES SECTION
          ========================================== */}
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <SectionHeader
            title="Why Choose AI Startup Studio?"
            highlightedWord="AI Startup Studio?"
            description="Join thousands of successful entrepreneurs who've accelerated their startup journey with our platform"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, delay: index * 0.1 }}
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

      {/* ==========================================
          FAQ SECTION
          ========================================== */}
      
      <FAQ />

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
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Startup?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join {CONTENT.stats.users} entrepreneurs who've accelerated their startup journey with AI
            </p>
            
            <Button
              variant="secondary"
              size="large"
              onClick={handleGetStarted}
              leftIcon={<Rocket className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="mx-auto"
            >
              {CONTENT.cta.primary}
            </Button>
          </motion.div>
        </div>
      </section>
    </PageBackground>
  )
}

export default Pricing
