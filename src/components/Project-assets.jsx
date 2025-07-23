import React, { useState } from 'react'
import {
  Upload,
  FolderPlus,
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Trash2,
  Share2,
  Eye,
  Edit3,
  MoreHorizontal,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Folder,
  ChevronRight,
  ArrowUp,
  Calendar,
  HardDrive,
  CheckCircle,
  X,
  Plus
} from 'lucide-react'

const ProjectAssets = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [currentPath, setCurrentPath] = useState(['Root'])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  // Mock data for files and folders
  const assets = [
    {
      id: 1,
      name: 'Brand Assets',
      type: 'folder',
      size: '156 items',
      modified: '2 days ago',
      items: 156
    },
    {
      id: 2,
      name: 'Product Screenshots',
      type: 'folder',
      size: '24 items',
      modified: '1 week ago',
      items: 24
    },
    {
      id: 3,
      name: 'Logo-main.svg',
      type: 'image',
      size: '45 KB',
      modified: '3 hours ago',
      url: '/assets/logo.svg'
    },
    {
      id: 4,
      name: 'Business-plan.pdf',
      type: 'document',
      size: '2.3 MB',
      modified: '1 day ago',
      url: '/assets/business-plan.pdf'
    },
    {
      id: 5,
      name: 'Demo-video.mp4',
      type: 'video',
      size: '125 MB',
      modified: '5 days ago',
      url: '/assets/demo.mp4'
    },
    {
      id: 6,
      name: 'Presentation.pptx',
      type: 'document',
      size: '8.7 MB',
      modified: '1 week ago',
      url: '/assets/presentation.pptx'
    },
    {
      id: 7,
      name: 'UI-mockups.fig',
      type: 'design',
      size: '15.2 MB',
      modified: '3 days ago',
      url: '/assets/mockups.fig'
    },
    {
      id: 8,
      name: 'Startup-pitch.mp3',
      type: 'audio',
      size: '12.4 MB',
      modified: '2 weeks ago',
      url: '/assets/pitch.mp3'
    }
  ]

  // Storage stats
  const storageStats = {
    used: '2.8 GB',
    total: '10 GB',
    percentage: 28,
    files: 342
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'folder': return Folder
      case 'image': return FileImage
      case 'video': return FileVideo
      case 'audio': return FileAudio
      case 'document': return FileText
      case 'design': return FileImage
      default: return File
    }
  }

  const getFileColor = (type) => {
    switch (type) {
      case 'folder': return '#3b82f6'
      case 'image': return '#10b981'
      case 'video': return '#8b5cf6'
      case 'audio': return '#f59e0b'
      case 'document': return '#ef4444'
      case 'design': return '#ec4899'
      default: return '#64748b'
    }
  }

  const filterOptions = [
    { id: 'all', name: 'All Files', count: assets.length },
    { id: 'folders', name: 'Folders', count: assets.filter(a => a.type === 'folder').length },
    { id: 'images', name: 'Images', count: assets.filter(a => a.type === 'image').length },
    { id: 'documents', name: 'Documents', count: assets.filter(a => a.type === 'document').length },
    { id: 'videos', name: 'Videos', count: assets.filter(a => a.type === 'video').length },
    { id: 'audio', name: 'Audio', count: assets.filter(a => a.type === 'audio').length }
  ]

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'folders' && asset.type === 'folder') ||
                         (selectedFilter === 'images' && asset.type === 'image') ||
                         (selectedFilter === 'documents' && asset.type === 'document') ||
                         (selectedFilter === 'videos' && asset.type === 'video') ||
                         (selectedFilter === 'audio' && asset.type === 'audio')
    return matchesSearch && matchesFilter
  })

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    setSelectedFiles(
      selectedFiles.length === filteredAssets.length 
        ? [] 
        : filteredAssets.map(asset => asset.id)
    )
  }

  const handleUpload = () => {
    setShowUploadModal(true)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    // Handle file drop logic here
    console.log('Files dropped:', e.dataTransfer.files)
  }

  const renderFileItem = (asset) => {
    const Icon = getFileIcon(asset.type)
    const isSelected = selectedFiles.includes(asset.id)

    if (viewMode === 'grid') {
      return (
        <div
          key={asset.id}
          className={`assets-grid-item ${isSelected ? 'selected' : ''}`}
          onClick={() => handleFileSelect(asset.id)}
        >
          <div className="assets-item-preview">
            <Icon 
              className="assets-item-icon" 
              style={{ color: getFileColor(asset.type) }}
            />
            {isSelected && (
              <div className="assets-selection-badge">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="assets-item-info">
            <div className="assets-item-name">{asset.name}</div>
            <div className="assets-item-meta">
              <span className="assets-item-size">{asset.size}</span>
              <span className="assets-item-modified">{asset.modified}</span>
            </div>
          </div>
          <div className="assets-item-actions">
            <button className="assets-action-btn">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div
          key={asset.id}
          className={`assets-list-item ${isSelected ? 'selected' : ''}`}
          onClick={() => handleFileSelect(asset.id)}
        >
          <div className="assets-list-checkbox">
            <div className={`assets-checkbox ${isSelected ? 'checked' : ''}`}>
              {isSelected && <CheckCircle className="w-4 h-4" />}
            </div>
          </div>
          <div className="assets-list-preview">
            <Icon 
              className="assets-list-icon" 
              style={{ color: getFileColor(asset.type) }}
            />
          </div>
          <div className="assets-list-name">{asset.name}</div>
          <div className="assets-list-size">{asset.size}</div>
          <div className="assets-list-modified">{asset.modified}</div>
          <div className="assets-list-actions">
            <button className="assets-action-btn">
              <Eye className="w-4 h-4" />
            </button>
            <button className="assets-action-btn">
              <Download className="w-4 h-4" />
            </button>
            <button className="assets-action-btn">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="assets-action-btn">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="assets-container">
      {/* Header */}
      <div className="assets-header">
        <div className="assets-header-content">
          <h1 className="assets-title">Project Assets</h1>
          <p className="assets-subtitle">Manage your project files, images, documents, and media</p>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="assets-storage-stats">
        <div className="storage-stat-item">
          <HardDrive className="w-5 h-5" />
          <div className="storage-stat-info">
            <span className="storage-stat-value">{storageStats.used}</span>
            <span className="storage-stat-label">of {storageStats.total} used</span>
          </div>
        </div>
        <div className="storage-stat-item">
          <File className="w-5 h-5" />
          <div className="storage-stat-info">
            <span className="storage-stat-value">{storageStats.files}</span>
            <span className="storage-stat-label">total files</span>
          </div>
        </div>
        <div className="storage-progress">
          <div className="storage-progress-bar">
            <div 
              className="storage-progress-fill" 
              style={{ width: `${storageStats.percentage}%` }}
            ></div>
          </div>
          <span className="storage-progress-text">{storageStats.percentage}%</span>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="assets-breadcrumbs">
        {currentPath.map((path, index) => (
          <div key={index} className="breadcrumb-item">
            <span>{path}</span>
            {index < currentPath.length - 1 && <ChevronRight className="w-4 h-4" />}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="assets-controls">
        <div className="assets-controls-left">
          <button className="assets-action-btn primary" onClick={handleUpload}>
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
          <button className="assets-action-btn secondary">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
        </div>

        <div className="assets-controls-center">
          <div className="assets-search">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="assets-search-input"
            />
          </div>
        </div>

        <div className="assets-controls-right">
          <div className="assets-view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="assets-filters">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            className={`assets-filter-tab ${selectedFilter === filter.id ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            {filter.name}
            <span className="filter-count">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Selection Bar */}
      {selectedFiles.length > 0 && (
        <div className="assets-selection-bar">
          <div className="selection-info">
            <span>{selectedFiles.length} item{selectedFiles.length > 1 ? 's' : ''} selected</span>
          </div>
          <div className="selection-actions">
            <button className="selection-action-btn">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="selection-action-btn">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="selection-action-btn danger">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button 
              className="selection-action-btn"
              onClick={() => setSelectedFiles([])}
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* File Grid/List */}
      <div 
        className={`assets-content ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {viewMode === 'list' && (
          <div className="assets-list-header">
            <div className="assets-list-checkbox">
              <div 
                className={`assets-checkbox ${selectedFiles.length === filteredAssets.length && filteredAssets.length > 0 ? 'checked' : ''}`}
                onClick={handleSelectAll}
              >
                {selectedFiles.length === filteredAssets.length && filteredAssets.length > 0 && <CheckCircle className="w-4 h-4" />}
              </div>
            </div>
            <div className="assets-list-preview"></div>
            <div className="assets-list-name">Name</div>
            <div className="assets-list-size">Size</div>
            <div className="assets-list-modified">Modified</div>
            <div className="assets-list-actions">Actions</div>
          </div>
        )}

        <div className={`assets-${viewMode}`}>
          {filteredAssets.length > 0 ? (
            filteredAssets.map(renderFileItem)
          ) : (
            <div className="assets-empty-state">
              <File className="w-12 h-12" />
              <h3>No files found</h3>
              <p>
                {searchQuery 
                  ? `No files match "${searchQuery}"` 
                  : "Upload files to get started"
                }
              </p>
              <button className="assets-action-btn primary" onClick={handleUpload}>
                <Upload className="w-4 h-4" />
                Upload Files
              </button>
            </div>
          )}
        </div>

        {dragOver && (
          <div className="assets-drop-overlay">
            <div className="drop-content">
              <Upload className="w-12 h-12" />
              <h3>Drop files here to upload</h3>
              <p>Release to upload your files</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectAssets
