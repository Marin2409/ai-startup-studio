import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, Building2, Target, Code, 
  Users, Clock, DollarSign, Wrench, Heart, Rocket
} from 'lucide-react'
import { TYPOGRAPHY, ANIMATIONS } from '../lib/constants'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const CreateProject = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        projectName: '',
        industry: '',
        teamSize: '',
        primaryObjective: '',
        timeline: '',
        budgetRange: '',
        technicalLevel: '',
        needCofounder: false,
        preferredTechStack: '',
        projectDescription: '',
        aiPrompt: ''
    })
    const [errors, setErrors] = useState({})

    // Form options based on database constraints
    const industryOptions = [
        { value: 'saas', label: 'SaaS' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'fintech', label: 'Fintech' },
        { value: 'healthtech', label: 'Healthtech' },
        { value: 'edtech', label: 'Edtech' },
        { value: 'marketplace', label: 'Marketplace' },
        { value: 'social', label: 'Social Network' },
        { value: 'enterprise', label: 'Enterprise' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'other', label: 'Other' }
    ]

    const teamSizeOptions = [
        { value: 'solo', label: 'Solo (Just me)' },
        { value: '2-5', label: '2-5 people' },
        { value: '6-10', label: '6-10 people' },
        { value: '11-25', label: '11-25 people' },
        { value: '25+', label: '25+ people' }
    ]

    const objectiveOptions = [
        { value: 'mvp', label: 'Build MVP' },
        { value: 'funding', label: 'Raise Funding' },
        { value: 'scale', label: 'Scale Business' },
        { value: 'cofounder', label: 'Find Co-founder' },
        { value: 'validate', label: 'Validate Idea' }
    ]

    const timelineOptions = [
        { value: '1-3', label: '1-3 months' },
        { value: '3-6', label: '3-6 months' },
        { value: '6-12', label: '6-12 months' },
        { value: '12+', label: '12+ months' }
    ]

    const budgetOptions = [
        { value: '0-5k', label: '$0 - $5,000' },
        { value: '5k-15k', label: '$5,000 - $15,000' },
        { value: '15k-50k', label: '$15,000 - $50,000' },
        { value: '50k+', label: '$50,000+' }
    ]

    const technicalLevelOptions = [
        { value: 'non-technical', label: 'Non-technical' },
        { value: 'some', label: 'Some technical knowledge' },
        { value: 'technical', label: 'Technical' },
        { value: 'expert', label: 'Expert' }
    ]

    const techStackOptions = [
        { value: 'react-node', label: 'React + Node.js' },
        { value: 'python-django', label: 'Python + Django' },
        { value: 'mobile-first', label: 'Mobile-first (React Native/Flutter)' },
        { value: 'wordpress', label: 'WordPress' },
        { value: 'custom', label: 'Custom/Other' }
    ]

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
        }))
        // Clear error for this field when user starts typing
        if (errors[field]) {
        setErrors(prev => ({
            ...prev,
            [field]: ''
        }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.projectName.trim()) {
        newErrors.projectName = 'Project name is required'
        }
        if (!formData.industry) {
        newErrors.industry = 'Please select an industry'
        }
        if (!formData.teamSize) {
        newErrors.teamSize = 'Please select team size'
        }
        if (!formData.primaryObjective) {
        newErrors.primaryObjective = 'Please select your primary objective'
        }
        if (!formData.timeline) {
        newErrors.timeline = 'Please select a timeline'
        }
        if (!formData.budgetRange) {
        newErrors.budgetRange = 'Please select a budget range'
        }
        if (!formData.technicalLevel) {
        newErrors.technicalLevel = 'Please select your technical level'
        }
        if (!formData.preferredTechStack) {
        newErrors.preferredTechStack = 'Please select a tech stack'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateStep2 = () => {
        const newErrors = {}
        
        if (!formData.aiPrompt.trim()) {
        newErrors.aiPrompt = 'Please provide a description for AI to help create your project'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNextStep = () => {
        if (validateForm()) {
            setCurrentStep(2)
            setErrors({})
        }
    }

    const handlePreviousStep = () => {
        setCurrentStep(1)
        setErrors({})
    }

  const handleSubmit = async () => {
    if (currentStep === 1) {
        handleNextStep()
        return
    }
    
    if (!validateStep2()) return

    setIsLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        navigate('/login')
        return
      }

      const dataToSend = {
        project_name: formData.projectName.trim(),
        industry: formData.industry,
        team_size: formData.teamSize,
        primary_objective: formData.primaryObjective,
        timeline: formData.timeline,
        budget_range: formData.budgetRange,
        technical_level: formData.technicalLevel,
        need_cofounder: formData.needCofounder,
        preferred_tech_stack: formData.preferredTechStack,
        project_description: formData.projectDescription.trim(),
        ai_prompt: formData.aiPrompt.trim()
      }
      
      const response = await fetch(`${API_BASE_URL}/api/user/create-project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        // Redirect to projects page and refresh
        navigate('/dashboard', { 
          state: { 
            projectCreated: true, 
            projectName: data.project.name 
          } 
        })
      } else {
        setErrors({ general: data.message || 'Failed to create project' })
      }
      
    } catch (error) {
      console.error('Create project error:', error)
      setErrors({ general: 'Connection error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${TYPOGRAPHY.sizes.pageTitle.mobile} lg:${TYPOGRAPHY.sizes.pageTitle.desktop} ${TYPOGRAPHY.weights.bold} text-gray-900 mb-4`}>
            Create New Project
          </h1>
          <p className={`${TYPOGRAPHY.sizes.body.large} text-gray-600 max-w-3xl mx-auto`}>
            Tell us about your project to get personalized recommendations and resources
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Project Details</span>
              </div>
              <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">AI Description</span>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {errors.general && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className={`text-red-700 ${TYPOGRAPHY.sizes.body.base} text-center`}>
                {errors.general}
              </p>
            </div>
          )}

          {currentStep === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Project Name */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="Enter your project name"
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.projectName 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                />
                {errors.projectName && (
                  <p className="text-red-600 text-sm mt-1">{errors.projectName}</p>
                )}
              </div>

              {/* Industry */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <Target className="w-4 h-4 inline mr-2" />
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.industry 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                >
                  <option value="">Select industry</option>
                  {industryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-red-600 text-sm mt-1">{errors.industry}</p>
                )}
              </div>

              {/* Team Size */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <Users className="w-4 h-4 inline mr-2" />
                  Team Size *
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.teamSize 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                >
                  <option value="">Select team size</option>
                  {teamSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.teamSize && (
                  <p className="text-red-600 text-sm mt-1">{errors.teamSize}</p>
                )}
              </div>

              {/* Primary Objective */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <Rocket className="w-4 h-4 inline mr-2" />
                  Primary Objective *
                </label>
                <select
                  value={formData.primaryObjective}
                  onChange={(e) => handleInputChange('primaryObjective', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.primaryObjective 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                >
                  <option value="">Select primary objective</option>
                  {objectiveOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.primaryObjective && (
                  <p className="text-red-600 text-sm mt-1">{errors.primaryObjective}</p>
                )}
              </div>

              {/* Timeline */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Timeline *
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.timeline 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.timeline && (
                  <p className="text-red-600 text-sm mt-1">{errors.timeline}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Budget Range */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Budget Range *
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.budgetRange 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.budgetRange && (
                  <p className="text-red-600 text-sm mt-1">{errors.budgetRange}</p>
                )}
              </div>

              {/* Technical Level */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <Wrench className="w-4 h-4 inline mr-2" />
                  Technical Level *
                </label>
                <select
                  value={formData.technicalLevel}
                  onChange={(e) => handleInputChange('technicalLevel', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.technicalLevel 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                >
                  <option value="">Select technical level</option>
                  {technicalLevelOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.technicalLevel && (
                  <p className="text-red-600 text-sm mt-1">{errors.technicalLevel}</p>
                )}
              </div>

              {/* Preferred Tech Stack */}
              <div>
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  <Code className="w-4 h-4 inline mr-2" />
                  Preferred Tech Stack *
                </label>
                <select
                  value={formData.preferredTechStack}
                  onChange={(e) => handleInputChange('preferredTechStack', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                    errors.preferredTechStack 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                >
                  <option value="">Select tech stack</option>
                  {techStackOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.preferredTechStack && (
                  <p className="text-red-600 text-sm mt-1">{errors.preferredTechStack}</p>
                )}
              </div>

              {/* Need Co-founder */}
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needCofounder}
                    onChange={(e) => handleInputChange('needCofounder', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Heart className="w-4 h-4 ml-3 mr-2 text-gray-600" />
                  <span className={`${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                    I'm looking for a co-founder
                  </span>
                </label>
              </div>

              {/* Project Description */}
              <div className="lg:row-span-2">
                <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                  Project Description
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  placeholder="Describe your project, goals, and vision..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">Optional - Help us understand your project better</p>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: AI Description */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className={`${TYPOGRAPHY.sizes.sectionTitle.mobile} lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} ${TYPOGRAPHY.weights.bold} text-gray-900 mb-4`}>
                Help AI Understand Your Project
              </h2>
              <p className={`${TYPOGRAPHY.sizes.body.large} text-gray-600 max-w-2xl mx-auto`}>
                Describe your project in detail to help our AI generate comprehensive project documents, 
                technical specifications, and development roadmap.
              </p>
            </div>

            <div>
              <label className={`block ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.medium} text-gray-700 mb-2`}>
                AI Project Description *
              </label>
              <textarea
                value={formData.aiPrompt}
                onChange={(e) => handleInputChange('aiPrompt', e.target.value)}
                placeholder="Describe your project idea, target audience, key features, technical requirements, business model, and any specific goals or constraints. Be as detailed as possible to help AI generate accurate project documentation..."
                rows={8}
                className={`w-full px-4 py-3 border-2 rounded-xl ${ANIMATIONS.transition} ${
                  errors.aiPrompt 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none resize-none`}
              />
              {errors.aiPrompt && (
                <p className="text-red-600 text-sm mt-1">{errors.aiPrompt}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                This description will be used by AI to generate project documentation, technical specs, and development plans.
              </p>
            </div>

            {/* Project Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className={`${TYPOGRAPHY.sizes.body.large} ${TYPOGRAPHY.weights.semibold} text-gray-900 mb-4`}>
                Project Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Project:</span> {formData.projectName || 'Not specified'}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Industry:</span> {formData.industry ? industryOptions.find(opt => opt.value === formData.industry)?.label : 'Not specified'}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Team Size:</span> {formData.teamSize ? teamSizeOptions.find(opt => opt.value === formData.teamSize)?.label : 'Not specified'}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Objective:</span> {formData.primaryObjective ? objectiveOptions.find(opt => opt.value === formData.primaryObjective)?.label : 'Not specified'}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Timeline:</span> {formData.timeline ? timelineOptions.find(opt => opt.value === formData.timeline)?.label : 'Not specified'}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Budget:</span> {formData.budgetRange ? budgetOptions.find(opt => opt.value === formData.budgetRange)?.label : 'Not specified'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12">
          <button
            onClick={currentStep === 1 ? () => navigate('/dashboard') : handlePreviousStep}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors cursor-pointer"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-8 py-3 rounded-xl cursor-pointer ${TYPOGRAPHY.weights.semibold} text-white ${ANIMATIONS.transition} ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Creating Project...
              </div>
            ) : currentStep === 1 ? (
              <div className="flex items-center">
                Next
                <ArrowRight className="w-5 h-5 ml-3" />
              </div>
            ) : (
              <div className="flex items-center">
                Create Project
                <ArrowRight className="w-5 h-5 ml-3" />
              </div>
            )}
          </button>
        </div>
        </div>
      </div>
  )
}

export default CreateProject