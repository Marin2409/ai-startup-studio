import React, { useState } from 'react'
import { 
  Users, 
  CheckCircle, 
  FileText,
  BarChart3,
  Settings,
  Plus,
  ShoppingCart,
  Package,
  Zap,
  Image
} from 'lucide-react'
import { TYPOGRAPHY } from '../lib/constants'
import { useNavigate } from 'react-router-dom'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

// Project Overview Component
const ProjectOverview = ({ project }) => {
  const navigate = useNavigate()
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isPurchasingImages, setIsPurchasingImages] = useState(false)
  const [imageCredits, setImageCredits] = useState(0)
  
  // Fetch user's image credits on component mount
  React.useEffect(() => {
    const fetchImageCredits = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        const data = await response.json()
        if (response.ok && data.success) {
          setImageCredits(data.user.billing?.image_credits || 0)
        }
      } catch (error) {
        console.error('Error fetching image credits:', error)
      }
    }
    
    fetchImageCredits()
  }, [])
  
  if (!project) {
    return (
      <div className="project-overview">
        <div className="project-not-found">
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist or you don't have access to it.</p>
        </div>
      </div>
    )
  }

  const quickActions = [
    { label: 'View Analytics', icon: BarChart3, color: 'blue' },
    { label: 'Manage Tasks', icon: CheckCircle, color: 'green' },
    { label: 'Team Overview', icon: Users, color: 'purple' },
    { label: 'Documents', icon: FileText, color: 'orange' },
    { label: 'Settings', icon: Settings, color: 'gray' },
    { label: 'Add Update', icon: Plus, color: 'blue' }
  ]

  // Document usage / limits - Use project data directly
  const subscription = (project?.subscription || 'free').toLowerCase()
  const baseDocs = project?.baseDocuments || 6
  const purchasedDocs = project?.purchasedDocuments || 0
  const totalDocs = project?.totalDocuments || baseDocs + purchasedDocs
  const usedDocs = project?.usedDocuments || 0
  const usedPercent = Math.min(100, Math.round((usedDocs / totalDocs) * 100))
  
  // For progress bar visualization
  const DOC_LIMITS = { free: 6, builder: 16, enterprise: 32 }
  
  // Segment widths relative to Enterprise max (32)
  const maxEnterprise = DOC_LIMITS.enterprise
  const freeWidth = (DOC_LIMITS.free / maxEnterprise) * 100
  const builderWidth = ((DOC_LIMITS.builder - DOC_LIMITS.free) / maxEnterprise) * 100
  const enterpriseWidth = ((DOC_LIMITS.enterprise - DOC_LIMITS.builder) / maxEnterprise) * 100

  //Handle upgrade plan
  const handleUpgradePlan = () => {
    navigate('/upgrade-plan')
  }

  // Handle document purchase for current project
  const handlePurchaseDocuments = async (quantity = 5) => {
    setIsPurchasing(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/user/projects/${project.id}/purchase-documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        alert(`Successfully purchased ${quantity} additional documents for this project!`)
        // Refresh the page or update project data
        window.location.reload()
      } else {
        alert(data.message || 'Failed to purchase documents')
      }
    } catch (error) {
      console.error('Error purchasing documents:', error)
      alert('Connection error. Please try again.')
    } finally {
      setIsPurchasing(false)
    }
  }

  // Handle image purchase for account (account-wide)
  const handlePurchaseImages = async (quantity = 10) => {
    setIsPurchasingImages(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/user/purchase-images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        alert(`Successfully purchased ${quantity} additional images for your account!`)
        // Update image credits locally
        setImageCredits(data.purchase.new_credits)
        // Refresh the page to update all data
        window.location.reload()
      } else {
        alert(data.message || 'Failed to purchase images')
      }
    } catch (error) {
      console.error('Error purchasing images:', error)
      alert('Connection error. Please try again.')
    } finally {
      setIsPurchasingImages(false)
    }
  }

  return (
    <div>
      {/* Header Section */}
      <div className="project-overview-header">
        <div className="project-info">
          <h1 className="project-title">{project.name}</h1>
          <p className="project-description">{project.description}</p>
        </div>
      </div>

      {/* Document Usage Progress Bar (polished) */}
      <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className={`${TYPOGRAPHY.sizes.body.large} ${TYPOGRAPHY.weights.semibold} text-slate-900`}>
              {subscription === 'enterprise' ? 'Complete Business Plan Access' : 'Expand your business plan'}
            </h3>
            <div className={`text-slate-500 ${TYPOGRAPHY.sizes.caption}`}>
              {usedDocs}/{totalDocs} documents available
              {purchasedDocs > 0 && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  +{purchasedDocs} purchased
                </span>
              )}
              <br />
              <span className="flex items-center gap-1 mt-1">
                <Image className="w-3 h-3" />
                {imageCredits} image credits available
              </span>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
            {subscription !== 'enterprise' && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePurchaseDocuments(5)}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Purchasing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      +5 Documents ($8)
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePurchaseImages(10)}
                  disabled={isPurchasingImages}
                >
                  {isPurchasingImages ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Purchasing...
                    </>
                  ) : (
                    <>
                      <Image className="w-4 h-4" />
                      +10 Images ($5)
                    </>
                  )}
                </button>
              </>
            )}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all cursor-pointer"
              onClick={handleUpgradePlan}
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
            {/* plan segments (background) */}
            <div className="absolute inset-y-0 left-0 bg-emerald-500/70" style={{ width: `${freeWidth}%` }}></div>
            <div className="absolute inset-y-0" style={{ left: `${freeWidth}%`, width: `${builderWidth}%`, background: 'rgba(168, 85, 247, 0.25)' }}></div>
            <div className="absolute inset-y-0" style={{ left: `${freeWidth + builderWidth}%`, width: `${enterpriseWidth}%`, background: 'rgba(168, 85, 247, 0.35)' }}></div>
            {/* free breakpoint divider */}
            <div className="absolute top-0 bottom-0" style={{ left: `${freeWidth}%` }}>
              <div className="h-full w-px border-l border-dashed border-slate-300"></div>
            </div>
            {/* usage fill */}
            <div className="relative z-10 h-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${usedPercent}%` }}></div>
            {/* purchased documents indicator */}
            {purchasedDocs > 0 && (
              <div className="absolute top-0 h-full bg-blue-500/30 border-l-2 border-blue-500" 
                   style={{ 
                     left: `${(baseDocs / maxEnterprise) * 100}%`,
                     width: `${(purchasedDocs / maxEnterprise) * 100}%`
                   }}>
              </div>
            )}
          </div>

          {/* labels */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-600">
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span className={`${TYPOGRAPHY.sizes.tiny}`}>Free ({DOC_LIMITS.free} docs)</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400/70"></span>
              <span className={`${TYPOGRAPHY.sizes.tiny}`}>Builder ({DOC_LIMITS.builder} docs)</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500/80"></span>
              <span className={`${TYPOGRAPHY.sizes.tiny}`}>Enterprise ({DOC_LIMITS.enterprise} docs)</span>
            </div>
            {purchasedDocs > 0 && (
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                <span className={`${TYPOGRAPHY.sizes.tiny}`}>Purchased (+{purchasedDocs} docs)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Documents Section - Overview */}
      <h3 className="status-header-title">Overview</h3> 
      <div className="status-overview-documents"> 
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Executive Summary</span>
            <span className="status-label">Executive Summary</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">SWOT Analysis</span>
            <span className="status-label">SWOT Analysis</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Business Models</span>
            <span className="status-label">Business Models</span>
          </div>
        </div>
      </div>

      {/* Documents Section - Market Research */}
      <h3 className="status-card-title">Market Research</h3>
      <div className="status-overview-documents">
  
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Industry Overview</span>
            <span className="status-label">Industry Overview</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Target Audience</span>
            <span className="status-label">Target Audience</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Market Size & Trends</span>
            <span className="status-label">Market Size & Trends</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Competitor Analysis</span>
            <span className="status-label">Competitor Analysis</span>
          </div>
        </div>
      </div>



      {/* Documents Section - Products & Services */}
      <h3 className="status-card-title">Products & Services</h3>
      <div className="status-overview-documents">
          
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Core Offerings</span>
            <span className="status-label">Core Offerings</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Expansion Opportunities</span>
            <span className="status-label">Expansion Opportunities</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Secondary Offerings</span>
            <span className="status-label">Secondary Offerings</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Customer Service</span>
            <span className="status-label">Customer Service</span>
          </div>
        </div>
      </div>

      {/* Documents Section - Sales & Marketing */}
      <h3 className="status-card-title">Sales & Marketing</h3>
      <div className="status-overview-documents">
        
        
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Marketing Overview</span>
            <span className="status-label">Marketing Overview</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Branding & Identity</span>
            <span className="status-label">Branding & Identity</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Online Presence</span>
            <span className="status-label">Online Presence</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Digital Marketing</span>
            <span className="status-label">Digital Marketing</span>
          </div>
        </div>
      </div>

      {/* Documents Section - Financials */}
      <h3 className="status-card-title">Financials</h3>
      <div className="status-overview-documents">
        
        
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Revenue</span>
            <span className="status-label">Revenue</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Expenses</span>
            <span className="status-label">Expenses</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Profit & Loss</span>
            <span className="status-label">Profit & Loss</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Cash Flow</span>
            <span className="status-label">Cash Flow</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Funding Plan</span>
            <span className="status-label">Funding Plan</span>
          </div>
        </div>
      </div>

      {/* Documents Section - Operations */}
      <h3 className="status-card-title">Operations</h3>
      <div className="status-overview-documents">
        
        
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Team & Roles</span>
            <span className="status-label">Team & Roles</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Operations Plan</span>
            <span className="status-label">Operations Plan</span>
          </div>
        </div>
      </div>

      {/* Documents Section - Implementation Plan */}
      <h3 className="status-card-title">Implementation Plan (Roadmap)</h3>
      <div className="status-overview-documents">
        
        
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Pre-Launch</span>
            <span className="status-label">Pre-Launch</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Post-Launch</span>
            <span className="status-label">Post-Launch</span>
          </div>
        </div>
      </div>

      {/* Documents Section - Tech Stack */}
      <h3 className="status-card-title">Tech Stack</h3>
      <div className="status-overview-documents">
      
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Frontend</span>
            <span className="status-label">Frontend</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Backend</span>
            <span className="status-label">Backend</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">UI/UX</span>
            <span className="status-label">UI/UX</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Deployment & Hosting</span>
            <span className="status-label">Deployment & Hosting</span>
          </div>
        </div>

      </div>

      {/* Documents Section - Database */}
      <h3 className="status-card-title">Database</h3>
      <div className="status-overview-documents">
      
        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Database Schema</span>
            <span className="status-label">Database Schema</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-value">Tables</span>
            <span className="status-label">Tables</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="overview-grid">
        {/* Quick Actions */}
        <div className="overview-card actions-card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="actions-grid">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button key={index} className={`quick-action ${action.color}`}>
                  <Icon className="w-5 h-5" />
                  <span>{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview