import React, { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Target,
  Flag,
  Video,
  MapPin,
  MoreHorizontal,
  Edit3,
  Trash2,
  Bell,
  Repeat,
  User,
  Building,
  Zap,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Briefcase
} from 'lucide-react'

const ProjectCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // 'month', 'week', 'day'
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showEventModal, setShowEventModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEventTypes, setSelectedEventTypes] = useState(['all'])

  // Event types with colors and icons
  const eventTypes = [
    { id: 'meeting', name: 'Meetings', color: '#3b82f6', icon: Users, count: 12 },
    { id: 'deadline', name: 'Deadlines', color: '#ef4444', icon: Flag, count: 8 },
    { id: 'milestone', name: 'Milestones', color: '#8b5cf6', icon: Target, count: 3 },
    { id: 'development', name: 'Development', color: '#10b981', icon: Zap, count: 15 },
    { id: 'business', name: 'Business', color: '#f59e0b', icon: Briefcase, count: 6 },
    { id: 'personal', name: 'Personal', color: '#64748b', icon: User, count: 4 }
  ]

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Daily Standup',
      type: 'meeting',
      date: '2024-01-22',
      startTime: '09:00',
      endTime: '09:30',
      attendees: ['Sarah Chen', 'Mike Rodriguez', 'Alex Kim'],
      location: 'Conference Room A',
      description: 'Daily team sync and progress updates',
      recurring: 'daily',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'MVP Beta Deadline',
      type: 'deadline',
      date: '2024-01-25',
      startTime: '17:00',
      endTime: '17:00',
      description: 'Complete MVP beta version for testing',
      priority: 'high',
      milestone: true
    },
    {
      id: 3,
      title: 'Investor Pitch Meeting',
      type: 'business',
      date: '2024-01-24',
      startTime: '14:00',
      endTime: '15:30',
      attendees: ['John Smith (VC)', 'Emma Wilson'],
      location: 'Zoom',
      description: 'Series A funding pitch presentation',
      priority: 'critical'
    },
    {
      id: 4,
      title: 'Sprint Planning',
      type: 'meeting',
      date: '2024-01-23',
      startTime: '10:00',
      endTime: '12:00',
      attendees: ['Sarah Chen', 'Mike Rodriguez', 'Alex Kim', 'Jordan Taylor'],
      location: 'Conference Room B',
      description: 'Plan next sprint tasks and priorities',
      priority: 'high'
    },
    {
      id: 5,
      title: 'Product Launch',
      type: 'milestone',
      date: '2024-01-30',
      startTime: '10:00',
      endTime: '10:00',
      description: 'Official product launch and announcement',
      priority: 'critical'
    },
    {
      id: 6,
      title: 'Code Review Session',
      type: 'development',
      date: '2024-01-22',
      startTime: '15:00',
      endTime: '16:00',
      attendees: ['Mike Rodriguez', 'Jordan Taylor'],
      description: 'Review authentication implementation',
      priority: 'medium'
    },
    {
      id: 7,
      title: 'UI/UX Design Review',
      type: 'development',
      date: '2024-01-26',
      startTime: '11:00',
      endTime: '12:30',
      attendees: ['Sarah Chen', 'Alex Kim'],
      description: 'Review new dashboard designs',
      priority: 'medium'
    },
    {
      id: 8,
      title: 'Team Lunch',
      type: 'personal',
      date: '2024-01-26',
      startTime: '12:30',
      endTime: '13:30',
      location: 'Local Restaurant',
      description: 'Team bonding lunch',
      priority: 'low'
    }
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getEventColor = (type) => {
    return eventTypes.find(t => t.id === type)?.color || '#64748b'
  }

  const getEventIcon = (type) => {
    return eventTypes.find(t => t.id === type)?.icon || CalendarIcon
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#dc2626'
      case 'high': return '#ea580c'
      case 'medium': return '#ca8a04'
      case 'low': return '#65a30d'
      default: return '#6b7280'
    }
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction * 7))
    setCurrentDate(newDate)
  }

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + direction)
    setCurrentDate(newDate)
  }

  const handleNavigation = (direction) => {
    switch (viewMode) {
      case 'month':
        navigateMonth(direction)
        break
      case 'week':
        navigateWeek(direction)
        break
      case 'day':
        navigateDay(direction)
        break
    }
  }

  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDay = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay))
      currentDay.setDate(currentDay.getDate() + 1)
    }
    
    return days
  }

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const renderMonthView = () => {
    const calendarDays = getCalendarDays()
    const currentMonth = currentDate.getMonth()

    return (
      <div className="calendar-month-view">
        <div className="calendar-grid-header">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDate(day)
            const isCurrentMonth = day.getMonth() === currentMonth
            const isToday = day.toDateString() === new Date().toDateString()
            const isSelected = day.toDateString() === selectedDate.toDateString()

            return (
              <div
                key={index}
                className={`calendar-day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="day-number">{day.getDate()}</div>
                <div className="day-events">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="day-event"
                      style={{ backgroundColor: getEventColor(event.type) }}
                    >
                      <span className="event-title">{event.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="more-events">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    const weekDays = getWeekDays()
    const timeSlots = []
    
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(hour)
    }

    return (
      <div className="calendar-week-view">
        <div className="week-header">
          <div className="time-column-header"></div>
          {weekDays.map(day => {
            const isToday = day.toDateString() === new Date().toDateString()
            return (
              <div key={day.toISOString()} className={`week-day-header ${isToday ? 'today' : ''}`}>
                <div className="week-day-name">{daysOfWeek[day.getDay()]}</div>
                <div className="week-day-number">{day.getDate()}</div>
              </div>
            )
          })}
        </div>
        <div className="week-grid">
          <div className="time-column">
            {timeSlots.map(hour => (
              <div key={hour} className="time-slot">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
            ))}
          </div>
          {weekDays.map(day => {
            const dayEvents = getEventsForDate(day)
            return (
              <div key={day.toISOString()} className="week-day-column">
                {timeSlots.map(hour => (
                  <div key={hour} className="week-time-slot">
                    {dayEvents
                      .filter(event => parseInt(event.startTime.split(':')[0]) === hour)
                      .map(event => {
                        const Icon = getEventIcon(event.type)
                        return (
                          <div
                            key={event.id}
                            className="week-event"
                            style={{ backgroundColor: getEventColor(event.type) }}
                          >
                            <div className="week-event-content">
                              <Icon className="w-3 h-3" />
                              <span className="week-event-title">{event.title}</span>
                              <span className="week-event-time">{formatTime(event.startTime)}</span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate)
    const timeSlots = []
    
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(hour)
    }

    return (
      <div className="calendar-day-view">
        <div className="day-header">
          <h3 className="day-title">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <div className="day-events-count">
            {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="day-timeline">
          {timeSlots.map(hour => {
            const hourEvents = dayEvents.filter(event => 
              parseInt(event.startTime.split(':')[0]) === hour
            )
            
            return (
              <div key={hour} className="day-time-slot">
                <div className="day-time-label">
                  {hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
                </div>
                <div className="day-time-events">
                  {hourEvents.map(event => {
                    const Icon = getEventIcon(event.type)
                    return (
                      <div
                        key={event.id}
                        className="day-event-card"
                        style={{ borderLeftColor: getEventColor(event.type) }}
                      >
                        <div className="day-event-header">
                          <div className="day-event-title">
                            <Icon className="w-4 h-4" style={{ color: getEventColor(event.type) }} />
                            <span>{event.title}</span>
                          </div>
                          <div className="day-event-time">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </div>
                        </div>
                        <div className="day-event-details">
                          {event.location && (
                            <div className="day-event-detail">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.attendees && (
                            <div className="day-event-detail">
                              <Users className="w-3 h-3" />
                              <span>{event.attendees.length} attendees</span>
                            </div>
                          )}
                          {event.description && (
                            <p className="day-event-description">{event.description}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  {hourEvents.length === 0 && (
                    <div className="day-time-empty">
                      <button className="add-event-btn" onClick={() => setShowEventModal(true)}>
                        <Plus className="w-3 h-3" />
                        Add event
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="calendar-header-content">
          <h1 className="calendar-title">Project Calendar</h1>
          <p className="calendar-subtitle">Schedule meetings, track deadlines, and manage your startup timeline</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="calendar-stats-grid">
        <div className="calendar-stat-card">
          <div className="stat-icon meetings">
            <Users className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{events.filter(e => e.type === 'meeting').length}</span>
            <span className="stat-label">Meetings This Week</span>
          </div>
        </div>
        <div className="calendar-stat-card">
          <div className="stat-icon deadlines">
            <Flag className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{events.filter(e => e.type === 'deadline').length}</span>
            <span className="stat-label">Upcoming Deadlines</span>
          </div>
        </div>
        <div className="calendar-stat-card">
          <div className="stat-icon milestones">
            <Target className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{events.filter(e => e.type === 'milestone').length}</span>
            <span className="stat-label">Active Milestones</span>
          </div>
        </div>
        <div className="calendar-stat-card">
          <div className="stat-icon today">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{getEventsForDate(new Date()).length}</span>
            <span className="stat-label">Events Today</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="calendar-controls">
        <div className="calendar-controls-left">
          <button className="calendar-action-btn primary" onClick={() => setShowEventModal(true)}>
            <Plus className="w-4 h-4" />
            New Event
          </button>
          <button className="calendar-action-btn secondary" onClick={() => setCurrentDate(new Date())}>
            <CalendarIcon className="w-4 h-4" />
            Today
          </button>
        </div>

        <div className="calendar-controls-center">
          <div className="calendar-navigation">
            <button className="nav-btn" onClick={() => handleNavigation(-1)}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="current-period">
              {viewMode === 'month' && `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
              {viewMode === 'week' && `Week of ${currentDate.toLocaleDateString()}`}
              {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <button className="nav-btn" onClick={() => handleNavigation(1)}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="calendar-controls-right">
          <div className="calendar-search">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="calendar-search-input"
            />
          </div>
          <div className="calendar-view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Event Type Filters */}
      <div className="calendar-filters">
        <div className="filter-label">Show:</div>
        {eventTypes.map(type => (
          <button
            key={type.id}
            className={`calendar-filter-btn ${selectedEventTypes.includes(type.id) || selectedEventTypes.includes('all') ? 'active' : ''}`}
            style={{ 
              '--filter-color': type.color,
              backgroundColor: selectedEventTypes.includes(type.id) || selectedEventTypes.includes('all') ? type.color : 'transparent',
              color: selectedEventTypes.includes(type.id) || selectedEventTypes.includes('all') ? 'white' : type.color
            }}
            onClick={() => {
              if (selectedEventTypes.includes(type.id)) {
                setSelectedEventTypes(selectedEventTypes.filter(id => id !== type.id))
              } else {
                setSelectedEventTypes([...selectedEventTypes.filter(id => id !== 'all'), type.id])
              }
            }}
          >
            <type.icon className="w-3 h-3" />
            <span>{type.name}</span>
            <span className="filter-count">{type.count}</span>
          </button>
        ))}
      </div>

      {/* Calendar Content */}
      <div className="calendar-content">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </div>
    </div>
  )
}

export default ProjectCalendar
