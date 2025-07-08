import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, 
  User, 
  Zap, 
  Brain,
  Target,
  Code,
  FileText,
  Star
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const handleSignOut = () => {
    // For now, just navigate to home
    navigate('/')
  }     

  const handleLogoClick = () => {
    navigate('/')
  }

  // Mock user data - this will come from your auth context later
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    company: "Tech Startup Inc.",
    plan: "Starter",
    avatar: null
  }

  const quickActions = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Generate Business Plan",
      description: "Create a comprehensive business plan with AI",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Create Project Roadmap",
      description: "Plan your 12-18 month development timeline",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Tech Stack Advisor",
      description: "Get budget-aware technology recommendations",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Browse Templates",
      description: "Access 25+ startup templates and resources",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  const recentActivity = [
    { action: "Welcome to AI Startup Studio!", time: "Just now", type: "welcome" },
    { action: "Account created successfully", time: "2 minutes ago", type: "success" },
    { action: "Profile setup completed", time: "2 minutes ago", type: "success" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Startup Studio</h1>
            </button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
                  <p className="text-xs text-gray-500">{mockUser.plan} Plan</p>
                </div>
              </div>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {mockUser.name.split(' ')[0]}! 🚀
          </h2>
          <p className="text-gray-600">
            Ready to build your next startup? Let's turn your ideas into reality.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Business Plans</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-500">remaining this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">10</p>
                <p className="text-xs text-gray-500">downloads available</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Plan</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.plan}</p>
                <button className="text-xs text-blue-600 hover:text-blue-800">Upgrade</button>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 shadow-sm border hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <div className={`bg-gradient-to-r ${action.color} bg-clip-text text-transparent`}>
                      {action.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'welcome' ? 'bg-blue-500' : 
                      activity.type === 'success' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">Account created</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">Profile set up</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Create your first project</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Generate business plan</span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Welcome! 🎉</h4>
                  <p className="text-green-700 text-xs mt-1">
                    You've successfully signed in to AI Startup Studio. Your journey to building amazing startups begins now!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
