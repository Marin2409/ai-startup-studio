import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// ----------------------------------
// UI COMPONENTS & ASSETS
// ----------------------------------
import { assets } from '../assets/assets'
import { Eye, EyeOff, Zap, Users, Star, ArrowRight, X, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import PageBackground from '../components/ui/PageBackground'
import { TYPOGRAPHY, ANIMATIONS } from '../lib/constants'

// ----------------------------------
// API BASE URL
// ----------------------------------
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState('') // '', 'loading', 'success', 'error'
  const [forgotPasswordError, setForgotPasswordError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the referring page from location state, default to dashboard after login
  const fromPage = location.state?.from || '/dashboard'

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // Signup specific validations
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required'
      }
      
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required'
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const endpoint = isLogin ? '/api/user/login' : '/api/user/register'
      const payload = isLogin 
        ? {
            email: formData.email,
            password: formData.password
          }
        : {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            company: formData.company,
            password_hash: formData.password
          }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        // Store the JWT token and user data
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        console.log('Success:', data.message)

        // Redirect to dashboard for existing users, pricing checkout for new users
        if (isLogin) {
          navigate('/dashboard')
        } else {
          navigate('/pricing-onboarding')
        }
      } else {
        // Handle backend error messages
        setErrors({ general: data.message || 'Authentication failed' })
      }
      
    } catch (error) {
      console.error('Auth error:', error)
      setErrors({ general: 'Connection error. Please check your internet connection.' })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setShowPassword(false)
    setShowConfirmPassword(false)
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      company: ''
    })
    setErrors({})
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleForgotPasswordOpen = () => {
    setShowForgotPasswordModal(true)
    setForgotPasswordEmail('')
    setForgotPasswordStatus('')
    setForgotPasswordError('')
  }

  const handleForgotPasswordClose = () => {
    setShowForgotPasswordModal(false)
    setForgotPasswordEmail('')
    setForgotPasswordStatus('')
    setForgotPasswordError('')
  }

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault()
    
    // Validate email
    if (!forgotPasswordEmail) {
      setForgotPasswordError('Email is required')
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setForgotPasswordError('Please enter a valid email address')
      return
    }

    setForgotPasswordStatus('loading')
    setForgotPasswordError('')

    // Simulate API call for password reset
    setTimeout(() => {
      // For demo purposes, always show success
      setForgotPasswordStatus('success')
      
      // Auto close after 3 seconds
      setTimeout(() => {
        handleForgotPasswordClose()
      }, 3000)
    }, 2000)
  }

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Generate business plans in minutes"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "10,000+ Users",
      description: "Join successful entrepreneurs"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "AI Powered",
      description: "Advanced AI technology"
    }
  ]

  return (
    <PageBackground variant="light" className="flex items-center justify-center p-4 min-h-screen">
      
      {/* Main Container */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid lg:grid-cols-2 min-h-[580px]">
            
            {/* Left Side - Enhanced Branding */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 lg:p-8 flex flex-col justify-center items-center text-white overflow-hidden">
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/15 rounded-full blur-lg animate-pulse delay-1000"></div>
              </div>
              
              {/* Main Content */}
              <div className="relative z-10 text-center max-w-md">
                
                {/* Logo Section */}
                <div className="mb-6">
                  <button 
                    onClick={handleLogoClick}
                    className="group w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border-2 border-white/20 p-3 hover:bg-white/20 hover:scale-110 hover:border-white/40 transition-all duration-500 cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/30"
                  >
                    <img 
                      src={assets.logo} 
                      alt="AI Startup Studio Logo" 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                  
                  <h1 className={`
                    ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
                    lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
                    ${TYPOGRAPHY.weights.bold} 
                    mt-4 mb-2 text-white
                  `}>
                    AI Startup Studio
                  </h1>
                  
                  <p className={`
                    ${TYPOGRAPHY.sizes.body.large} 
                    text-white/90 mb-6 leading-relaxed
                  `}>
                    {isLogin 
                      ? 'Welcome back to the future of startup creation' 
                      : 'Join thousands building successful startups with AI'
                    }
                  </p>
                </div>
                
                {/* Enhanced Features Grid */}
                <div className="space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div className="text-left">
                        <h3 className={`${TYPOGRAPHY.weights.semibold} text-white mb-1`}>
                          {feature.title}
                        </h3>
                        <p className={`${TYPOGRAPHY.sizes.caption} text-white/80`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Success Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <div className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-white`}>10K+</div>
                    <div className={`${TYPOGRAPHY.sizes.tiny} text-white/80`}>Users</div>
                  </div>
                  <div className="text-center border-l border-r border-white/30">
                    <div className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-white`}>2.5K+</div>
                    <div className={`${TYPOGRAPHY.sizes.tiny} text-white/80`}>Plans</div>
                  </div>
                  <div className="text-center">
                    <div className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-white`}>98%</div>
                    <div className={`${TYPOGRAPHY.sizes.tiny} text-white/80`}>Success</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-6 lg:p-8 flex flex-col justify-center min-h-[580px]">
              <div className="max-w-md mx-auto w-full">
                
                {/* Form Header */}
                <div className="text-center mb-6">
                  <h2 className={`
                    ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
                    ${TYPOGRAPHY.weights.bold} 
                    text-gray-900 mb-2
                  `}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className={`text-gray-600 ${TYPOGRAPHY.sizes.body.base}`}>
                    {isLogin 
                      ? 'Welcome back! Please enter your details.' 
                      : 'Fill in your information to get started.'
                    }
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className={`${isLogin ? 'space-y-6' : 'space-y-4'}`}>
                  
                  {/* Name Fields - Only for signup */}
                  {!isLogin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ANIMATIONS.transition} ${
                            errors.firstName 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className={`text-red-500 ${TYPOGRAPHY.sizes.caption}`}>{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="lastName" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ANIMATIONS.transition} ${
                            errors.lastName 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className={`text-red-500 ${TYPOGRAPHY.sizes.caption}`}>{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ANIMATIONS.transition} ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className={`text-red-500 ${TYPOGRAPHY.sizes.caption}`}>{errors.email}</p>
                    )}
                  </div>

                  {/* Company - Only for signup */}
                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="company" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ANIMATIONS.transition}`}
                        placeholder="Enter your company name"
                      />
                    </div>
                  )}

                  {/* Password Fields */}
                  <div className={`${!isLogin ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`}>
                    <div className="space-y-2">
                      <label htmlFor="password" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-12 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ANIMATIONS.transition} ${
                            errors.password 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="Enter your password"
                        />
                        {!isLogin && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-blue-500 transition-colors duration-200"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        )}
                      </div>
                      {errors.password && (
                        <p className={`text-red-500 ${TYPOGRAPHY.sizes.caption}`}>{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password - Only for signup */}
                    {!isLogin && (
                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ANIMATIONS.transition} ${
                              errors.confirmPassword 
                                ? 'border-red-300 focus:border-red-500' 
                                : 'border-gray-200 focus:border-blue-500'
                            }`}
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-blue-500 transition-colors duration-200"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className={`text-red-500 ${TYPOGRAPHY.sizes.caption}`}>{errors.confirmPassword}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Forgot Password - Only for login */}
                  {isLogin && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={handleForgotPasswordOpen}
                        className={`${TYPOGRAPHY.sizes.caption} text-blue-600 hover:text-blue-800 ${TYPOGRAPHY.weights.medium} cursor-pointer ${ANIMATIONS.transition}`}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-xl ${TYPOGRAPHY.weights.semibold} text-white ${ANIMATIONS.transition} cursor-pointer ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </button>

                  {/* General Error Display */}
                  {errors.general && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className={`text-red-700 ${TYPOGRAPHY.sizes.body.base}`}>
                          {errors.general}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Toggle Mode */}
                  <div className="text-center">
                    <p className={`text-gray-600 ${TYPOGRAPHY.sizes.body.base}`}>
                      {isLogin ? "Don't have an account?" : 'Already have an account?'}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className={`ml-1 text-blue-600 hover:text-blue-800 ${TYPOGRAPHY.weights.medium} cursor-pointer ${ANIMATIONS.transition}`}
                      >
                        {isLogin ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>

                  {/* Back to Previous Page */}
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => navigate(fromPage)}
                      className={`${TYPOGRAPHY.sizes.caption} text-gray-500 hover:text-gray-700 ${TYPOGRAPHY.weights.medium} cursor-pointer ${ANIMATIONS.transition}`}
                    >
                      ← Back to {fromPage === '/' ? 'Home' : fromPage.charAt(1).toUpperCase() + fromPage.slice(2)}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleForgotPasswordClose}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-gray-900`}>
                    Reset Password
                  </h3>
                  <p className={`${TYPOGRAPHY.sizes.caption} text-gray-500 mt-1`}>
                    We'll send you a reset link
                  </p>
                </div>
              </div>
              <button
                onClick={handleForgotPasswordClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {forgotPasswordStatus === 'success' ? (
                // Success State
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className={`${TYPOGRAPHY.sizes.body.large} ${TYPOGRAPHY.weights.semibold} text-gray-900 mb-2`}>
                    Email Sent Successfully!
                  </h4>
                  <p className={`${TYPOGRAPHY.sizes.body.base} text-gray-600 mb-4`}>
                    We've sent a password reset link to <strong>{forgotPasswordEmail}</strong>
                  </p>
                  <p className={`${TYPOGRAPHY.sizes.caption} text-gray-500`}>
                    Check your inbox and follow the instructions to reset your password.
                  </p>
                </div>
              ) : (
                // Form State
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <p className={`${TYPOGRAPHY.sizes.body.base} text-gray-600 mb-4`}>
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                    
                    <div className="space-y-2">
                      <label htmlFor="forgot-email" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-gray-700`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="forgot-email"
                        value={forgotPasswordEmail}
                        onChange={(e) => {
                          setForgotPasswordEmail(e.target.value)
                          setForgotPasswordError('')
                        }}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ANIMATIONS.transition} ${
                          forgotPasswordError 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="Enter your email address"
                        disabled={forgotPasswordStatus === 'loading'}
                      />
                      {forgotPasswordError && (
                        <div className="flex items-center space-x-2 mt-2">
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <p className={`text-red-500 ${TYPOGRAPHY.sizes.caption}`}>
                            {forgotPasswordError}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleForgotPasswordClose}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 ${TYPOGRAPHY.weights.medium} hover:bg-gray-50 hover:border-gray-300 ${ANIMATIONS.transition} ${
                        forgotPasswordStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      disabled={forgotPasswordStatus === 'loading'}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={forgotPasswordStatus === 'loading'}
                      className={`flex-1 py-3 px-4 rounded-xl ${TYPOGRAPHY.weights.semibold} text-white ${ANIMATIONS.transition} ${
                        forgotPasswordStatus === 'loading'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105 cursor-pointer'
                      }`}
                    >
                      {forgotPasswordStatus === 'loading' ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </PageBackground>
  )
}

export default Login
