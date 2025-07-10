// ----------------------------------
// Imports                          
// ----------------------------------
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Rocket, Sparkles, Calendar, Zap, Shield } from "lucide-react";
import { TYPOGRAPHY, SPACING, ANIMATIONS } from '../lib/constants'

const CTA = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/' } })
  }

  // Trust indicators with icons and enhanced content
  const trustIndicators = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "14 Days",
      subtitle: "Free Trial",
      description: "Full access to all features",
      color: "from-green-400 to-green-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "No Setup",
      subtitle: "Start Immediately",
      description: "Begin building in minutes",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cancel Anytime",
      subtitle: "No Long-term Commitment",
      description: "Flexibility you need",
      color: "from-purple-400 to-purple-600"
    }
  ]

  return (
    // Main CTA section with gradient background that blends from white
    <section className={`relative ${SPACING.section.desktop}`}>
      {/* Gradient background that transitions from white to blue-purple */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-100 to-blue-600 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 pointer-events-none"></div>
      
      {/* Container with max width and responsive padding */}
      <div className={`relative z-10 ${SPACING.container.medium} mx-auto text-center`}>
        
        {/* Header section with icon, title, and description */}
        <div className="mb-8">
          {/* Sparkles icon for visual appeal */}
          <Sparkles className="w-16 h-16 text-white mx-auto mb-6 opacity-90" />
          
          {/* Main headline with responsive text sizing */}
          <h2 className={`
            ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
            lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
            ${TYPOGRAPHY.weights.bold} 
            text-white mb-6
          `}>
            Ready to Build Your Startup?
          </h2>
          
          {/* Supporting description text */}
          <p className={`
            ${TYPOGRAPHY.sizes.body.large} 
            sm:${TYPOGRAPHY.sizes.cardTitle} 
            text-blue-100 mb-8 leading-relaxed 
            ${TYPOGRAPHY.weights.light}
          `}>
            Join 25,000+ entrepreneurs who've accelerated their startup journey with AI-powered guidance. 
            Go from idea to MVP in weeks, not months.
          </p>
        </div>

        {/* Call-to-action buttons section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {/* Primary CTA button - Free trial */}
          <button 
            className={`
              group bg-white text-blue-600 
              h-14 px-8 ${TYPOGRAPHY.sizes.body.small} ${TYPOGRAPHY.weights.semibold} 
              ${ANIMATIONS.transition} hover:bg-blue-50 
              flex items-center justify-center rounded-full 
              shadow-lg hover:scale-105 transform cursor-pointer mx-auto
            `}
            onClick={handleGetStarted}
          >
            <Rocket className={`w-5 h-5 mr-2 group-hover:translate-x-1 ${ANIMATIONS.transition} text-blue-600`} />
            Start Building Your Startup
            <ArrowRight className={`w-4 h-4 ml-2 group-hover:translate-x-1 ${ANIMATIONS.transition} text-blue-600`} />
          </button>
        </div>

        {/* Enhanced Trust indicators and key benefits grid */}
        <div className="mb-4">
          <p className={`${TYPOGRAPHY.sizes.body.base} text-blue-200 mb-8 ${TYPOGRAPHY.weights.light}`}>
            Everything you need to get started
          </p>
          
          <div className={`grid grid-cols-1 sm:grid-cols-3 ${SPACING.gaps.medium} max-w-4xl mx-auto`}>
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className={`
                  group bg-white/10 backdrop-blur-sm rounded-2xl p-6 
                  border border-white/20 ${ANIMATIONS.transition}
                  hover:bg-white/20 hover:scale-105 hover:shadow-xl
                  hover:border-white/30 cursor-pointer
                `}
              >
                {/* Icon with gradient background */}
                <div className={`
                  w-12 h-12 rounded-xl bg-gradient-to-r ${indicator.color} 
                  flex items-center justify-center text-white mb-4 mx-auto
                  group-hover:scale-110 ${ANIMATIONS.transition}
                `}>
                  {indicator.icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <div className={`
                    ${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} 
                    text-white mb-1 group-hover:text-blue-100 ${ANIMATIONS.transition}
                  `}>
                    {indicator.title}
                  </div>
                  <div className={`
                    ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.semibold} 
                    text-blue-200 mb-2 group-hover:text-blue-100 ${ANIMATIONS.transition}
                  `}>
                    {indicator.subtitle}
                  </div>
                  <div className={`
                    ${TYPOGRAPHY.sizes.tiny} text-blue-300 
                    group-hover:text-blue-200 ${ANIMATIONS.transition}
                  `}>
                    {indicator.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;