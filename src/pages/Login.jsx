import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
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
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the referring page from location state, default to home
  const fromPage = location.state?.from || '/'

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
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, just navigate to home
      navigate('/')
    }, 2000)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDQiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-30"></div>
      
      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[700px]">
            
            {/* Left Side - Branding */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
              
              {/* Logo */}
              <div className="relative z-10 text-center">
                <button 
                  onClick={handleLogoClick}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8 mx-auto backdrop-blur-sm border border-white/30 p-3 hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <img 
                    src={assets.logo} 
                    alt="AI Startup Studio Logo" 
                    className="w-full h-full object-contain"
                  />
                </button>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Welcome Back
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/90 mb-8">
                  {isLogin ? 'Sign in to your account' : 'Create your account'}
                </p>
                
                <div className="space-y-4 text-white/80">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <span>AI Powered</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <span>Lightning Fast</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                    </div>
                    <span>Join 10,000+ Users</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center min-h-[700px]">
              <div className="max-w-md mx-auto w-full">
                
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className="text-gray-600">
                    {isLogin 
                      ? 'Welcome back! Please enter your details.' 
                      : 'Fill in your information to get started.'
                    }
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className={`${isLogin ? 'space-y-8' : 'space-y-6'}`}>
                  
                  {/* Name Fields - Only for signup */}
                  {!isLogin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                            errors.firstName 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                            errors.lastName 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Company - Only for signup */}
                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="Enter your company name"
                      />
                    </div>
                  )}

                  {/* Password Fields */}
                  <div className={`${!isLogin ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`}>
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          errors.password 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password - Only for signup */}
                    {!isLogin && (
                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                            errors.confirmPassword 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Forgot Password - Only for login */}
                  {isLogin && (
                    <div className="text-right">
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      isLogin ? 'Sign In' : 'Create Account'
                    )}
                  </button>

                  {/* Toggle Mode */}
                  <div className="text-center">
                    <p className="text-gray-600">
                      {isLogin ? "Don't have an account?" : 'Already have an account?'}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="ml-1 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
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
                      className="text-sm text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
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
    </div>
  )
}

export default Login
