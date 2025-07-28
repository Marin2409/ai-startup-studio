import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Building2, Target, Code, 
  ArrowRight, ArrowLeft, Check, Star,
  Rocket, TrendingUp, Heart, Shield, Zap
} from 'lucide-react'
import PageBackground from './ui/PageBackground'
import { TYPOGRAPHY, ANIMATIONS } from '../lib/constants'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const Onboarding = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Plan Selection
    selectedPlan: 'free',
    billingCycle: 'monthly',
    addOns: []
  })
  const [errors, setErrors] = useState({})

  // Only plans array needed for pricing selection

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '1 Active Project',
        'Basic AI Templates',
        'Community Support',
        'Standard Analytics'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 29,
      description: 'For growing startups',
      features: [
        '5 Active Projects',
        'Advanced AI Tools',
        'Priority Support',
        'Advanced Analytics',
        'Team Collaboration',
        'Custom Integrations'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      description: 'For established companies',
      features: [
        'Unlimited Projects',
        'Custom AI Models',
        'Dedicated Support',
        'White-label Solution',
        'Advanced Security',
        'API Access'
      ]
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Only validate pricing plan selection
    if (!formData.selectedPlan) {
      newErrors.selectedPlan = 'Please select a plan'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleComplete = async () => {
    // Validate form before submitting
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      // Send pricing selection data
      const dataToSend = {
        selectedPlan: formData.selectedPlan,
        billingCycle: formData.billingCycle,
        addOns: formData.addOns,
        onboardingCompleted: true
      }
      
      const response = await fetch(`${API_BASE_URL}/api/user/complete-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        const userData = JSON.parse(localStorage.getItem('user'))
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          ...data.user,
          onboardingCompleted: true
        }))
        
        navigate('/dashboard')
      } else {
        setErrors({ general: data.message || 'Failed to complete onboarding' })
      }
      
    } catch (error) {
      console.error('Onboarding error:', error)
      setErrors({ general: 'Connection error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // No renderStepContent needed - direct pricing UI

  return (
    <PageBackground variant="light" className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${TYPOGRAPHY.sizes.pageTitle.mobile} lg:${TYPOGRAPHY.sizes.pageTitle.desktop} ${TYPOGRAPHY.weights.bold} text-gray-900 mb-4`}>
            Choose Your Plan
          </h1>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-2xl p-1.5 shadow-inner">
            {[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual', badge: 'Save 20%' }
            ].map((cycle) => (
              <button
                key={cycle.value}
                type="button"
                onClick={() => handleInputChange('billingCycle', cycle.value)}
                className={`relative px-6 py-3 rounded-xl ${TYPOGRAPHY.weights.medium} ${ANIMATIONS.transition} ${
                  formData.billingCycle === cycle.value
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {cycle.label}
                {cycle.badge && formData.billingCycle === cycle.value && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {cycle.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handleInputChange('selectedPlan', plan.id)}
              className={`relative p-8 rounded-3xl border-2 cursor-pointer ${ANIMATIONS.transition} ${
                formData.selectedPlan === plan.id
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
              
              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className={`${TYPOGRAPHY.sizes.sectionTitle.mobile} ${TYPOGRAPHY.weights.bold} text-gray-900 mb-2`}>
                  {plan.name}
                </h3>
                <p className={`${TYPOGRAPHY.sizes.body.base} text-gray-600 mb-4`}>
                  {plan.description}
                </p>
                <div className="mb-4">
                  <div className={`${TYPOGRAPHY.sizes.pageTitle.mobile} ${TYPOGRAPHY.weights.bold} text-gray-900 flex items-baseline justify-center`}>
                    <span>$</span>
                    <span className="text-5xl">
                      {formData.billingCycle === 'annual' ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className={`${TYPOGRAPHY.sizes.body.base} text-gray-600 ml-2`}>
                      /month
                    </span>
                  </div>
                  {formData.billingCycle === 'annual' && plan.price > 0 && (
                    <p className={`${TYPOGRAPHY.sizes.caption} text-green-600 mt-1`}>
                      Save ${Math.round(plan.price * 12 * 0.2)} per year
                    </p>
                  )}
                </div>
              </div>
              
              {/* Features List */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className={`${TYPOGRAPHY.sizes.body.small} text-gray-700`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Selection Indicator */}
              {formData.selectedPlan === plan.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Error Display */}
        {errors.general && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto">
            <p className={`text-red-700 ${TYPOGRAPHY.sizes.body.base} text-center`}>
              {errors.general}
            </p>
          </div>
        )}

        {/* Plan Selection Error */}
        {errors.selectedPlan && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto">
            <p className={`text-red-700 ${TYPOGRAPHY.sizes.body.base} text-center`}>
              {errors.selectedPlan}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleComplete}
            disabled={isLoading}
            className={`inline-flex items-center px-12 py-4 rounded-2xl ${TYPOGRAPHY.weights.semibold} text-white ${ANIMATIONS.transition} ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Setting up your account...
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-3" />
              </>
            )}
          </button>
          <p className={`${TYPOGRAPHY.sizes.caption} text-gray-500 mt-4`}>
            You can change your plan anytime from your dashboard
          </p>
        </div>
      </div>
    </PageBackground>
  )
}

export default Onboarding