import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Filter, ChevronDown } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/Command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/Popover'

const Createproject = ({ isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false)
  // Mock projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'ai-startup-studio',
      type: 'SaaS',
      description: 'AI-powered startup development platform with automated tools and resources.',
      region: 'aws | us-east-2',
      status: 'active',
      badge: 'SERIES A',
      fundingAmount: '$2.5M',
      lastUpdated: '2 hours ago',
      progress: 85
    },
    {
      id: 2,
      name: 'temp-2',
      type: 'E-commerce',
      description: 'Modern e-commerce solution with integrated payment processing and analytics.',
      region: 'aws | us-east-2',
      status: 'active',
      badge: 'SEED',
      fundingAmount: '$500K',
      lastUpdated: '1 day ago',
      progress: 45
    },
    {
      id: 3,
      name: 'fintech-app',
      type: 'Fintech',
      description: 'Digital banking platform with advanced security and mobile-first design.',
      region: 'aws | eu-west-1',
      status: 'development',
      badge: 'PRE-SEED',
      fundingAmount: '$100K',
      lastUpdated: '3 days ago',
      progress: 72
    }
  ])
  const [formData, setFormData] = useState({
    projectName: '',
    businessType: '',
    description: '',
    targetMarket: '',
    stage: '',
    teamSize: '',
    budgetRange: ''
  })

  const handleNewProject = () => {
    setIsModalOpen(true)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Handle form submission - in real app this would be an API call
    console.log('Creating new project with data:', formData)
    // Close modal and reset form
    setIsModalOpen(false)
    setFormData({
      projectName: '',
      businessType: '',
      description: '',
      targetMarket: '',
      stage: '',
      teamSize: '',
      budgetRange: ''
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`)
  }

  // Filter options for projects
  const filterOptions = [
    { id: 'all', name: 'All Projects' },
    { id: 'saas', name: 'SaaS' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'fintech', name: 'Fintech' },
    { id: 'healthtech', name: 'Healthtech' },
    { id: 'edtech', name: 'Edtech' },
    { id: 'active', name: 'Active Only' },
    { id: 'development', name: 'In Development' },
    { id: 'funded', name: 'Funded Projects' }
  ]

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    if (searchQuery === '' && selectedFilter === 'all') {
      return projects
    }
    
    return projects.filter(project => {
      // Enhanced search that includes more fields and keywords
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = searchQuery === '' || 
                           project.name.toLowerCase().includes(searchLower) ||
                           project.description.toLowerCase().includes(searchLower) ||
                           project.type.toLowerCase().includes(searchLower) ||
                           project.region.toLowerCase().includes(searchLower) ||
                           project.badge.toLowerCase().includes(searchLower) ||
                           project.status.toLowerCase().includes(searchLower) ||
                           project.fundingAmount.toLowerCase().includes(searchLower) ||
                           // Search by business type keywords
                           (searchLower === 'saas' && project.type.toLowerCase() === 'saas') ||
                           (searchLower === 'ecommerce' && project.type.toLowerCase() === 'e-commerce') ||
                           (searchLower === 'fintech' && project.type.toLowerCase() === 'fintech') ||
                           (searchLower === 'healthtech' && project.type.toLowerCase() === 'healthtech') ||
                           (searchLower === 'edtech' && project.type.toLowerCase() === 'edtech') ||
                           // Search by funding stage
                           (searchLower.includes('seed') && project.badge.toLowerCase().includes('seed')) ||
                           (searchLower.includes('series') && project.badge.toLowerCase().includes('series')) ||
                           // Search by status
                           (searchLower === 'active' && project.status === 'active') ||
                           (searchLower === 'development' && project.status === 'development')
      
      let matchesFilter = true
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'active' || selectedFilter === 'development') {
          matchesFilter = project.status === selectedFilter
        } else if (selectedFilter === 'funded') {
          matchesFilter = project.badge && project.badge !== 'PRE-SEED'
        } else {
          matchesFilter = project.type.toLowerCase() === selectedFilter
        }
      }
      
      return matchesSearch && matchesFilter
    })
  }, [projects, searchQuery, selectedFilter])

  return (
    <div className="create-project-container">
      {/* Content Area */}
      <div className={`create-project-content ${isModalOpen ? 'content-blurred' : ''}`}>
        {filteredProjects.length === 0 ? (
          // Empty State with Controls Above
          <div className="empty-state-wrapper">
            {/* Controls Section - Above Content */}
            <div className="content-controls">
              <button 
                className="new-project-btn"
                onClick={handleNewProject}
              >
                New project
              </button>
              
              <div className="header-controls">
                <div className="search-container">
                  <Search className="w-4 h-4 search-icon" />
                  <input
                    type="text"
                    placeholder="Search for a project"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                  />
                </div>
                
                <Popover open={filterDropdownOpen} onOpenChange={setFilterDropdownOpen}>
                  <PopoverTrigger asChild>
                    <button className="filter-btn">
                      <Filter className="w-4 h-4" />
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="filter-dropdown-content w-56" side="bottom" align="end" forceMount>
                    <Command className="filter-command">
                      <CommandInput 
                        placeholder="Search filters..." 
                        className="filter-command-input"
                      />
                      <CommandList className="filter-command-list">
                        <CommandEmpty className="filter-command-empty">No filters found.</CommandEmpty>
                        <CommandGroup className="filter-command-group">
                          {filterOptions.map((option) => (
                            <CommandItem
                              key={option.id}
                              value={option.id}
                              onSelect={(value) => {
                                setSelectedFilter(value)
                                setFilterDropdownOpen(false)
                              }}
                              className="filter-command-item"
                            >
                              <span className={selectedFilter === option.id ? 'font-medium' : ''}>
                                {option.name}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Empty State Content - Below Controls */}
            <div className="empty-state">
              <div className="empty-state-content">
                <h2 className="empty-state-title">
                  {projects.length === 0 
                    ? 'No projects' 
                    : searchQuery 
                      ? `No projects found for "${searchQuery}"` 
                      : 'No projects found'
                  }
                </h2>
                <p className="empty-state-description">
                  {projects.length === 0 
                    ? 'Get started by creating a new project.'
                    : searchQuery
                      ? `Try searching for different keywords or adjust your filter criteria.`
                      : 'Try adjusting your filter criteria to find what you\'re looking for.'
                  }
                </p>
                <button 
                  className="new-project-btn-primary"
                  onClick={handleNewProject}
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Projects Grid
          <div className="projects-view">
            {/* Controls Section - Above Projects */}
            <div className="projects-controls">
              <button 
                className="new-project-btn"
                onClick={handleNewProject}
              >
                New project
              </button>
              
              <div className="header-controls">
                <div className="search-container">
                  <Search className="w-4 h-4 search-icon" />
                  <input
                    type="text"
                    placeholder="Search for a project"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                  />
                </div>
                
                <Popover open={filterDropdownOpen} onOpenChange={setFilterDropdownOpen}>
                  <PopoverTrigger asChild>
                    <button className="filter-btn">
                      <Filter className="w-4 h-4" />
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="filter-dropdown-content w-56" side="bottom" align="end" forceMount>
                    <Command className="filter-command">
                      <CommandInput 
                        placeholder="Search filters..." 
                        className="filter-command-input"
                      />
                      <CommandList className="filter-command-list">
                        <CommandEmpty className="filter-command-empty">No filters found.</CommandEmpty>
                        <CommandGroup className="filter-command-group">
                          {filterOptions.map((option) => (
                            <CommandItem
                              key={option.id}
                              value={option.id}
                              onSelect={(value) => {
                                setSelectedFilter(value)
                                setFilterDropdownOpen(false)
                              }}
                              className="filter-command-item"
                            >
                              <span className={selectedFilter === option.id ? 'font-medium' : ''}>
                                {option.name}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card" onClick={() => handleProjectClick(project.id)}>
                  <div className="project-card-header">
                    <div className="project-info">
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-region">{project.region}</p>
                    </div>
                    <div className="project-actions">
                      <div className="funding-info">
                        <span className={`project-badge ${project.badge.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                          {project.badge}
                        </span>
                        <span className="funding-amount">{project.fundingAmount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-card-body">
                    <div className="project-type-badge">
                      {project.type}
                    </div>
                    <p className="project-description">
                      {project.description}
                    </p>
                    
                    <div className="project-progress">
                      <div className="progress-header">
                        <span className="progress-label">Progress</span>
                        <span className="progress-value">{project.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-card-footer">
                    <div className="project-status">
                      <span className={`status-text ${project.status}`}>
                        {project.status === 'active' ? 'Active' : 'Development'}
                      </span>
                    </div>
                    <span className="project-updated">
                      Updated {project.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="new-project-modal">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Tell us about your business or startup to get started with the right tools and resources.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="modal-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="projectName" className="form-label">
                  Project Name *
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleFormChange('projectName', e.target.value)}
                  placeholder="Enter your project name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessType" className="form-label">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleFormChange('businessType', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select business type</option>
                  <option value="saas">SaaS</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="consulting">Consulting</option>
                  <option value="fintech">Fintech</option>
                  <option value="healthtech">Healthtech</option>
                  <option value="edtech">Edtech</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Briefly describe your business or startup idea"
                  className="form-textarea"
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetMarket" className="form-label">
                  Target Market *
                </label>
                <input
                  id="targetMarket"
                  type="text"
                  value={formData.targetMarket}
                  onChange={(e) => handleFormChange('targetMarket', e.target.value)}
                  placeholder="Who is your target audience?"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stage" className="form-label">
                  Current Stage *
                </label>
                <select
                  id="stage"
                  value={formData.stage}
                  onChange={(e) => handleFormChange('stage', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select stage</option>
                  <option value="idea">Idea</option>
                  <option value="validation">Validation</option>
                  <option value="mvp">MVP</option>
                  <option value="growth">Growth</option>
                  <option value="scale">Scale</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="teamSize" className="form-label">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={(e) => handleFormChange('teamSize', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select team size</option>
                  <option value="solo">Solo founder</option>
                  <option value="2-3">2-3 people</option>
                  <option value="4-10">4-10 people</option>
                  <option value="11-50">11-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="budgetRange" className="form-label">
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => handleFormChange('budgetRange', e.target.value)}
                  className="form-select"
                >
                  <option value="">Select budget range</option>
                  <option value="0-1k">$0 - $1,000</option>
                  <option value="1k-5k">$1,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
            </div>

            <DialogFooter className="modal-footer">
              <button
                type="button"
                onClick={handleCloseModal}
                className="cancel-btn cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn cursor-pointer"
              >
                Create Project
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Createproject
