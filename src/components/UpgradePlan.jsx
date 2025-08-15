import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Rocket, Brain, Crown, ArrowRight, Zap, AlertTriangle, X } from 'lucide-react'
import PageBackground from './ui/PageBackground'
import Button from './ui/Button-component'
import { ANIMATIONS, TYPOGRAPHY, SPACING } from '../lib/constants'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const UpgradePlan = () => {
  const navigate = useNavigate()
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('builder')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentUserPlan, setCurrentUserPlan] = useState(null)
  const [showDowngradeModal, setShowDowngradeModal] = useState(false)

  useEffect(() => {
    fetchCurrentPlan()
  }, [])

  // Hide navbar when modal is active
  useEffect(() => {
    if (showDowngradeModal) {
      document.body.classList.add('modal-active')
      // Also prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      document.body.classList.remove('modal-active')
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-active')
      document.body.style.overflow = 'unset'
    }
  }, [showDowngradeModal])

  const fetchCurrentPlan = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      if (response.ok && data.success) {
        setCurrentUserPlan(data.user.billing?.selected_plan || 'free')
      }
    } catch (error) {
      console.error('Error fetching current plan:', error)
    }
  }

  const handleContinue = async () => {
    // Check if user is downgrading to free plan
    const isDowngrading = selectedPlan === 'free' && currentUserPlan && currentUserPlan !== 'free'
    
    if (isDowngrading) {
      setShowDowngradeModal(true)
      return
    }
    
    await updatePlan()
  }

  const updatePlan = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      
      // Determine billing cycle string
      const billingCycle = isAnnual ? 'annual' : 'monthly'
      
      const response = await fetch(`${API_BASE_URL}/api/user/plan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          selectedPlan, 
          billingCycle 
        })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        // Update localStorage with new billing info
        const userData = JSON.parse(localStorage.getItem('user'))
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          billing: data.billing
        }))
        
        // Show success message
        alert(`Plan successfully updated to ${selectedPlan}!`)
        
        // Navigate back to billing or dashboard
        navigate('/dashboard')
      } else {
        setError(data.message || 'Failed to update plan')
      }
      
    } catch (error) {
      console.error('Error updating plan:', error)
      setError('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDowngrade = async () => {
    setShowDowngradeModal(false)
    await updatePlan()
  }

  const handleCancelDowngrade = () => {
    setShowDowngradeModal(false)
    // Reset selection to current plan
    setSelectedPlan(currentUserPlan || 'builder')
  }

  const getDowngradeMessage = () => {
    if (currentUserPlan === 'enterprise') {
      return 'You will lose access to all add-on packages and advanced features. You will need to repurchase them if you upgrade again.'
    } else if (currentUserPlan === 'builder') {
      return 'You will keep any add-on packages you\'ve purchased, but lose access to Builder features.'
    }
    return ''
  }

  const plans = [
    {
      name: 'Starter',
      id: 'free',
      subtitle: 'Perfect for exploring AI startup creation',
      price: 0,
      annualPrice: 0,
      badge: 'Free Forever',
      badgeColor: 'bg-green-100 text-green-700',
      icon: <Rocket className="w-6 h-6" />,
      description: 'Get started with core AI tools and see the magic in action',
      buttonText: 'Start Free',
      buttonVariant: 'outline',
      popular: false,
      perProjectAddOns: {
        available: true,
        options: [
          { type: 'images', name: 'Image Pack', price: 5, quantity: 10, description: '10 more AI-generated images (account-wide)' },
          { type: 'documents', name: 'Document Pack', price: 8, quantity: 5, description: '5 additional documents for one project' }
        ]
      },
      features: [
        { name: 'Active Projects', included: true, limit: '1' },
        { name: 'Basic AI Business Plan', included: true, limit: '6 documents' },
        { name: 'Exports', included: true, limit: 'PDF only' },
        { name: 'Image Generator', included: true, limit: '2 per project' },
        { name: 'AI Assistant', included: false, limit: '' }
      ]
    },
    {
      name: 'Builder',
      id: 'builder',
      subtitle: 'Complete toolkit for serious entrepreneurs',
      price: 5,
      annualPrice: 4,
      badge: 'Most Popular',
      badgeColor: 'bg-blue-100 text-blue-700',
      icon: <Brain className="w-6 h-6" />,
      description: 'Everything you need to build and launch your MVP successfully',
      buttonText: 'Start Building',
      buttonVariant: 'primary',
      popular: true,
      perProjectAddOns: {
        available: true,
        options: [
          { type: 'images', name: 'Image Pack', price: 5, quantity: 10, description: '10 more AI-generated images (account-wide)' },
          { type: 'documents', name: 'Document Pack', price: 8, quantity: 5, description: '5 additional documents for one project' }
        ]
      },
      features: [
        { name: 'Active Projects', included: true, limit: '3' },
        { name: 'Intermediate AI Business Plan', included: true, limit: '16 Documents' },
        { name: 'Exports', included: true, limit: 'PDF + PNG' },
        { name: 'Image Generator', included: true, limit: '3 per project' },
        { name: 'AI Assistant', included: true, limit: 'Limited (100 prompts/month)' }
      ]
    },
    {
      name: 'Enterprise',
      id: 'enterprise',
      subtitle: 'Advanced features for teams and agencies',
      price: 15,
      annualPrice: 12,
      badge: 'Full Power',
      badgeColor: 'bg-purple-100 text-purple-700',
      icon: <Crown className="w-6 h-6" />,
      description: 'Professional-grade platform with unlimited AI and advanced features',
      buttonText: 'Go Enterprise',
      buttonVariant: 'primary',
      popular: false,
      perProjectAddOns: {
        available: false,
        note: 'All features included - no additional purchases needed'
      },
      features: [
        { name: 'Active Projects', included: true, limit: 'Unlimited' },
        { name: 'Advanced AI Business Plan', included: true, limit: 'Complete set of Documents (32)' },
        { name: 'Exports', included: true, limit: 'PDF + PNG + SVG' },
        { name: 'Image Generator', included: true, limit: '5 per project' },
        { name: 'AI Assistant', included: true, limit: 'Pro (200 prompts/month)' }
      ]
    }
  ]

  const addonExplainers = [
    {
      id: 'free',
      title: 'Starter (Free)',
      priceLabel: 'Coder Package – $8',
      details:
        'Includes Tech Stack Documents (Frontend, Backend, UI/UX, Deployment & Hosting) + Database Documents (Schema, Tables)'
    },
    {
      id: 'builder',
      title: 'Builder',
      priceLabel: 'Database Package – $4',
      details: 'Includes Database Documents (Schema, Tables)'
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      priceLabel: 'Both packages included',
      details: 'No add‑on purchase needed'
    }
  ]

  return (
    <>
      <PageBackground variant="light">
      <section className={SPACING.section.desktop}>
        <div className={`${SPACING.container.large} mx-auto`}>
          <div className="text-center mb-12">
            <h1 className={`${TYPOGRAPHY.sizes.pageTitle.mobile} lg:${TYPOGRAPHY.sizes.pageTitle.desktop} ${TYPOGRAPHY.weights.bold} text-gray-900 mb-4`}>
              Choose Your Plan
            </h1>
          </div>

          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer ${ANIMATIONS.transition} ${
                isAnnual ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white ${ANIMATIONS.transition} ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`ml-3 ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}
            >
              Annual
            </span>
            {isAnnual && (
              <span
                className={`ml-2 bg-green-100 text-green-800 ${TYPOGRAPHY.sizes.tiny} ${TYPOGRAPHY.weights.semibold} px-2 py-1 rounded-full`}
              >
                Save 20%
              </span>
            )}
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-3 mt-10    ${SPACING.gaps.large}`}>
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, delay: index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-8 rounded-3xl border-2 cursor-pointer ${ANIMATIONS.transition} ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                } ${plan.popular ? 'ring-4 ring-blue-100' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {currentUserPlan === plan.id && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 mb-4">
                    {plan.icon}
                  </div>
                  <h3 className={`${TYPOGRAPHY.sizes.sectionTitle.mobile} ${TYPOGRAPHY.weights.bold} text-gray-900 mb-2`}>{plan.name}</h3>
                  <p className={`${TYPOGRAPHY.sizes.body.base} text-gray-600 mb-4`}>{plan.description}</p>
                  <div className="mb-4">
                    <div className={`${TYPOGRAPHY.sizes.pageTitle.mobile} ${TYPOGRAPHY.weights.bold} text-gray-900 flex items-baseline justify-center`}>
                      <span>$</span>
                      <span className="text-5xl">{isAnnual ? plan.annualPrice : plan.price}</span>
                      <span className={`${TYPOGRAPHY.sizes.body.base} text-gray-600 ml-2`}>{plan.price === 0 ? '' : '/month'}</span>
                    </div>
                    {isAnnual && plan.price > 0 && (
                      <p className={`${TYPOGRAPHY.sizes.caption} text-green-600 mt-1`}>Save {(plan.price - plan.annualPrice) * 12}/year</p>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">✓</div>
                      <span className={`${TYPOGRAPHY.sizes.body.small} text-gray-700`}>
                        {feature.name}
                        {feature.limit ? ` — ${feature.limit}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>

                {selectedPlan === plan.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto">
              <p className={`text-red-700 ${TYPOGRAPHY.sizes.body.base} text-center`}>
                {error}
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-col items-center">
            <p className={`${TYPOGRAPHY.sizes.caption} text-gray-500 mt-3 mb-4 text-center`}>You can change your plan anytime from your dashboard</p>
            <div className="flex gap-4 items-center">
              <Button 
                variant="outline" 
                size="large" 
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="primary" 
                size="large" 
                rightIcon={isLoading ? null : <ArrowRight className="w-4 h-4" />}
                onClick={handleContinue}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating Plan...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={SPACING.section.desktop}>
        <div className={`${SPACING.container.medium} mx-auto`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className={`${TYPOGRAPHY.sizes.sectionTitle.mobile} lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} ${TYPOGRAPHY.weights.bold} text-slate-900 mb-4`}>
              Per-Project Add‑ons
            </h2>
            <p className={`${TYPOGRAPHY.sizes.caption} text-slate-600 mb-5`}>
              Need more for a specific project? Purchase additional resources on-demand.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <div className={`${TYPOGRAPHY.weights.semibold} text-blue-900 mb-2`}>Document Expansion</div>
                <div className="text-blue-700 font-medium mb-2">$8 per pack</div>
                <div className="text-sm text-blue-800 mb-3">5 additional documents for one specific project</div>
                <div className="text-xs text-blue-700">
                  • Choose which project to enhance<br/>
                  • Purchase from any project page<br/>
                  • Available for Free and Builder plans
                </div>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <div className={`${TYPOGRAPHY.weights.semibold} text-green-900 mb-2`}>Image Enhancement</div>
                <div className="text-green-700 font-medium mb-2">$5 per pack</div>
                <div className="text-sm text-green-800 mb-3">10 additional AI-generated images (account-wide)</div>
                <div className="text-xs text-green-700">
                  • Use across all your projects<br/>
                  • High-quality AI-generated images<br/>
                  • Available for all plans
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className={`${TYPOGRAPHY.weights.semibold} text-purple-900 mb-2`}>Enterprise Plan</div>
              <div className="text-sm text-purple-800">
                Includes unlimited access to all documents and images - no additional purchases needed!
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageBackground>

    {/* Downgrade Confirmation Modal */}
    {showDowngradeModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className={`${TYPOGRAPHY.sizes.sectionTitle.mobile} ${TYPOGRAPHY.weights.bold} text-gray-900 mb-2`}>
              Cancel Subscription?
            </h3>
            <p className={`${TYPOGRAPHY.sizes.body.base} text-gray-600 mb-4`}>
              You are about to cancel your {currentUserPlan === 'builder' ? 'Builder' : 'Enterprise'} subscription and return to the Free plan.
            </p>
            <p className={`${TYPOGRAPHY.sizes.body.small} text-gray-500`}>
              {getDowngradeMessage()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCancelDowngrade}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Keep Current Plan
            </button>
            <button
              onClick={handleConfirmDowngrade}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Canceling...
                </>
              ) : (
                'Yes, Cancel Subscription'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    )}
    </>
  )
}

export default UpgradePlan
