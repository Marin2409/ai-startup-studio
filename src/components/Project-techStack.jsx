import React, { useState } from 'react'
import {
  Layers,
  Monitor,
  Server,
  Database,
  Cloud,
  Search,
  Plus,
  Trash2,
  Download,
  Star,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Info,
  ArrowRight,
} from 'lucide-react'

const ProjectTechStack = () => {
  const [selectedStack, setSelectedStack] = useState({
    frontend: [],
    backend: [],
    database: [],
    infrastructure: []
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [draggedTech, setDraggedTech] = useState(null)
  const [dragOverSlot, setDragOverSlot] = useState(null)

  // Technology database with comprehensive information
  const technologies = {
    frontend: [
      {
        id: 'react',
        name: 'React',
        description: 'A JavaScript library for building user interfaces',
        logo: '⚛️',
        popularity: 95,
        difficulty: 'Medium',
        cost: 'Free',
        pros: ['Large community', 'Component-based', 'Virtual DOM'],
        cons: ['Learning curve', 'Rapid changes'],
        category: 'framework'
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        description: 'Full-stack React framework with SSR and SSG',
        logo: '▲',
        popularity: 88,
        difficulty: 'Medium',
        cost: 'Free',
        pros: ['SEO friendly', 'Built-in optimization', 'Full-stack'],
        cons: ['Opinionated', 'Learning curve'],
        category: 'framework'
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        logo: '🎨',
        popularity: 82,
        difficulty: 'Easy',
        cost: 'Free',
        pros: ['Rapid development', 'Consistent design', 'Small bundle'],
        cons: ['Verbose HTML', 'Learning curve'],
        category: 'styling'
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        description: 'Typed superset of JavaScript',
        logo: '📘',
        popularity: 78,
        difficulty: 'Medium',
        cost: 'Free',
        pros: ['Type safety', 'Better IDE support', 'Scalability'],
        cons: ['Setup complexity', 'Learning curve'],
        category: 'language'
      }
    ],
    backend: [
      {
        id: 'nodejs',
        name: 'Node.js',
        description: 'JavaScript runtime for server-side development',
        logo: '🟢',
        popularity: 85,
        difficulty: 'Medium',
        cost: 'Free',
        pros: ['JavaScript everywhere', 'NPM ecosystem', 'Fast development'],
        cons: ['Single-threaded', 'Callback complexity'],
        category: 'runtime'
      },
      {
        id: 'express',
        name: 'Express.js',
        description: 'Fast, minimalist web framework for Node.js',
        logo: '🚂',
        popularity: 90,
        difficulty: 'Easy',
        cost: 'Free',
        pros: ['Simple', 'Flexible', 'Middleware support'],
        cons: ['Minimal features', 'Configuration needed'],
        category: 'framework'
      },
      {
        id: 'python',
        name: 'Python',
        description: 'High-level programming language',
        logo: '🐍',
        popularity: 92,
        difficulty: 'Easy',
        cost: 'Free',
        pros: ['Easy to learn', 'Versatile', 'Great libraries'],
        cons: ['Performance', 'GIL limitations'],
        category: 'language'
      },
      {
        id: 'auth0',
        name: 'Auth0',
        description: 'Identity platform for developers',
        logo: '🔐',
        popularity: 75,
        difficulty: 'Easy',
        cost: 'Freemium',
        pros: ['Easy integration', 'Security features', 'Social logins'],
        cons: ['Cost at scale', 'Vendor lock-in'],
        category: 'auth'
      }
    ],
    database: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        description: 'Advanced open-source relational database',
        logo: '🐘',
        popularity: 88,
        difficulty: 'Medium',
        cost: 'Free',
        pros: ['ACID compliance', 'JSON support', 'Extensible'],
        cons: ['Memory usage', 'Complex setup'],
        category: 'sql'
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        description: 'Document-oriented NoSQL database',
        logo: '🍃',
        popularity: 82,
        difficulty: 'Easy',
        cost: 'Freemium',
        pros: ['Flexible schema', 'Horizontal scaling', 'JSON-like'],
        cons: ['Memory usage', 'Consistency'],
        category: 'nosql'
      },
      {
        id: 'redis',
        name: 'Redis',
        description: 'In-memory data structure store',
        logo: '⚡',
        popularity: 85,
        difficulty: 'Medium',
        cost: 'Free',
        pros: ['Very fast', 'Multiple data types', 'Pub/Sub'],
        cons: ['Memory limited', 'Persistence complexity'],
        category: 'cache'
      },
      {
        id: 'supabase',
        name: 'Supabase',
        description: 'Open source Firebase alternative',
        logo: '⚡',
        popularity: 72,
        difficulty: 'Easy',
        cost: 'Freemium',
        pros: ['Real-time', 'PostgreSQL based', 'Easy setup'],
        cons: ['Newer platform', 'Limited features'],
        category: 'baas'
      }
    ],
    infrastructure: [
      {
        id: 'aws',
        name: 'Amazon AWS',
        description: 'Comprehensive cloud computing platform',
        logo: '☁️',
        popularity: 95,
        difficulty: 'Hard',
        cost: 'Pay-as-use',
        pros: ['Comprehensive', 'Scalable', 'Global'],
        cons: ['Complex', 'Expensive', 'Learning curve'],
        category: 'cloud'
      },
      {
        id: 'vercel',
        name: 'Vercel',
        description: 'Platform for frontend frameworks and static sites',
        logo: '▲',
        popularity: 78,
        difficulty: 'Easy',
        cost: 'Freemium',
        pros: ['Easy deployment', 'Global CDN', 'Git integration'],
        cons: ['Frontend focused', 'Vendor lock-in'],
        category: 'hosting'
      },
      {
        id: 'docker',
        name: 'Docker',
        description: 'Platform for developing, shipping, and running applications',
        logo: '🐳',
        popularity: 85,
        difficulty: 'Medium',
        cost: 'Freemium',
        pros: ['Consistency', 'Scalability', 'DevOps'],
        cons: ['Resource overhead', 'Complexity'],
        category: 'container'
      },
      {
        id: 'github',
        name: 'GitHub Actions',
        description: 'CI/CD platform for automated workflows',
        logo: '🔄',
        popularity: 88,
        difficulty: 'Medium',
        cost: 'Freemium',
        pros: ['Git integration', 'Marketplace', 'Easy setup'],
        cons: ['Vendor lock-in', 'Limited free tier'],
        category: 'cicd'
      }
    ]
  }

  // Layer configuration for the skeleton
  const layers = [
    {
      id: 'frontend',
      name: 'Frontend Layer',
      description: 'User interface and client-side logic',
      icon: Monitor,
      color: '#3b82f6',
      slots: 4
    },
    {
      id: 'backend',
      name: 'Backend Layer',
      description: 'Server-side logic and APIs',
      icon: Server,
      color: '#10b981',
      slots: 4
    },
    {
      id: 'database',
      name: 'Database Layer',
      description: 'Data storage and management',
      icon: Database,
      color: '#f59e0b',
      slots: 3
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure Layer',
      description: 'Hosting, deployment, and DevOps',
      icon: Cloud,
      color: '#8b5cf6',
      slots: 3
    }
  ]

  const categories = [
    { id: 'all', name: 'All Technologies', count: Object.values(technologies).flat().length },
    { id: 'frontend', name: 'Frontend', count: technologies.frontend.length },
    { id: 'backend', name: 'Backend', count: technologies.backend.length },
    { id: 'database', name: 'Database', count: technologies.database.length },
    { id: 'infrastructure', name: 'Infrastructure', count: technologies.infrastructure.length }
  ]

  // Get all technologies for search and filtering
  const allTechnologies = Object.values(technologies).flat()

  // Filter technologies based on search and category
  const filteredTechnologies = allTechnologies.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           Object.keys(technologies).find(key => 
                             technologies[key].includes(tech)
                           ) === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Calculate stack statistics
  const totalTechnologies = Object.values(selectedStack).flat().length
  const averagePopularity = totalTechnologies > 0 
    ? Math.round(Object.values(selectedStack).flat().reduce((sum, tech) => sum + tech.popularity, 0) / totalTechnologies)
    : 0

  // Drag and drop handlers
  const handleDragStart = (tech) => {
    setDraggedTech(tech)
  }

  const handleDragOver = (e, layerId) => {
    e.preventDefault()
    setDragOverSlot(layerId)
  }

  const handleDragLeave = () => {
    setDragOverSlot(null)
  }

  const handleDrop = (e, layerId) => {
    e.preventDefault()
    setDragOverSlot(null)
    
    if (draggedTech) {
      // Check if technology is already in the layer
      if (!selectedStack[layerId].find(tech => tech.id === draggedTech.id)) {
        setSelectedStack(prev => ({
          ...prev,
          [layerId]: [...prev[layerId], draggedTech]
        }))
      }
      setDraggedTech(null)
    }
  }

  const removeTechnology = (layerId, techId) => {
    setSelectedStack(prev => ({
      ...prev,
      [layerId]: prev[layerId].filter(tech => tech.id !== techId)
    }))
  }

  const clearStack = () => {
    setSelectedStack({
      frontend: [],
      backend: [],
      database: [],
      infrastructure: []
    })
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#64748b'
    }
  }

  const renderTechnologyCard = (tech, isInStack = false, layerId = null) => (
    <div
      key={tech.id}
      className={`tech-card ${isInStack ? 'in-stack' : 'draggable'}`}
      draggable={!isInStack}
      onDragStart={() => !isInStack && handleDragStart(tech)}
    >
      <div className="tech-card-header">
        <div className="tech-logo">{tech.logo}</div>
        <div className="tech-info">
          <h4 className="tech-name">{tech.name}</h4>
          <p className="tech-description">{tech.description}</p>
        </div>
        {isInStack && (
          <button 
            className="remove-tech-btn"
            onClick={() => removeTechnology(layerId, tech.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="tech-card-stats">
        <div className="tech-stat">
          <Star className="w-3 h-3" />
          <span>{tech.popularity}%</span>
        </div>
        <div className="tech-stat">
          <span 
            className="difficulty-badge" 
            style={{ backgroundColor: getDifficultyColor(tech.difficulty) }}
          >
            {tech.difficulty}
          </span>
        </div>
        <div className="tech-stat">
          <DollarSign className="w-3 h-3" />
          <span>{tech.cost}</span>
        </div>
      </div>

      {!isInStack && (
        <div className="tech-card-footer">
          <div className="tech-pros">
            <span className="pros-label">Pros:</span>
            <span className="pros-text">{tech.pros.slice(0, 2).join(', ')}</span>
          </div>
        </div>
      )}
    </div>
  )

  const renderLayer = (layer) => {
    const layerTechnologies = selectedStack[layer.id] || []
    const LayerIcon = layer.icon

    return (
      <div key={layer.id} className="architecture-layer">
        <div className="layer-header">
          <div className="layer-icon" style={{ backgroundColor: layer.color }}>
            <LayerIcon className="w-6 h-6" />
          </div>
          <div className="layer-info">
            <h3 className="layer-name">{layer.name}</h3>
            <p className="layer-description">{layer.description}</p>
          </div>
          <div className="layer-stats">
            <span className="tech-count">{layerTechnologies.length}/{layer.slots}</span>
          </div>
        </div>

        <div 
          className={`layer-drop-zone ${dragOverSlot === layer.id ? 'drag-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, layer.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, layer.id)}
        >
          {layerTechnologies.length > 0 ? (
            <div className="layer-technologies">
              {layerTechnologies.map(tech => 
                renderTechnologyCard(tech, true, layer.id)
              )}
            </div>
          ) : (
            <div className="empty-layer">
              <Plus className="w-8 h-8" />
              <p>Drag technologies here</p>
              <span>Add up to {layer.slots} technologies</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="techstack-container">
      {/* Header */}
      <div className="techstack-header">
        <div className="techstack-header-content">
          <h1 className="techstack-title">Tech Stack Builder</h1>
          <p className="techstack-subtitle">Design your startup's technology architecture with drag & drop</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="techstack-stats-grid">
        <div className="techstack-stat-card">
          <div className="stat-icon technologies">
            <Layers className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalTechnologies}</span>
            <span className="stat-label">Technologies Selected</span>
          </div>
        </div>
        <div className="techstack-stat-card">
          <div className="stat-icon popularity">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{averagePopularity}%</span>
            <span className="stat-label">Avg. Popularity</span>
          </div>
        </div>
        <div className="techstack-stat-card">
          <div className="stat-icon completeness">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{Math.round((totalTechnologies / 14) * 100)}%</span>
            <span className="stat-label">Stack Completeness</span>
          </div>
        </div>
        <div className="techstack-stat-card">
          <div className="stat-icon cost">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              {Object.values(selectedStack).flat().filter(tech => tech.cost === 'Free').length}
            </span>
            <span className="stat-label">Free Technologies</span>
          </div>
        </div>
      </div>

      <div className="techstack-layout">
        {/* Technology Toolbox Sidebar */}
        <div className="technology-toolbox">
          <div className="toolbox-header">
            <h2 className="toolbox-title">Technology Toolbox</h2>
            <div className="toolbox-actions">
              <button className="toolbox-action-btn">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="toolbox-action-btn" onClick={clearStack}>
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="toolbox-controls">
            <div className="toolbox-search">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="toolbox-search-input"
              />
            </div>

            <div className="toolbox-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`toolbox-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  <span className="filter-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Technology Cards */}
          <div className="technology-cards">
            {filteredTechnologies.length > 0 ? (
              filteredTechnologies.map(tech => renderTechnologyCard(tech))
            ) : (
              <div className="no-technologies">
                <Info className="w-8 h-8" />
                <p>No technologies found</p>
                <span>Try adjusting your search or filters</span>
              </div>
            )}
          </div>
        </div>

        {/* Architecture Skeleton */}
        <div className="architecture-skeleton">
          <div className="skeleton-header">
            <h2 className="skeleton-title">Architecture Layers</h2>
            <div className="skeleton-actions">
              <button className="skeleton-action-btn primary">
                <Plus className="w-4 h-4" />
                Add Custom Layer
              </button>
            </div>
          </div>

          <div className="architecture-layers">
            {layers.map(layer => renderLayer(layer))}
          </div>

          {/* Connection Flow Visualization */}
          <div className="connection-flow">
            <div className="flow-line"></div>
            <div className="flow-arrows">
              <ArrowRight className="w-4 h-4" />
              <ArrowRight className="w-4 h-4" />
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectTechStack
