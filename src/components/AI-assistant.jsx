import React, { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Paperclip, 
  Mic, 
  MicOff, 
  Image, 
  FileText, 
  Download, 
  Trash2, 
  FolderPlus, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Zap,
  Brain,
  Command,
  Upload,
  X,
  ChevronRight,
  Star,
  BarChart3,
  Folder,
  Settings
} from 'lucide-react'

const AIassistant = () => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [showUploadArea, setShowUploadArea] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your AI Assistant. I can help you manage your projects, analyze data, and streamline your workflow. What would you like to know or do today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const suggestedCommands = [
    {
      category: 'Project Management',
      commands: [
        { text: "What's my most recent project?", icon: Clock },
        { text: "Show me project performance metrics", icon: BarChart3 },
        { text: "Create a new project folder", icon: FolderPlus },
        { text: "Download all assets from AI Startup Studio", icon: Download }
      ]
    },
    {
      category: 'Analytics & Insights',
      commands: [
        { text: "Which project has the highest revenue potential?", icon: TrendingUp },
        { text: "Show me team productivity stats", icon: BarChart3 },
        { text: "Generate project summary report", icon: FileText },
        { text: "Analyze current workflow efficiency", icon: Zap }
      ]
    },
    {
      category: 'Quick Actions',
      commands: [
        { text: "Delete yesterday's project", icon: Trash2 },
        { text: "Export project data to CSV", icon: Download },
        { text: "Schedule project review meeting", icon: Clock },
        { text: "Update project status to completed", icon: Settings }
      ]
    }
  ]

  const demoResponses = {
    "What's my most recent project?": {
      content: "Your most recent project is **AI Startup Studio** (updated 2 hours ago). This SaaS project is currently in Series A funding stage with 85% completion rate. Would you like me to show you detailed analytics or recent activity?",
      actions: ['Show Analytics', 'View Recent Activity', 'Open Project']
    },
    "Which project has the highest revenue potential?": {
      content: "Based on market analysis and current metrics, **Healthcare SaaS** shows the highest revenue potential with:\n\n• Projected ARR: $2.4M\n• Market size: $15.2B\n• Competition level: Medium\n• Current progress: 91%\n\nWould you like a detailed revenue projection report?",
      actions: ['Generate Report', 'View Competitors', 'See Projections']
    },
    "Show me project performance metrics": {
      content: "Here's your project performance overview:\n\n**Active Projects:** 5\n**Avg. Completion Rate:** 78%\n**Total Hours Saved:** 156h\n**AI Tools Usage:** +23% this month\n\n**Top Performing:** Healthcare SaaS (91%)\n**Needs Attention:** E-commerce Platform (45%)",
      actions: ['Detailed Analytics', 'Export Data', 'Schedule Review']
    },
    "Create a new project folder": {
      content: "I'll help you create a new project folder. Please provide:\n\n1. Project name\n2. Project type (SaaS, E-commerce, Fintech, etc.)\n3. Initial team members\n4. Estimated timeline\n\nOr would you like me to create a folder based on a template?",
      actions: ['Use Template', 'Custom Setup', 'Import Existing']
    },
    "Download all assets from AI Startup Studio": {
      content: "Preparing download package for **AI Startup Studio**...\n\n**Assets included:**\n• Design files (24 items)\n• Documentation (12 files)\n• Code repositories (3 repos)\n• Marketing materials (8 files)\n\n**Total size:** 2.4 GB\n\nReady to download?",
      actions: ['Download Now', 'Select Specific Files', 'Schedule Download']
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = demoResponses[message] || {
        content: "I understand you're asking about: \"" + message + "\"\n\nThis is a demo response. In the full implementation, I would analyze your request and provide specific insights about your projects, data, and workflows.",
        actions: ['Learn More', 'Try Another Command', 'View Documentation']
      }

      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: response.content,
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleCommandClick = (command) => {
    setMessage(command)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleActionClick = (action) => {
    const actionMessage = {
      id: messages.length + 1,
      type: 'user',
      content: `${action} (Action clicked)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, actionMessage])
    setIsTyping(true)

    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        type: 'assistant',
        content: `Action "${action}" has been executed successfully. This is a demo response showing how the AI would handle your request.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="ai-assistant-container">
      <div className="ai-assistant-content">

        {/* Main Chat Area */}
        <div className="ai-chat-container">
          {/* Messages */}
          <div className="messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.type}`}>
                <div className="message-avatar">
                  {msg.type === 'assistant' ? (
                    <div className="ai-message-avatar">
                      <Bot className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="user-message-avatar">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {msg.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  {msg.actions && (
                    <div className="message-actions">
                      {msg.actions.map((action, index) => (
                        <button
                          key={index}
                          className="action-button"
                          onClick={() => handleActionClick(action)}
                        >
                          {action}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="message-footer">
                    <span className="message-time">{msg.timestamp}</span>
                    {msg.type === 'assistant' && (
                      <div className="message-reactions">
                        <button className="reaction-btn">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="reaction-btn">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button className="reaction-btn">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="message assistant">
                <div className="message-avatar">
                  <div className="ai-message-avatar">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Commands */}
          <div className="suggestions-container">
            <div className="suggestions-header">
              <Command className="w-5 h-5" />
              <span>Suggested Commands</span>
            </div>
            <div className="suggestions-grid">
              {suggestedCommands.map((category, categoryIndex) => (
                <div key={categoryIndex} className="suggestion-category">
                  <h4 className="category-title">{category.category}</h4>
                  <div className="category-commands">
                    {category.commands.map((command, commandIndex) => {
                      const Icon = command.icon
                      return (
                        <button
                          key={commandIndex}
                          className="suggestion-command"
                          onClick={() => handleCommandClick(command.text)}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{command.text}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="ai-input-container">
          {/* File Upload Area */}
          {showUploadArea && (
            <div className="upload-area">
              <div className="upload-header">
                <span>Attach Files</span>
                <button 
                  className="close-upload"
                  onClick={() => setShowUploadArea(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-8 h-8" />
                <p>Click to upload or drag files here</p>
                <span className="upload-hint">Supports images, documents, and project files</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="uploaded-file">
                  <div className="file-info">
                    <FileText className="w-4 h-4" />
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{formatFileSize(file.size)}</span>
                  </div>
                  <button
                    className="remove-file"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="input-bar">
            <div className="input-actions-left">
              <button 
                className="input-action-btn"
                onClick={() => setShowUploadArea(!showUploadArea)}
                title="Attach files"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button 
                className={`input-action-btn ${isRecording ? 'recording' : ''}`}
                onClick={() => setIsRecording(!isRecording)}
                title={isRecording ? 'Stop recording' : 'Voice input'}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="input-field-container">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your projects, or try a command..."
                className="message-input"
                rows={1}
              />
            </div>
            
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Input Hints */}
          <div className="input-hints">
            <div className="hint-item">
              <Zap className="w-4 h-4" />
              <span>Try: "What's my most recent project?"</span>
            </div>
            <div className="hint-item">
              <Star className="w-4 h-4" />
              <span>Pro tip: Use voice commands for faster interaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIassistant
