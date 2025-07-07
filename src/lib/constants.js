// ==========================================
// AI STARTUP STUDIO - DESIGN SYSTEM
// ==========================================
// Centralized design constants for consistent styling across all components

// ==========================================
// COLOR PALETTE
// ==========================================
export const COLORS = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af'
  },
  
  // Secondary Colors
  secondary: {
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9'
  },
  
  // Accent Colors
  accent: {
    green: { 500: '#10b981', 600: '#059669' },
    purple: { 500: '#8b5cf6', 600: '#7c3aed' },
    orange: { 500: '#f59e0b', 600: '#d97706' },
    pink: { 500: '#ec4899', 600: '#db2777' },
    red: { 500: '#ef4444', 600: '#dc2626' }
  },
  
  // Neutral Colors
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    300: '#cbd5e1',
    600: '#475569',
    700: '#334155',
    900: '#0f172a'
  },
  
  // Semantic Colors
  success: { 500: '#10b981', 600: '#059669' },
  warning: { 500: '#f59e0b', 600: '#d97706' },
  error: { 500: '#ef4444', 600: '#dc2626' },
  info: { 500: '#3b82f6', 600: '#2563eb' }
}

// ==========================================
// TYPOGRAPHY SCALE
// ==========================================
export const TYPOGRAPHY = {
  // Font Families
  fonts: {
    primary: 'Outfit, sans-serif',
    secondary: 'Playfair, serif'
  },
  
  // Font Sizes (responsive)
  sizes: {
    // Hero Titles
    hero: {
      mobile: 'text-4xl',      // 36px
      tablet: 'text-6xl',     // 60px  
      desktop: 'text-8xl'     // 128px
    },
    
    // Page Titles
    pageTitle: {
      mobile: 'text-3xl',     // 30px
      tablet: 'text-4xl',     // 36px
      desktop: 'text-5xl'     // 48px
    },
    
    // Section Titles
    sectionTitle: {
      mobile: 'text-2xl',     // 24px
      tablet: 'text-3xl',     // 30px
      desktop: 'text-4xl'     // 36px
    },
    
    // Card Titles
    cardTitle: 'text-xl',     // 20px
    
    // Body Text
    body: {
      large: 'text-xl',       // 20px
      base: 'text-lg',        // 18px
      small: 'text-base'      // 16px
    },
    
    // Small Text
    caption: 'text-sm',       // 14px
    tiny: 'text-xs'          // 12px
  },
  
  // Font Weights
  weights: {
    light: 'font-light',     // 300
    normal: 'font-normal',   // 400
    medium: 'font-medium',   // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold'        // 700
  }
}

// ==========================================
// SPACING SCALE
// ==========================================
export const SPACING = {
  // Section Padding
  section: {
    mobile: 'py-12 px-4',
    desktop: 'py-20 px-4 sm:px-6 lg:px-8'
  },
  
  // Container Max Widths
  container: {
    small: 'max-w-4xl',
    medium: 'max-w-6xl', 
    large: 'max-w-7xl'
  },
  
  // Gap Sizes
  gaps: {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8',
    xl: 'gap-12'
  }
}

// ==========================================
// COMPONENT STYLES
// ==========================================
export const COMPONENTS = {
  // Button Styles
  buttons: {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white 
      h-14 px-8 text-base font-semibold 
      transition-all duration-300 ease-in-out
      hover:from-blue-700 hover:to-blue-800 
      flex items-center justify-center rounded-full 
      shadow-lg hover:scale-105 transform cursor-pointer
    `,
    secondary: `
      h-14 px-8 rounded-full border-2 border-blue-300 
      bg-white text-blue-600 text-base font-semibold
      hover:bg-blue-50 hover:border-blue-400 
      transition-all duration-300 ease-in-out
      flex items-center justify-center cursor-pointer
    `,
    outline: `
      border-2 border-slate-300 text-slate-700 
      hover:bg-slate-50 transition-all duration-300 ease-in-out
      cursor-pointer
    `
  },
  
  // Card Styles
  cards: {
    base: `
      bg-white rounded-2xl shadow-lg hover:shadow-xl 
      transition-all duration-300 border border-slate-100
    `,
    interactive: `
      bg-white rounded-2xl shadow-lg hover:shadow-xl 
      transition-all duration-300 border border-slate-100
      hover:border-blue-200 hover:scale-105 cursor-pointer
    `,
    featured: `
      bg-white rounded-2xl shadow-xl hover:shadow-2xl
      transition-all duration-500 border-2 border-blue-600
      scale-105
    `
  },
  
  // Background Decorations
  backgrounds: {
    page: 'min-h-screen bg-gradient-to-br from-slate-50 to-gray-100',
    hero: 'min-h-screen bg-gradient-to-br from-gray-50 to-blue-50',
    decorative: `
      absolute inset-0 bg-grid-slate-100 opacity-30 pointer-events-none
    `,
    blurShapes: `
      absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none
    `
  }
}

// ==========================================
// ANIMATION PRESETS
// ==========================================
export const ANIMATIONS = {
  // Common Transitions
  transition: 'transition-all duration-300 ease-in-out',
  
  // Fade In Animations
  fadeIn: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  
  fadeInScale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 }
  },
  
  // Stagger Animations
  stagger: {
    container: {
      animate: {
        transition: { staggerChildren: 0.1 }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    }
  },
  
  // Hover Animations
  hover: {
    scale: 'hover:scale-105 transition-transform duration-300',
    lift: 'hover:shadow-xl transition-shadow duration-300',
    glow: 'hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300'
  }
}

// ==========================================
// GRADIENT PRESETS
// ==========================================
export const GRADIENTS = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
  secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
  success: 'bg-gradient-to-r from-green-500 to-green-600',
  warning: 'bg-gradient-to-r from-orange-500 to-orange-600',
  
  // Background Gradients
  pageBackground: 'bg-gradient-to-br from-slate-50 to-gray-100',
  heroBackground: 'bg-gradient-to-br from-gray-50 to-blue-50',
  sectionBackground: 'bg-gradient-to-r from-blue-600 to-purple-600'
}

// ==========================================
// BREAKPOINTS
// ==========================================
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px', 
  desktop: '1024px',
  wide: '1280px'
}

// ==========================================
// CONTENT CONSTANTS
// ==========================================
export const CONTENT = {
  // Company Info
  company: {
    name: 'AI Startup Studio',
    tagline: 'From Idea to MVP in Seconds',
    description: 'The complete AI-powered platform for startup creation'
  },
  
  // Common CTAs
  cta: {
    primary: 'Start Building Your Startup',
    secondary: 'Sign Up',
    learn: 'Learn More',
    getStarted: 'Get Started'
  },
  
  // Social Proof Numbers
  stats: {
    users: '25,000+',
    startups: '5M+',
    timeReduction: '85%',
    successRate: '95%',
    tools: '7'
  }
} 