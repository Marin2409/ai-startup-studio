import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus, HelpCircle, Sparkles, Shield, Users, Target, X, Send, Mail } from 'lucide-react'
import { AuroraText } from './ui/Aurora-text';
import { TYPOGRAPHY, SPACING, ANIMATIONS, COMPONENTS } from '../lib/constants'; 

const FAQ = () => {
  const navigate = useNavigate()
  
  // State for managing which FAQ items are open
  const [openItems, setOpenItems] = useState(new Set(['0-0'])) // First item open by default
  
  // State for managing the message popup modal
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  })

  // Disable/enable body scrolling when modal opens/closes
  useEffect(() => {
    if (showMessageModal) {
      // Disable scrolling
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [showMessageModal])

  // Toggle function for accordion
  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmitMessage = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Message submitted:', formData)
    // Reset form and close modal
    setFormData({ email: '', subject: '', message: '' })
    setShowMessageModal(false)
    // You could show a success toast here
  }

  // Close modal when clicking outside or pressing escape
  const closeModal = () => {
    setShowMessageModal(false)
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showMessageModal) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showMessageModal])

  // Comprehensive FAQ data focused on AI Startup Studio
  const faqData = [
    {
      category: "Getting Started",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      questions: [
        {
          question: "How quickly can I create a complete business plan with AI?",
          answer: "Our AI can generate a comprehensive 15-20 page business plan in just 5-10 minutes. This includes market analysis, financial projections, competitive landscape, and strategic recommendations. You can then customize and refine it to match your specific vision."
        },
        {
          question: "Do I need any technical or business experience to use the platform?",
          answer: "Not at all! Our platform is designed for first-time entrepreneurs and non-technical founders. The AI guides you through every step with simple questions and provides explanations for all recommendations. We've helped thousands of complete beginners launch successful startups."
        },
        {
          question: "What makes your AI different from generic business plan templates?",
          answer: "Our AI analyzes real-time market data, competitor insights, and industry trends to create personalized recommendations. Unlike static templates, our AI adapts to your specific industry, target market, and business model to provide actionable, data-driven guidance."
        }
      ]
    },
    {
      category: "Features & Tools",
      icon: <Target className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      questions: [
        {
          question: "Can the AI help me validate my startup idea before I invest time and money?",
          answer: "Absolutely! Our market validation tools analyze demand signals, competition density, market size, and entry barriers. We provide a comprehensive feasibility score and highlight potential challenges or opportunities you might have missed."
        },
        {
          question: "Does the platform generate actual code for my MVP?",
          answer: "Yes! Our AI can generate production-ready code scaffolding, database schemas, API endpoints, and even basic frontend components. We support popular tech stacks like React, Node.js, Python, and more. You get a head start with clean, documented code."
        },
        {
          question: "How accurate are the financial projections and market analysis?",
          answer: "Our AI uses data from 50+ sources including market research firms, government databases, and real startup metrics. Financial projections are based on industry benchmarks and comparable companies. We maintain 85%+ accuracy in our market sizing and 78% accuracy in revenue predictions."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      icon: <Shield className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      questions: [
        {
          question: "Can I try the platform before committing to a paid plan?",
          answer: "Yes! Our free Starter plan lets you create one complete project with access to basic AI tools. You can generate a business plan, create a roadmap, and explore most features. No credit card required to get started."
        },
        {
          question: "What happens if I need to cancel or downgrade my subscription?",
          answer: "You can cancel anytime with no penalties. Your data remains safe for 90 days after cancellation. Downgrades take effect at your next billing cycle, and you keep access to premium features until then. We also offer a 30-day money-back guarantee."
        },
        {
          question: "Do you offer discounts for students or early-stage startups?",
          answer: "Yes! We offer 50% off for verified students and recent graduates. Early-stage startups in accelerator programs get 40% off Professional plans. Non-profits and social impact startups qualify for special pricing. Contact us for eligibility verification."
        }
      ]
    },
    {
      category: "Support & Success",
      icon: <Users className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600",
      questions: [
        {
          question: "What kind of support do you provide to help me succeed?",
          answer: "Professional and Enterprise users get priority email support, live chat, and access to our startup success community. We also provide weekly office hours with startup mentors, resource libraries, and integration with popular tools like Slack and Notion."
        },
        {
          question: "Can I collaborate with my co-founders and team members?",
          answer: "Absolutely! Professional plans support up to 5 team members with role-based permissions. Enterprise plans offer unlimited team members, advanced collaboration tools, version control, and team analytics. Everyone can contribute to different sections simultaneously."
        },
        {
          question: "How do you ensure my startup idea and data remain confidential?",
          answer: "We use enterprise-grade security with AES-256 encryption, SOC 2 compliance, and GDPR adherence. Your data is never used to train our AI models or shared with third parties. We can also sign custom NDAs for Enterprise customers with sensitive intellectual property."
        }
      ]
    }
  ]

  return (
    <section className={`${SPACING.section.desktop} bg-gradient-to-br from-slate-50 to-gray-100`}>
      <div className={`${SPACING.container.large} mx-auto`}>
        
        {/* Section Header */}
        <motion.div
          initial={ANIMATIONS.fadeIn.initial}
          animate={ANIMATIONS.fadeIn.animate}
          transition={ANIMATIONS.fadeIn.transition}
          className={`text-center ${SPACING.section.mobile}`}
        >
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
            <span className={`text-blue-600 ${TYPOGRAPHY.weights.semibold} ${TYPOGRAPHY.sizes.body.large}`}>Got Questions?</span>
          </div>
          
          <h2 className={`
            ${TYPOGRAPHY.sizes.sectionTitle.mobile} 
            lg:${TYPOGRAPHY.sizes.sectionTitle.desktop} 
            ${TYPOGRAPHY.weights.bold} 
            text-gray-900 mb-6
          `}>
            Everything You Need to <AuroraText>Know</AuroraText>
          </h2>
          
          <p className={`
            ${TYPOGRAPHY.sizes.body.large} 
            text-slate-600 max-w-3xl mx-auto leading-relaxed 
            ${TYPOGRAPHY.weights.light}
          `}>
            Get answers to the most common questions about our AI-powered startup platform. 
            Can't find what you're looking for? We're here to help!
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={ANIMATIONS.fadeInUp.initial}
              animate={ANIMATIONS.fadeInUp.animate}
              transition={{ ...ANIMATIONS.fadeInUp.transition, delay: categoryIndex * 0.1 }}
              className={`${COMPONENTS.cards.base} p-8`}
            >
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mr-4`}>
                  {category.icon}
                </div>
                <h3 className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} text-slate-900`}>{category.category}</h3>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = `${categoryIndex}-${faqIndex}` // Unique string index across all categories
                  const isOpen = openItems.has(globalIndex)
                  
                  return (
                    <motion.div
                      key={faqIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (faqIndex * 0.05) }}
                      className={`border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 ${ANIMATIONS.transition}`}
                    >
                      {/* Question Button */}
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className={`w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 ${ANIMATIONS.transition} group`}
                      >
                        <span className={`
                          ${TYPOGRAPHY.sizes.body.large} 
                          ${TYPOGRAPHY.weights.semibold} 
                          text-slate-900 group-hover:text-blue-600 ${ANIMATIONS.transition}
                        `}>
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 ml-4"
                        >
                          {isOpen ? (
                            <Minus className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                          )}
                        </motion.div>
                      </button>

                      {/* Answer Content */}
                      <AnimatePresence mode="wait">
                        {isOpen && (
              <motion.div
                            key={globalIndex}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-2 border-t border-slate-100">
                              <p className={`text-slate-600 leading-relaxed ${TYPOGRAPHY.sizes.body.base}`}>
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
              </motion.div>
            ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={ANIMATIONS.fadeIn.initial}
          animate={ANIMATIONS.fadeIn.animate}
          transition={{ ...ANIMATIONS.fadeIn.transition, delay: 0.6 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
        >
          <h3 className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.bold} mb-4`}>Still Have Questions?</h3>
          <p className={`text-blue-100 mb-6 max-w-2xl mx-auto ${TYPOGRAPHY.sizes.body.base}`}>
            Our startup success team is here to help you every step of the way. 
            Get personalized guidance for your unique situation.
          </p>
          <div className={`flex flex-col sm:flex-row ${SPACING.gaps.medium} justify-center`}>
            <button 
              onClick={() => setShowMessageModal(true)}
              className={`
                bg-white text-blue-600 px-6 py-3 rounded-full 
                ${TYPOGRAPHY.weights.semibold} hover:bg-blue-50 
                ${ANIMATIONS.transition} cursor-pointer hover:scale-105 transform 
                shadow-lg hover:shadow-xl
              `}
            >
              Leave us a Message
            </button>
            <button 
              onClick={() => {
                navigate('/community')
                window.scrollTo({ top: 0 })
              }}
              className={`
                border-2 border-white text-white px-6 py-3 rounded-full 
                ${TYPOGRAPHY.weights.semibold} hover:bg-white hover:text-blue-600 
                ${ANIMATIONS.transition} cursor-pointer hover:scale-105 transform 
                shadow-lg hover:shadow-xl
              `}
            >
              Join Our Community
            </button>
          </div>
        </motion.div>
      </div>

              {/* Message Modal */}
        <AnimatePresence>
          {showMessageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              {/* Blurred Background Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>
            
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6" />
                    <h3 className={`${TYPOGRAPHY.sizes.cardTitle} ${TYPOGRAPHY.weights.semibold}`}>Send us a Message</h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className={`p-1 hover:bg-white/20 rounded-full ${ANIMATIONS.transition} cursor-pointer`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmitMessage} className="p-6 space-y-4">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-slate-700 mb-2`}>
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`
                      w-full px-4 py-3 border border-slate-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      ${ANIMATIONS.transition} text-slate-900
                    `}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-slate-700 mb-2`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`
                      w-full px-4 py-3 border border-slate-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      ${ANIMATIONS.transition} text-slate-900
                    `}
                    placeholder="What can we help you with?"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className={`block ${TYPOGRAPHY.sizes.caption} ${TYPOGRAPHY.weights.medium} text-slate-700 mb-2`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`
                      w-full px-4 py-3 border border-slate-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      ${ANIMATIONS.transition} text-slate-900 resize-none
                    `}
                    placeholder="Tell us about your question, feedback, or how we can help you with your startup journey..."
                  />
        </div>

                {/* Form Actions */}
                <div className={`flex flex-col sm:flex-row ${SPACING.gaps.small} pt-4`}>
                  <button
                    type="submit"
                    className={`
                      flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg 
                      ${TYPOGRAPHY.weights.semibold} hover:from-blue-700 hover:to-purple-700 
                      ${ANIMATIONS.transition} flex items-center justify-center space-x-2 
                      shadow-lg hover:shadow-xl cursor-pointer
                    `}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className={`
                      flex-1 sm:flex-none border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg 
                      ${TYPOGRAPHY.weights.semibold} hover:bg-slate-50 
                      ${ANIMATIONS.transition} cursor-pointer
                    `}
                  >
                    Cancel
                  </button>
    </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default FAQ
