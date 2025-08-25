import React, { useState } from 'react'
import { TYPOGRAPHY } from '../lib/constants'
import { useNavigate } from 'react-router-dom'

// Project Overview Component
const ProjectOverview = ({ project }) => {
  const navigate = useNavigate()
  const [documentCredits, setDocumentCredits] = useState(0)
  
  
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

  // Document usage / limits - NEW SCHEMA
  const subscription = (project?.subscription || 'free').toLowerCase()
  const baseDocs = project?.baseDocuments || 6
  const usedDocs = project?.usedDocuments || 0
  // Total available = base documents + document credits from billing
  const totalAvailable = baseDocs 
  const usedPercent = Math.min(100, Math.round((usedDocs / totalAvailable) * 100))
  
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
            <div className={`text-slate-500 pt-2 ${TYPOGRAPHY.sizes.caption}`}>
              {usedDocs}/{totalAvailable} documents available
              {documentCredits > 0 && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  +{documentCredits} credits
                </span>
              )}
            </div>
          </div>
          <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
            {subscription !== 'enterprise' && (
              <>
               
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
            <div className="absolute inset-y-0" style={{ left: `${freeWidth}%`, width: `${builderWidth}%`, background: 'rgba(247, 117, 85, 0.25)' }}></div>
            <div className="absolute inset-y-0" style={{ left: `${freeWidth + builderWidth}%`, width: `${enterpriseWidth}%`, background: 'rgba(117, 85, 247, 0.35)' }}></div>

            {/* free breakpoint divider */}
            <div className="absolute top-0 bottom-0" style={{ left: `${freeWidth}%` }}>
              <div className="h-full w-px border-l border-dashed border-slate-300"></div>
            </div>

            {/* usage fill */}
            <div className="relative z-10 h-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${usedPercent}%` }}></div>
            
            {/* document credits indicator */}
            {documentCredits > 0 && (
              <div className="absolute top-0 h-full bg-blue-500/30 border-l-2 border-blue-500" 
                   style={{ 
                     left: `${(baseDocs / maxEnterprise) * 100}%`,
                     width: `${(documentCredits / maxEnterprise) * 100}%`
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
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70"></span>
              <span className={`${TYPOGRAPHY.sizes.tiny}`}>Builder ({DOC_LIMITS.builder} docs)</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500/80"></span>
              <span className={`${TYPOGRAPHY.sizes.tiny}`}>Enterprise ({DOC_LIMITS.enterprise} docs)</span>
            </div>
            {documentCredits > 0 && (
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                <span className={`${TYPOGRAPHY.sizes.tiny}`}>Credits (+{documentCredits} docs)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Add-on Packages Section */}
      {/* {project?.projectAddOns && project.projectAddOns.length > 0 && (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className={`${TYPOGRAPHY.sizes.body.large} ${TYPOGRAPHY.weights.semibold} text-slate-900`}>
              Active Add-on Packages
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.projectAddOns.map((addon, index) => {
              const isCoderPackage = addon === 'coder_package'
              const isDatabasePackage = addon === 'database_package'
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${
                    isCoderPackage 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-purple-200 bg-purple-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      isCoderPackage ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {isCoderPackage ? (
                        <Code className={`w-5 h-5 ${isCoderPackage ? 'text-blue-600' : 'text-purple-600'}`} />
                      ) : (
                        <Database className={`w-5 h-5 ${isCoderPackage ? 'text-blue-600' : 'text-purple-600'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-semibold ${isCoderPackage ? 'text-blue-900' : 'text-purple-900'}`}>
                          {isCoderPackage ? 'Coder Package' : 'Database Package'}
                        </h4>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          isCoderPackage 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          <Check className="w-3 h-3" />
                          Active
                        </div>
                      </div>
                      <p className={`text-sm ${isCoderPackage ? 'text-blue-700' : 'text-purple-700'}`}>
                        {isCoderPackage 
                          ? 'Access to tech stack and database documentation'
                          : 'Access to database schema and table structures'
                        }
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {isCoderPackage ? (
                          <>
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Frontend</span>
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Backend</span>
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">UI/UX</span>
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Database</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">Schema</span>
                            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">Tables</span>
                            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">Indexing</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )} */}

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
    </div>
  )
}

export default ProjectOverview