import React, { useState } from 'react'
import {
  Database,
  Settings,
  BarChart3,
  Plus,
  Eye,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Key,
  HardDrive,
  Zap,
  Activity,
  Cloud,
  Filter,
  MoreHorizontal,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const ProjectStorage = () => {
  const [activeTab, setActiveTab] = useState('databases')
  const [showNewDatabaseModal, setShowNewDatabaseModal] = useState(false)
  const [showNewEnvironmentModal, setShowNewEnvironmentModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for databases
  const databases = [
    {
      id: 1,
      name: 'production-db',
      type: 'PostgreSQL',
      status: 'active',
      size: '2.4 GB',
      connections: 12,
      location: 'us-east-1',
      lastBackup: '2 hours ago',
      performance: 98
    },
    {
      id: 2,
      name: 'analytics-warehouse',
      type: 'MongoDB',
      status: 'active',
      size: '15.7 GB',
      connections: 5,
      location: 'us-west-2',
      lastBackup: '6 hours ago',
      performance: 95
    },
    {
      id: 3,
      name: 'cache-store',
      type: 'Redis',
      status: 'warning',
      size: '512 MB',
      connections: 8,
      location: 'us-east-1',
      lastBackup: '1 hour ago',
      performance: 87
    }
  ]

  // Mock data for cloud storage
  const cloudStorage = [
    {
      id: 1,
      name: 'assets-bucket',
      provider: 'AWS S3',
      size: '45.2 GB',
      files: 12847,
      tier: 'Standard',
      cost: '$15.30/month',
      region: 'us-east-1',
      status: 'healthy'
    },
    {
      id: 2,
      name: 'backups-storage',
      provider: 'Azure Blob',
      size: '128.5 GB',
      files: 2341,
      tier: 'Cool',
      cost: '$8.45/month',
      region: 'eastus',
      status: 'healthy'
    },
    {
      id: 3,
      name: 'cdn-cache',
      provider: 'CloudFlare',
      size: '8.7 GB',
      files: 5624,
      tier: 'Premium',
      cost: '$25.00/month',
      region: 'global',
      status: 'optimizing'
    }
  ]

  // Mock data for environments
  const environments = [
    {
      id: 1,
      name: 'Production',
      status: 'active',
      variables: 24,
      secrets: 8,
      lastUpdated: '3 days ago',
      deployedAt: '2024-01-15',
      health: 'excellent'
    },
    {
      id: 2,
      name: 'Staging',
      status: 'active',
      variables: 22,
      secrets: 6,
      lastUpdated: '1 day ago',
      deployedAt: '2024-01-18',
      health: 'good'
    },
    {
      id: 3,
      name: 'Development',
      status: 'active',
      variables: 18,
      secrets: 4,
      lastUpdated: '2 hours ago',
      deployedAt: '2024-01-20',
      health: 'excellent'
    }
  ]

  // Usage metrics
  const usageMetrics = [
    {
      label: 'Total Storage Used',
      value: '192.8 GB',
      change: '+2.3%',
      trend: 'up',
      icon: HardDrive,
      color: 'blue'
    },
    {
      label: 'Monthly Cost',
      value: '$48.75',
      change: '-5.2%',
      trend: 'down',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Active Connections',
      value: '25',
      change: '+8.1%',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      label: 'Avg Performance',
      value: '93.3%',
      change: '+1.2%',
      trend: 'up',
      icon: Zap,
      color: 'orange'
    }
  ]

  const tabs = [
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'cloud-storage', label: 'Cloud Storage', icon: Cloud },
    { id: 'environments', label: 'Environment Config', icon: Settings },
    { id: 'monitoring', label: 'Monitoring', icon: BarChart3 }
  ]

  const renderDatabasesTab = () => (
    <div>
      <div className="storage-section-header">
        <div className="section-title-group">
          <h3 className="storage-section-title">Database Management</h3>
          <p className="storage-section-description">Manage your database connections, schemas, and performance</p>
        </div>
        <button className="storage-action-btn primary" onClick={() => setShowNewDatabaseModal(true)}>
          <Plus className="w-4 h-4" />
          Connect Database
        </button>
      </div>

      <div className="storage-grid">
        {databases.map((db) => (
          <div key={db.id} className="storage-card database-card">
            <div className="storage-card-header">
              <div className="storage-card-title-group">
                <div className="storage-card-icon">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="storage-card-title">{db.name}</h4>
                  <p className="storage-card-subtitle">{db.type} • {db.location}</p>
                </div>
              </div>
              <div className="storage-card-actions">
                <span className={`storage-status-badge ${db.status}`}>
                  {db.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {db.status}
                </span>
                <button className="storage-menu-btn">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="storage-card-metrics">
              <div className="storage-metric">
                <span className="storage-metric-label">Size</span>
                <span className="storage-metric-value">{db.size}</span>
              </div>
              <div className="storage-metric">
                <span className="storage-metric-label">Connections</span>
                <span className="storage-metric-value">{db.connections}</span>
              </div>
              <div className="storage-metric">
                <span className="storage-metric-label">Performance</span>
                <span className="storage-metric-value">{db.performance}%</span>
              </div>
            </div>

            <div className="storage-card-info">
              <div className="storage-info-item">
                <Clock className="w-4 h-4" />
                <span>Last backup: {db.lastBackup}</span>
              </div>
            </div>

            <div className="storage-card-footer">
              <button className="storage-btn secondary">
                <Eye className="w-4 h-4" />
                Browse
              </button>
              <button className="storage-btn secondary">
                <BarChart3 className="w-4 h-4" />
                Metrics
              </button>
              <button className="storage-btn secondary">
                <Settings className="w-4 h-4" />
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCloudStorageTab = () => (
    <div>
      <div className="storage-section-header">
        <div className="section-title-group">
          <h3 className="storage-section-title">Cloud Infrastructure</h3>
          <p className="storage-section-description">Manage your cloud storage buckets, CDN, and optimization settings</p>
        </div>
        <button className="storage-action-btn primary">
          <Plus className="w-4 h-4" />
          Add Storage
        </button>
      </div>

      <div className="storage-grid">
        {cloudStorage.map((storage) => (
          <div key={storage.id} className="storage-card cloud-storage-card">
            <div className="storage-card-header">
              <div className="storage-card-title-group">
                <div className="storage-card-icon">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="storage-card-title">{storage.name}</h4>
                  <p className="storage-card-subtitle">{storage.provider} • {storage.region}</p>
                </div>
              </div>
              <div className="storage-card-actions">
                <span className={`storage-status-badge ${storage.status}`}>
                  {storage.status === 'healthy' ? <CheckCircle className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                  {storage.status}
                </span>
                <button className="storage-menu-btn">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="storage-card-metrics">
              <div className="storage-metric">
                <span className="storage-metric-label">Size</span>
                <span className="storage-metric-value">{storage.size}</span>
              </div>
              <div className="storage-metric">
                <span className="storage-metric-label">Files</span>
                <span className="storage-metric-value">{storage.files.toLocaleString()}</span>
              </div>
              <div className="storage-metric">
                <span className="storage-metric-label">Tier</span>
                <span className="storage-metric-value">{storage.tier}</span>
              </div>
            </div>

            <div className="storage-card-info">
              <div className="storage-info-item">
                <DollarSign className="w-4 h-4" />
                <span>Cost: {storage.cost}</span>
              </div>
            </div>

            <div className="storage-card-footer">
              <button className="storage-btn secondary">
                <Upload className="w-4 h-4" />
                Upload
              </button>
              <button className="storage-btn secondary">
                <Download className="w-4 h-4" />
                Sync
              </button>
              <button className="storage-btn secondary">
                <Settings className="w-4 h-4" />
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEnvironmentsTab = () => (
    <div>
      <div className="storage-section-header">
        <div className="section-title-group">
          <h3 className="storage-section-title">Environment Configuration</h3>
          <p className="storage-section-description">Manage environment variables, secrets, and deployment configurations</p>
        </div>
        <button className="storage-action-btn primary" onClick={() => setShowNewEnvironmentModal(true)}>
          <Plus className="w-4 h-4" />
          New Environment
        </button>
      </div>

      <div className="storage-grid">
        {environments.map((env) => (
          <div key={env.id} className="storage-card environment-card">
            <div className="storage-card-header">
              <div className="storage-card-title-group">
                <div className="storage-card-icon">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="storage-card-title">{env.name}</h4>
                  <p className="storage-card-subtitle">Deployed {env.deployedAt}</p>
                </div>
              </div>
              <div className="storage-card-actions">
                <span className={`storage-status-badge ${env.status}`}>
                  <CheckCircle className="w-3 h-3" />
                  {env.status}
                </span>
                <button className="storage-menu-btn">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="storage-card-metrics">
              <div className="storage-metric">
                <span className="storage-metric-label">Variables</span>
                <span className="storage-metric-value">{env.variables}</span>
              </div>
              <div className="storage-metric">
                <span className="storage-metric-label">Secrets</span>
                <span className="storage-metric-value">{env.secrets}</span>
              </div>
              <div className="storage-metric">
                <span className="storage-metric-label">Health</span>
                <span className="storage-metric-value">{env.health}</span>
              </div>
            </div>

            <div className="storage-card-info">
              <div className="storage-info-item">
                <Clock className="w-4 h-4" />
                <span>Updated: {env.lastUpdated}</span>
              </div>
            </div>

            <div className="storage-card-footer">
              <button className="storage-btn secondary">
                <Key className="w-4 h-4" />
                Variables
              </button>
              <button className="storage-btn secondary">
                <Shield className="w-4 h-4" />
                Secrets
              </button>
              <button className="storage-btn secondary">
                <Settings className="w-4 h-4" />
                Deploy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMonitoringTab = () => (
    <div>
      <div className="storage-section-header">
        <div className="section-title-group">
          <h3 className="storage-section-title">Storage Monitoring & Analytics</h3>
          <p className="storage-section-description">Monitor storage usage, performance metrics, and cost optimization</p>
        </div>
        <button className="storage-action-btn secondary">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Usage Overview */}
      <div className="storage-metrics-grid">
        {usageMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="storage-metric-card">
              <div className="storage-metric-header">
                <div className={`storage-metric-icon ${metric.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`storage-metric-trend ${metric.trend}`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              <div className="storage-metric-content">
                <div className="storage-metric-value-large">{metric.value}</div>
                <div className="storage-metric-label">{metric.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Performance Charts */}
      <div className="storage-charts-section">
        <div className="storage-chart-card">
          <div className="storage-chart-header">
            <h4 className="storage-chart-title">Storage Usage Trends</h4>
            <button className="storage-btn secondary">
              <Filter className="w-4 h-4" />
              Last 30 days
            </button>
          </div>
          <div className="storage-chart-placeholder">
            <BarChart3 className="w-12 h-12" />
            <p>Interactive storage usage chart would be displayed here</p>
          </div>
        </div>

        <div className="storage-chart-card">
          <div className="storage-chart-header">
            <h4 className="storage-chart-title">Cost Breakdown</h4>
            <button className="storage-btn secondary">
              <Filter className="w-4 h-4" />
              By service
            </button>
          </div>
          <div className="storage-chart-placeholder">
            <DollarSign className="w-12 h-12" />
            <p>Cost analysis chart would be displayed here</p>
          </div>
        </div>
      </div>

      {/* Alerts and Recommendations */}
      <div className="storage-alerts-section">
        <h4 className="storage-section-subtitle">Alerts & Recommendations</h4>
        <div className="storage-alerts-grid">
          <div className="storage-alert-card warning">
            <AlertTriangle className="w-5 h-5" />
            <div className="storage-alert-content">
              <div className="storage-alert-title">High Redis Memory Usage</div>
              <div className="storage-alert-description">Cache store is at 87% capacity. Consider scaling up.</div>
            </div>
            <button className="storage-btn small">Optimize</button>
          </div>
          
          <div className="storage-alert-card info">
            <CheckCircle className="w-5 h-5" />
            <div className="storage-alert-content">
              <div className="storage-alert-title">Cost Optimization Opportunity</div>
              <div className="storage-alert-description">Switch backup storage to cold tier to save $12/month.</div>
            </div>
            <button className="storage-btn small">Apply</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="storage-header">
        <div>
          <h1 className="storage-title">Storage Infrastructure</h1>
          <p className="storage-subtitle">Manage databases, cloud storage, configurations, and monitor performance</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="storage-nav">
        <div className="storage-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={`storage-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="storage-tab-content">
        {activeTab === 'databases' && renderDatabasesTab()}
        {activeTab === 'cloud-storage' && renderCloudStorageTab()}
        {activeTab === 'environments' && renderEnvironmentsTab()}
        {activeTab === 'monitoring' && renderMonitoringTab()}
      </div>
    </div>
  )
}

export default ProjectStorage
