import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  AlertCircle, 
  Package,
  Check,
  Sparkles,
  Database,
  Code,
  Star,
  ArrowRight,
  X,
  Zap,
  Image,
  FileText
} from 'lucide-react'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const Billing = () => {
  const navigate = useNavigate()
  const [userBilling, setUserBilling] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)
  const [isPurchasingPayAsYouGo, setIsPurchasingPayAsYouGo] = useState(false)

  useEffect(() => {
    fetchUserBilling()
  }, [])

  const fetchUserBilling = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      if (response.ok && data.success) {
        setUserBilling(data.user)
      } else {
        setError(data.message || 'Failed to fetch billing information')
      }
    } catch (error) {
      console.error('Error fetching billing:', error)
      setError('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePlan = () => {
    console.log('Changing subscription plan button clicked')
    navigate('/upgrade-plan')
  }

  const handlePurchaseAddon = async (packageType) => {
    setIsPurchasing(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/user/purchase-addon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ packageType })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        alert(data.message)
        // Refresh billing info
        await fetchUserBilling()
      } else {
        alert(data.message || 'Failed to purchase package')
      }
    } catch (error) {
      console.error('Error purchasing addon:', error)
      alert('Connection error. Please try again.')
    } finally {
      setIsPurchasing(false)
    }
  }

  const navigateToProjects = () => {
    // Since document purchases are project-specific, direct users to their projects
    window.location.href = '/dashboard'
  }

  const handleCancelSubscription = async () => {
    // Confirmation dialog
    const planName = currentPlan === 'builder' ? 'Builder' : 'Enterprise'
    const message = currentPlan === 'enterprise' 
      ? `Are you sure you want to cancel your ${planName} subscription? You will lose access to all add-on packages and need to repurchase them if you upgrade again.`
      : `Are you sure you want to cancel your ${planName} subscription? You will keep any add-on packages you've purchased.`
    
    if (!confirm(message)) {
      return
    }

    setIsCanceling(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/user/cancel-subscription`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        alert(data.message)
        // Update localStorage with new billing info
        const userData = JSON.parse(localStorage.getItem('user'))
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          billing: data.billing
        }))
        // Refresh billing info
        await fetchUserBilling()
      } else {
        alert(data.message || 'Failed to cancel subscription')
      }
    } catch (error) {
      console.error('Error canceling subscription:', error)
      alert('Connection error. Please try again.')
    } finally {
      setIsCanceling(false)
    }
  }

  if (isLoading) {
    return <div className="billing-loading">Loading billing information...</div>
  }

  if (error) {
    return <div className="billing-error">Error: {error}</div>
  }

  if (!userBilling) {
    return <div className="billing-loading">No billing information available</div>
  }

  const currentPlan = userBilling?.billing?.selected_plan || 'free'
  
  // Now guaranteed to be a valid array due to database constraints
  const currentAddOns = userBilling?.billing?.add_ons || []

  // Per-project add-on options (available for Free and Builder plans)
  const projectAddOns = [
    {
      type: "images",
      name: "Image Pack",
      price: 5,
      quantity: 10,
      description: "10 more AI-generated images/icons for any project",
      icon: <Image className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      type: "documents",
      name: "Document Pack",
      price: 8,
      quantity: 5,
      description: "5 additional documents for a specific project",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      type: "bundle",
      name: "Project Booster",
      price: 12,
      quantity: "10 images + 5 documents",
      description: "Complete project enhancement package",
      savings: "$1 savings",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <div>
        <div className="billing-header">
          <h1 className="billing-title">Billing</h1>
        </div>

        <div className="billing-sections">
          {/* Subscription Plan Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Subscription Plan</h2>
              <p className="section-description">
                Each organization has it's own subscription plan, billing cycle, payment 
                methods and usage quotas.
              </p>
            </div>
            <div className="section-right">
              <div className="subscription-card">
                <div className="subscription-header">
                  <span className="plan-name">
                    {currentPlan === 'free' ? 'Free Plan' :
                     currentPlan === 'builder' ? 'Builder Plan' :
                     currentPlan === 'enterprise' ? 'Enterprise Plan' : 'Unknown Plan'}
                  </span>
                  <div className="flex gap-2">
                    <button className="change-plan-btn" onClick={handleChangePlan}>
                      Change subscription plan
                    </button>
                    {currentPlan !== 'free' && (
                      <button 
                        className="cancel-subscription-btn" 
                        onClick={handleCancelSubscription}
                        disabled={isCanceling}
                      >
                        {isCanceling ? (
                          <>
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                            Canceling...
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            Cancel subscription
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="usage-warning">
                  <div className="warning-icon">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="warning-content">
                    <h3 className="warning-title">This organization is limited by the included usage</h3>
                    <p className="warning-description">
                      Projects may become unresponsive when this organization exceeds its included usage 
                      quota. To scale seamlessly, upgrade to a paid plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add-on Package Section */}
          <div className="billing-section">
            <div className="section-left">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Add-on Packages</h2>
                  <p className="text-sm text-gray-500">Enhance your capabilities</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Supercharge your projects with specialized document packages. Each add-on unlocks powerful features tailored to your development needs.
              </p>
            </div>
            <div className="section-right">
              <div className="space-y-4">
                {/* Render different packages based on current plan */}
                {currentPlan === 'enterprise' ? (
                  // Enterprise plan - all packages included
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-200 p-8">
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="w-4 h-4" />
                        Premium
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-emerald-100">
                        <Package className="w-8 h-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">All Packages Included</h3>
                        <p className="text-gray-600 mb-4">
                          Your Enterprise plan includes access to all add-on packages at no additional cost. Enjoy unlimited access to every document type and feature.
                        </p>
                        <div className="flex items-center gap-2 text-emerald-700 font-medium">
                          <Check className="w-5 h-5" />
                          <span>Full access activated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Free and Builder plans - show available packages
                  <div className="grid gap-6">
                    {/* Coder Package - Only for Free plan */}
                    {currentPlan === 'free' && (
                      <div className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                        currentAddOns.includes('coder_package') 
                          ? 'border-blue-200 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}>
                        {currentAddOns.includes('coder_package') && (
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Check className="w-4 h-4" />
                              Owned
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                              <Code className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">Coder Package</h3>
                                <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full">
                                  $8
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-4">
                                Complete tech stack documentation for developers
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-6">
                            <div className="text-sm font-medium text-gray-900 mb-2">What's included:</div>
                            <div className="grid grid-cols-2 gap-2">
                              {['Frontend Architecture', 'Backend Systems', 'UI/UX Guidelines', 'Deployment Docs', 'Database Schema', 'Table Structures'].map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-100">
                            {currentAddOns.includes('coder_package') ? (
                              <div className="flex items-center justify-center gap-2 py-3 text-blue-700 font-medium">
                                <Check className="w-5 h-5" />
                                <span>Package Owned</span>
                              </div>
                            ) : (
                              <button 
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                                onClick={() => handlePurchaseAddon('coder_package')}
                                disabled={isPurchasing}
                              >
                                {isPurchasing ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Purchasing...</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Purchase Package</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Database Package - For Free and Builder plans */}
                    {(currentPlan === 'free' || currentPlan === 'builder') && (
                      (() => {
                        // For Free plan: disable if user has Coder Package (since it includes database docs)
                        const isIncludedInCoderPackage = currentPlan === 'free' && currentAddOns.includes('coder_package')
                        const isOwned = currentAddOns.includes('database_package')
                        
                        return (
                          <div className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                            isIncludedInCoderPackage 
                              ? 'border-green-200 bg-green-50'
                              : isOwned 
                              ? 'border-purple-200 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg hover:scale-[1.02]'
                          }`}>
                            {/* Status badges */}
                            {isIncludedInCoderPackage && (
                              <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                  <Check className="w-4 h-4" />
                                  Included in Coder Package
                                </div>
                              </div>
                            )}
                            {isOwned && !isIncludedInCoderPackage && (
                              <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                  <Check className="w-4 h-4" />
                                  Owned
                                </div>
                              </div>
                            )}
                            
                            <div className="p-6">
                              <div className="flex items-start gap-4 mb-4">
                                <div className={`p-3 rounded-xl transition-colors ${
                                  isIncludedInCoderPackage 
                                    ? 'bg-green-100' 
                                    : 'bg-purple-100 group-hover:bg-purple-200'
                                }`}>
                                  <Database className={`w-6 h-6 ${
                                    isIncludedInCoderPackage ? 'text-green-600' : 'text-purple-600'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">Database Package</h3>
                                    <div className={`px-3 py-1 text-sm font-bold rounded-full ${
                                      isIncludedInCoderPackage 
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                    }`}>
                                      {isIncludedInCoderPackage ? 'Included' : '$4'}
                                    </div>
                                  </div>
                                  <p className="text-gray-600 text-sm mb-4">
                                    {isIncludedInCoderPackage 
                                      ? 'Already included in your Coder Package purchase'
                                      : 'Professional database design and architecture'
                                    }
                                  </p>
                                </div>
                              </div>
                              
                              <div className="space-y-3 mb-6">
                                <div className="text-sm font-medium text-gray-900 mb-2">What's included:</div>
                                <div className="grid grid-cols-1 gap-2">
                                  {['Database Schema Design', 'Table Structures & Relationships', 'Indexing Strategies', 'Query Optimization'].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                      <div className={`w-1.5 h-1.5 rounded-full ${
                                        isIncludedInCoderPackage ? 'bg-green-500' : 'bg-purple-500'
                                      }`}></div>
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-4 border-t border-gray-100">
                                {isIncludedInCoderPackage ? (
                                  <div className="flex items-center justify-center gap-2 py-3 text-green-700 font-medium">
                                    <Check className="w-5 h-5" />
                                    <span>Included in Coder Package</span>
                                  </div>
                                ) : isOwned ? (
                                  <div className="flex items-center justify-center gap-2 py-3 text-purple-700 font-medium">
                                    <Check className="w-5 h-5" />
                                    <span>Package Owned</span>
                                  </div>
                                ) : (
                                  <button 
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                                    onClick={() => handlePurchaseAddon('database_package')}
                                    disabled={isPurchasing}
                                  >
                                    {isPurchasing ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Purchasing...</span>
                                      </>
                                    ) : (
                                      <>
                                        <span>Purchase Package</span>
                                        <ArrowRight className="w-4 h-4" />
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })()
                    )}

                    {/* Builder plan message for Coder Package */}
                    {currentPlan === 'builder' && (
                      <div className="relative overflow-hidden rounded-2xl border-2 border-green-200 bg-green-50">
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            <Star className="w-4 h-4" />
                            Included
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-green-100">
                              <Code className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">Coder Package</h3>
                                <div className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                                  Included
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-4">
                                Already included in your Builder plan at no additional cost
                              </p>
                              <div className="flex items-center gap-2 text-green-700 font-medium">
                                <Check className="w-5 h-5" />
                                <span>Tech Stack Documentation Active</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Per-Project Purchases Section */}
          <div className="billing-section">
            <div className="section-left">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Per-Project Add-Ons</h2>
                  <p className="text-sm text-gray-500">Enhance specific projects as needed</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Need more documents or images for a specific project? Purchase exactly what you need, when you need it. Each purchase applies to one project of your choice.
              </p>
            </div>
            <div className="section-right">
              {currentPlan === 'enterprise' ? (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-200 p-8">
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Star className="w-4 h-4" />
                      Premium
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-100">
                      <Package className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">All Features Included</h3>
                      <p className="text-gray-600 mb-4">
                        Your Enterprise plan includes unlimited access to all documents and images. No additional purchases needed.
                      </p>
                      <div className="flex items-center gap-2 text-emerald-700 font-medium">
                        <Check className="w-5 h-5" />
                        <span>Unlimited project enhancements</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">How Project Add-Ons Work</h3>
                        <p className="text-blue-700 text-sm">Purchase additional resources for specific projects</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>Each purchase applies to one project of your choice</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>Go to any project to purchase additional documents</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>Image packs can be used across all your projects</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={navigateToProjects}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                    >
                      <Package className="w-5 h-5" />
                      <span>View My Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-gray-500 text-sm mt-3">
                      Purchase additional documents and images from any project page
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Billing
