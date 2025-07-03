// ----------------------------------
// Imports                          
// ----------------------------------
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Rocket, Sparkles } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/' } })
  }

  return (
    // Main CTA section with gradient background that blends from white
    <section className="relative py-20">
      {/* Gradient background that transitions from white to blue-purple */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-100 to-blue-600 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 pointer-events-none"></div>
              {/* Container with max width and responsive padding */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* Header section with icon, title, and description */}
        <div className="mb-8">
          {/* Sparkles icon for visual appeal */}
          <Sparkles className="w-16 h-16 text-white mx-auto mb-6 opacity-90" />
          
          {/* Main headline with responsive text sizing */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Your Startup?
          </h2>
          
          {/* Supporting description text */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
            Join 25,000+ entrepreneurs who've accelerated their startup journey with AI-powered guidance. 
            Go from idea to MVP in weeks, not months.
          </p>
        </div>

        {/* Call-to-action buttons section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {/* Primary CTA button - Free trial */}
          <button className="group bg-white text-blue-600 h-14 px-8 text-base font-semibold transition-all duration-300 hover:bg-blue-50 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transform cursor-pointer mx-auto" onClick={handleGetStarted}>
                <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform text-blue-600" />
                Start Building Your Startup
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-blue-600" />
          </button>
        </div>

        {/* Trust indicators and key benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-blue-100">
          {/* Free trial duration */}
          <div>
            <div className="text-2xl font-bold text-white mb-1">14 Days</div>
            <div className="text-sm">Free Trial</div>
          </div>
          
          {/* No setup required */}
          <div>
            <div className="text-2xl font-bold text-white mb-1">No Setup</div>
            <div className="text-sm">Start Immediately</div>
          </div>
          
          {/* Flexible cancellation */}
          <div>
            <div className="text-2xl font-bold text-white mb-1">Cancel Anytime</div>
            <div className="text-sm">No Long-term Commitment</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;