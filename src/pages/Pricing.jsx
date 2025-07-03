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
      payAsYouGo: {
        available: true,
        bundle: {
          name: "Power Pack",
          price: 10,
          description: "Refill all your tools when you run out",
          includes: [
            "5 more AI business plans",
            "10 more templates",
            "5 more tech recommendations", 
            "1 more feature prioritization"
          ]
        },
        individual: [
          { service: "AI Business Plans", price: 4, quantity: "5 more plans" },
          { service: "Template Access", price: 3, quantity: "10 more templates" },
          { service: "Tech Recommendations", price: 2, quantity: "5 more recommendations" },
          { service: "Feature Prioritization", price: 5, quantity: "1 more project" }
        ]
      },
      features: [
        { name: "3 Active Projects", included: true, highlight: true },
        { name: "AI Business Plan Generator", included: true, limit: "5 plans/month" },
        { name: "Basic Template Library", included: true, limit: "10 templates" },
        { name: "Project Roadmap Generator", included: true, limit: "Basic timelines" },
        { name: "Tech Stack Recommender", included: true, limit: "3 recommendations" },
        { name: "Feature Prioritization Tool", included: true, limit: "1 project" },
        { name: "PDF Exports", included: true },
        { name: "Community Support", included: true },
        { name: "💡 Pay-as-you-go top-ups available", included: true, highlight: true, payAsYouGo: true },
        { name: "Cloud Terminal Access", included: false },
        { name: "Advanced AI Features", included: false },
        { name: "Priority Support", included: false },
        { name: "Custom Integrations", included: false }
      ]
    },
    {
      name: "Builder",
      subtitle: "Complete toolkit for serious entrepreneurs",
      price: 29,
      annualPrice: 24,
      badge: "Most Popular",
      badgeColor: "bg-blue-100 text-blue-700",
      icon: <Brain className="w-6 h-6" />,
      description: "Everything you need to build and launch your MVP successfully",
      buttonText: "Start Building",
      buttonVariant: "primary",
      popular: true,
      features: [
        { name: "Unlimited Projects", included: true, highlight: true },
        { name: "AI Business Plan Generator", included: true, limit: "Unlimited" },
        { name: "Complete Template Library", included: true, limit: "25+ templates" },
        { name: "Advanced Project Roadmaps", included: true, limit: "12-18 month timelines" },
        { name: "Smart Tech Stack Recommender", included: true, limit: "Budget-aware suggestions" },
        { name: "MVP Feature Prioritization", included: true, limit: "RICE & MoSCoW scoring" },
        { name: "Cloud-Based Terminal", included: true, limit: "Full development environment" },
        { name: "Multi-format Exports", included: true, limit: "PDF, Word, PPT" },
        { name: "Email Support", included: true },
        { name: "Version Control", included: true },
        { name: "Basic Analytics", included: true },
        { name: "API Access", included: false }
      ]
    },
    {
      name: "Pro",
      subtitle: "Advanced features for teams and agencies",
      price: 79,
      annualPrice: 63,
      badge: "Full Power",
      badgeColor: "bg-purple-100 text-purple-700",
      icon: <Crown className="w-6 h-6" />,
      description: "Professional-grade platform with team collaboration and advanced AI",
      buttonText: "Go Pro",
      buttonVariant: "primary",
      popular: false,
      features: [
        { name: "Everything in Builder", included: true, highlight: true },
        { name: "Team Collaboration", included: true, limit: "Up to 10 members" },
        { name: "Advanced AI Models", included: true, limit: "GPT-4 & Claude access" },
        { name: "Custom Templates", included: true, limit: "Create & share templates" },
        { name: "Advanced Analytics", included: true, limit: "Project insights & metrics" },
        { name: "API Access", included: true, limit: "Full API integration" },
        { name: "White-label Options", included: true, limit: "Custom branding" },
        { name: "Priority Support", included: true, limit: "24/7 chat support" },
        { name: "Advanced Integrations", included: true, limit: "Slack, GitHub, etc." },
        { name: "Custom Workflows", included: true },
        { name: "Data Export", included: true },
        { name: "Advanced Security", included: true }
      ]
    }
  ]

  // ==========================================
  // KEY FEATURES SHOWCASE
  // ==========================================
  
  const keyFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Business Plan Generator",
      description: "Generate 15-20 page professional business plans with market analysis and financial projections in minutes"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Development Roadmaps",
      description: "12-18 month project timelines with sprint planning and milestone tracking"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cloud Development Environment",
      description: "Browser-based terminal with one-click project scaffolding for popular frameworks"
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
            title="Start Building Your Startup Today"
            highlightedWord="Building"
            description="From free exploration to professional development tools, we have the perfect plan to help you transform your idea into a working MVP with AI-powered precision."
          />

          {/* ==========================================
              BILLING TOGGLE
              ========================================== */}
          
          <div className="flex items-center justify-center mb-8">
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

          {/* ==========================================
              PAY-AS-YOU-GO CALLOUT
              ========================================== */}
          
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Never Hit a Wall</h3>
              <p className="text-slate-600 text-sm">
                Start free and only pay for what you need. Run out of AI plans or templates? 
                <span className="font-medium text-blue-600"><br/>Top up instantly</span> without upgrading to a full subscription.
              </p>
            </div>
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
                          <span className={`text-sm ${feature.included ? 'text-slate-900' : 'text-slate-400'} ${feature.highlight ? 'font-semibold' : ''} ${feature.payAsYouGo ? 'text-blue-600' : ''}`}>
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
                      PAY-AS-YOU-GO SECTION (STARTER ONLY)
                      ========================================== */}
                  
                  {plan.payAsYouGo && (
                    <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <Zap className="w-4 h-4 mr-2" />
                        When you run out, top up instantly:
                      </h4>
                      
                      {/* Bundle Option */}
                      <div className="mb-4 p-3 bg-white rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-900">{plan.payAsYouGo.bundle.name}</span>
                          <span className="font-bold text-blue-600">${plan.payAsYouGo.bundle.price}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{plan.payAsYouGo.bundle.description}</p>
                        <div className="text-xs text-slate-500">
                          {plan.payAsYouGo.bundle.includes.map((item, idx) => (
                            <div key={idx}>• {item}</div>
                          ))}
                        </div>
                      </div>

                      {/* Individual Options */}
                      <div className="text-xs text-slate-600">
                        <div className="font-medium mb-1">Or buy individually:</div>
                        {plan.payAsYouGo.individual.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.service}</span>
                            <span className="font-medium">${item.price} for {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
            description="Get everything you need to go from idea to MVP with our integrated AI-powered development platform"
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
              Ready to Build Your MVP?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of entrepreneurs who've transformed their ideas into working products with AI
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
