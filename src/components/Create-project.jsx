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
      lastUpdated: '2 hours ago',
    },
    {
      id: 2,
      name: 'temp-2',
      type: 'E-commerce',
      description: 'Modern e-commerce solution with integrated payment processing and analytics.',
      region: 'aws | us-east-2',
      status: 'active',
      lastUpdated: '1 day ago',
    },
    {
      id: 3,
      name: 'fintech-app',
      type: 'Fintech',
      description: 'Digital banking platform with advanced security and mobile-first design.',
      region: 'aws | eu-west-1',
      status: 'development',
      lastUpdated: '3 days ago',
    }
  ])
  const [formData, setFormData] = useState({
    organizationName: '',
    industry: '',
    teamSize: '',
    primaryObjective: '',
    timeline: '',
    budgetRange: '',
    technicalLevel: '',
    needCofounder: false,
    preferredTechStack: ''
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
      organizationName: '',
      industry: '',
      teamSize: '',
      primaryObjective: '',
      timeline: '',
      budgetRange: '',
      technicalLevel: '',
      needCofounder: false,
      preferredTechStack: ''
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
                           project.status.toLowerCase().includes(searchLower) ||
                           // Search by business type keywords
                           (searchLower === 'saas' && project.type.toLowerCase() === 'saas') ||
                           (searchLower === 'ecommerce' && project.type.toLowerCase() === 'e-commerce') ||
                           (searchLower === 'fintech' && project.type.toLowerCase() === 'fintech') ||
                           (searchLower === 'healthtech' && project.type.toLowerCase() === 'healthtech') ||
                           (searchLower === 'edtech' && project.type.toLowerCase() === 'edtech') ||
                           // Search by funding stage
                           // Search by status
                           (searchLower === 'active' && project.status === 'active') ||
                           (searchLower === 'development' && project.status === 'development')
      
      let matchesFilter = true
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'active' || selectedFilter === 'development') {
          matchesFilter = project.status === selectedFilter
        } else if (selectedFilter === 'funded') {
          matchesFilter = project.status === 'active'
        } else {
          matchesFilter = project.type.toLowerCase() === selectedFilter
        }
      }
      
      return matchesSearch && matchesFilter
    })
  }, [projects, searchQuery, selectedFilter])

  return (
    <div>
      {/* Content Area */}
      <div className={` ${isModalOpen ? 'content-blurred' : ''}`}>
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
                  </div>
                  
                  <div className="project-card-body">
                    <div className="project-type-badge">
                      {project.type}
                    </div>
                    <p className="project-description">
                      {project.description}
                    </p>
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
              {/* Project Name */}
              <div className="form-group">
                <label htmlFor="organizationName" className="form-label">
                  Project Name *
                </label>
                <input
                  id="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleFormChange('organizationName', e.target.value)}
                  placeholder="What's the name of your project?"
                  className="form-input"
                  required
                />
              </div>

              {/* Industry */}
              <div className="form-group">
                <label htmlFor="industry" className="form-label">
                  Industry *
                </label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleFormChange('industry', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select your industry</option>
                  <option value="saas">SaaS & Software</option>
                  <option value="ecommerce">E-commerce & Retail</option>
                  <option value="fintech">FinTech & Banking</option>
                  <option value="healthtech">HealthTech & Medical</option>
                  <option value="edtech">EdTech & Education</option>
                  <option value="marketplace">Marketplace & Platform</option>
                  <option value="social">Social & Community</option>
                  <option value="enterprise">Enterprise & B2B</option>
                  <option value="gaming">Gaming & Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Team Size */}
              <div className="form-group">
                <label htmlFor="teamSize" className="form-label">
                  Team Size *
                </label>
                <select
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={(e) => handleFormChange('teamSize', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select team size</option>
                  <option value="solo">Just me (Solo founder)</option>
                  <option value="2-5">2-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11-25">11-25 people</option>
                  <option value="25+">25+ people</option>
                </select>
              </div>

              {/* Primary Objective */}
              <div className="form-group">
                <label htmlFor="primaryObjective" className="form-label">
                  Primary Objective *
                </label>
                <select
                  id="primaryObjective"
                  value={formData.primaryObjective}
                  onChange={(e) => handleFormChange('primaryObjective', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select your primary objective</option>
                  <option value="mvp">Build MVP</option>
                  <option value="funding">Raise Funding</option>
                  <option value="scale">Scale Product</option>
                  <option value="cofounder">Find Co-founder</option>
                  <option value="validate">Validate Idea</option>
                </select>
              </div>

              {/* Timeline */}
              <div className="form-group">
                <label htmlFor="timeline" className="form-label">
                  Expected Timeline *
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleFormChange('timeline', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select timeline</option>
                  <option value="1-3">1-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6-12">6-12 months</option>
                  <option value="12+">12+ months</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="form-group">
                <label htmlFor="budgetRange" className="form-label">
                  Budget Range *
                </label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => handleFormChange('budgetRange', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select budget range</option>
                  <option value="0-5k">$0 - $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-50k">$15,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>

              {/* Technical Expertise Level */}
              <div className="form-group">
                <label htmlFor="technicalLevel" className="form-label">
                  Technical Expertise Level *
                </label>
                <select
                  id="technicalLevel"
                  value={formData.technicalLevel}
                  onChange={(e) => handleFormChange('technicalLevel', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select your technical level</option>
                  <option value="non-technical">Non-technical</option>
                  <option value="some">Some experience</option>
                  <option value="technical">Technical</option>
                  <option value="expert">Expert developer</option>
                </select>
              </div>

              {/* Need Co-founder */}
              <div className="form-group">
                <label htmlFor="needCofounder" className="form-label">
                  Do you need a technical co-founder? *
                </label>
                <select
                  id="needCofounder"
                  value={formData.needCofounder}
                  onChange={(e) => handleFormChange('needCofounder', e.target.value === 'true')}
                  className="form-select"
                  required
                >
                  <option value="">Select option</option>
                  <option value="true">Yes, I need technical help</option>
                  <option value="false">No, I can handle the tech</option>
                </select>
              </div>

              {/* Preferred Tech Stack */}
              <div className="form-group">
                <label htmlFor="preferredTechStack" className="form-label">
                  Preferred Tech Stack *
                </label>
                <select
                  id="preferredTechStack"
                  value={formData.preferredTechStack}
                  onChange={(e) => handleFormChange('preferredTechStack', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select preferred tech stack</option>
                  <option value="react-node">React + Node.js</option>
                  <option value="python-django">Python + Django</option>
                  <option value="mobile-first">Mobile First (React Native)</option>
                  <option value="wordpress">WordPress/No-Code</option>
                  <option value="custom">Custom Solution</option>
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
