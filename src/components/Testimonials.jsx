import React, { useState } from 'react'
import { Star, Quote, ArrowLeft, ArrowRight, Zap, Target, Rocket } from 'lucide-react'
import { AuroraText } from './ui/Aurora-text';
import { ANIMATIONS, TYPOGRAPHY, SPACING } from '../lib/constants'

const Testimonials = () => {
  // State for active testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Testimonials data with focus on quality, accuracy, and speed - Regular users
  const testimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "First-time Entrepreneur",
      company: "College Student",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9a1e89d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As someone with zero business experience, AI Startup Studio guided me through every step. The AI suggestions were incredibly helpful and saved me months of research.",
      highlight: "Zero to Business Plan",
      metric: "3 Months Saved"
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Solo Developer",
      company: "Freelancer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I've been coding for years but never knew how to turn my ideas into a business. This platform helped me understand market validation, pricing strategies, and even generated my MVP roadmap. Game changer!",
      highlight: "From Code to Business",
      metric: "MVP in 2 Weeks"
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Recent Graduate",
      company: "Job Seeker",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Instead of applying for jobs, I decided to create one for myself. The AI helped me validate my idea, create financial projections, and build a prototype. I'm now working on my own startup!",
      highlight: "Created My Own Job",
      metric: "Prototype Built"
    },
    {
      id: 4,
      name: "Sarah Chen",
      role: "Working Professional",
      company: "Side Project",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I always had ideas but never knew where to start. Working full-time made it hard to research everything. This AI platform did the heavy lifting - market analysis, competitor research, everything!",
      highlight: "Side Project Success",
      metric: "Nights & Weekends"
    }
  ]

  // Navigation functions for testimonial carousel
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className={SPACING.section.desktop}>
      <div className={`${SPACING.container.large} mx-auto relative`}>

        {/* Section header with compelling messaging */}
        <div className={`text-center ${SPACING.section.mobile}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <span className={`ml-2 ${TYPOGRAPHY.sizes.body.large} ${TYPOGRAPHY.weights.semibold} text-gray-700`}>5.0 from 2,500+ founders</span>
          </div>
          
          <h2 className={`
            ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
            lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
            ${TYPOGRAPHY.weights.bold} 
            text-gray-900 mb-6
          `}>
            Founders Love Our   <AuroraText> AI-Powered </AuroraText> Approach
          </h2>
          
          <p className={`
            ${TYPOGRAPHY.sizes.body.large} 
            text-gray-600 
            ${TYPOGRAPHY.weights.light} 
            max-w-3xl mx-auto leading-relaxed
          `}>
            Join thousands of successful entrepreneurs who've accelerated their startup journey with our 
            high-quality, accurate, and lightning-fast AI guidance.
          </p>
        </div>

        {/* Key benefits showcase */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${SPACING.section.mobile}`}>
          {/* Speed benefit */}
          <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl ${ANIMATIONS.transition} border border-gray-100`}>
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className={`
              ${TYPOGRAPHY.sizes.body.large} 
              ${TYPOGRAPHY.weights.bold} 
              text-gray-900 mb-2 hover:text-green-600 ${ANIMATIONS.transition} cursor-pointer
            `}>
              Lightning Fast
            </h3>
            <p className="text-gray-600">From idea to MVP in weeks, not months. Our AI workflow is 10x faster than traditional development.</p>
          </div>
          
          {/* Accuracy benefit */}
          <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl ${ANIMATIONS.transition} border border-gray-100`}>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className={`
              ${TYPOGRAPHY.sizes.body.large} 
              ${TYPOGRAPHY.weights.bold} 
              text-gray-900 mb-2 hover:text-purple-600 ${ANIMATIONS.transition} cursor-pointer
            `}>
              Pinpoint Accuracy
            </h3>
            <p className="text-gray-600">98% accurate market insights and technical recommendations based on real startup data.</p>
          </div>
          
          {/* Quality benefit */}
          <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl ${ANIMATIONS.transition} border border-gray-100`}>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className={`
              ${TYPOGRAPHY.sizes.body.large} 
              ${TYPOGRAPHY.weights.bold} 
              text-gray-900 mb-2 hover:text-blue-600 ${ANIMATIONS.transition} cursor-pointer
            `}>
              Premium Quality
            </h3>
            <p className="text-gray-600">Production-ready code and enterprise-grade architecture from day one.</p>
          </div>
        </div>

        {/* Interactive testimonial carousel */}
        <div className="relative">
          {/* Main testimonial card */}
          <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 transform ${ANIMATIONS.transition} hover:scale-105`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* User avatar and info */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
                  <span className={`text-white ${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold}`}>
                    {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className={`${TYPOGRAPHY.sizes.body.large} ${TYPOGRAPHY.weights.bold} text-gray-900`}>{testimonials[activeTestimonial].name}</h4>
                <p className={`text-gray-600 ${TYPOGRAPHY.weights.medium}`}>{testimonials[activeTestimonial].role}</p>
                <p className={`text-blue-600 ${TYPOGRAPHY.weights.semibold}`}>{testimonials[activeTestimonial].company}</p>
                
                {/* Star rating */}
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 text-yellow-400 fill-current hover:text-yellow-500 ${ANIMATIONS.transition}`} />
                  ))}
                </div>
              </div>
              
              {/* Testimonial content */}
              <div className="flex-1">
                <Quote className="w-12 h-12 text-blue-200 mb-4" />
                <blockquote className={`
                  ${TYPOGRAPHY.sizes.body.large} 
                  md:${TYPOGRAPHY.sizes.cardTitle} 
                  text-gray-800 leading-relaxed mb-6 
                  ${TYPOGRAPHY.weights.medium} 
                  hover:text-gray-900 ${ANIMATIONS.transition} cursor-default
                `}>
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                
                {/* Highlight metrics */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                    <span className={`text-blue-800 ${TYPOGRAPHY.weights.bold} ${TYPOGRAPHY.sizes.body.small}`}>{testimonials[activeTestimonial].highlight}</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 px-4 py-2 rounded-full">
                    <span className={`text-green-800 ${TYPOGRAPHY.weights.bold} ${TYPOGRAPHY.sizes.body.small}`}>{testimonials[activeTestimonial].metric}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={prevTestimonial}
              className={`w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 ${ANIMATIONS.transition} group cursor-pointer`}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </button>
            
            {/* Testimonial indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${ANIMATIONS.transition} ${
                    index === activeTestimonial 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className={`w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 ${ANIMATIONS.transition} group cursor-pointer`}
            >
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className={`text-gray-500 mb-8 ${TYPOGRAPHY.sizes.body.large} hover:text-gray-700 ${ANIMATIONS.transition}`}>Trusted by aspiring entrepreneurs worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-gray-400 hover:text-blue-600 hover:opacity-100 ${ANIMATIONS.transition}`}>College Students</div>
            <div className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-gray-400 hover:text-purple-600 hover:opacity-100 ${ANIMATIONS.transition}`}>Solo Developers</div>
            <div className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-gray-400 hover:text-green-600 hover:opacity-100 ${ANIMATIONS.transition}`}>First-time Founders</div>
            <div className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-gray-400 hover:text-orange-600 hover:opacity-100 ${ANIMATIONS.transition}`}>Side Hustlers</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
