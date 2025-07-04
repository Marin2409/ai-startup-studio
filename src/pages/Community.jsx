import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Heart, 
  MessageCircle, 
  Share, 
  BookOpen,
  Zap,
  Target,
  Rocket,
  TrendingUp,
  Award,
  Users,
  Code,
  Building,
  FileText,
  Star,
  ArrowRight,
  Clock,
  Tag,
  X,
  Send,
  Github,
  Youtube,
  Linkedin,
  ChevronDown
} from "lucide-react"
import { AuroraText } from '../components/ui/Aurora-text'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../components/ui/Command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/Popover'

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAuthorType, setSelectedAuthorType] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [likedArticles, setLikedArticles] = useState(new Set())
  const [authorDropdownOpen, setAuthorDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/community' } })
  }

  // Function to close modal
  const closeModal = () => {
    setSelectedArticle(null)
    setShowCommentBox(false)
    setCommentText('')
  }

  // Handle like functionality
  const handleLike = (articleId) => {
    setLikedArticles(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(articleId)) {
        newLiked.delete(articleId)
      } else {
        newLiked.add(articleId)
      }
      return newLiked
    })
  }

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // Here you would typically send the comment to your backend
      console.log('Comment submitted:', commentText)
      setCommentText('')
      setShowCommentBox(false)
      // You could also update the comment count here
    }
  }

  // Handle share functionality
  const handleShare = async (article) => {
    try {
      // Create a shareable link (you can customize this based on your routing)
      const shareLink = `${window.location.origin}/community/article/${article.id}`
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareLink)
      
      // You could show a toast notification here
      alert('Article link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = `${window.location.origin}/community/article/${article.id}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Article link copied to clipboard!')
    }
  }

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedArticle) {
      document.addEventListener('keydown', handleEscape)
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedArticle])

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Posts', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'success-story', name: 'Success Stories', icon: <Award className="w-4 h-4" /> },
    { id: 'progress-update', name: 'Progress Updates', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'how-to', name: 'How-To Guides', icon: <FileText className="w-4 h-4" /> },
    { id: 'case-study', name: 'Case Studies', icon: <Target className="w-4 h-4" /> },
    { id: 'tips', name: 'Tips & Tricks', icon: <Zap className="w-4 h-4" /> },
    { id: 'company-update', name: 'Company Updates', icon: <Building className="w-4 h-4" /> }
  ]

  const authorTypes = [
    { id: 'all', name: 'All Authors' },
    { id: 'entrepreneur', name: 'Entrepreneurs' },
    { id: 'developer', name: 'Developers' },
    { id: 'student', name: 'Students' },
    { id: 'business-owner', name: 'Business Owners' },
    { id: 'team', name: 'Teams' }
  ]

  // Blog posts data combining testimonials, use cases, and new content
  const blogPosts = [
    // Success Stories from Testimonials
    {
      id: 1,
      title: "From Zero Business Experience to Successful Startup in 3 Months",
      excerpt: "How I went from being a college student with no business knowledge to launching my first startup using AI guidance.",
      content: "As someone with zero business experience, AI Startup Studio guided me through every step. The AI suggestions were incredibly helpful and saved me months of research. I learned about market validation, competitive analysis, and financial projections - things I never would have known to research on my own.",
      author: "Alex Thompson",
      authorType: "entrepreneur",
      authorRole: "First-time Entrepreneur",
      category: "success-story",
      date: "2024-01-15",
      readTime: "5 min read",
      likes: 143,
      comments: 28,
      tags: ["startup", "beginner", "business-plan", "success"],
      gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
      featured: true
    },
    {
      id: 2,
      title: "From Code to Business: My Developer-to-Founder Journey",
      excerpt: "How a solo developer transformed technical skills into a thriving business using AI-powered guidance.",
      content: "I've been coding for years but never knew how to turn my ideas into a business. This platform helped me understand market validation, pricing strategies, and even generated my MVP roadmap. The transition from developer to founder became so much clearer with the right guidance.",
      author: "Maria Santos",
      authorType: "developer",
      authorRole: "Solo Developer & Founder",
      category: "success-story",
      date: "2024-01-10",
      readTime: "7 min read",
      likes: 298,
      comments: 45,
      tags: ["developer", "mvp", "technical-founder", "transformation"],
      gradient: "bg-gradient-to-br from-green-500 to-teal-600",
      featured: true
    },
    {
      id: 3,
      title: "Creating My Own Job: From Graduate to Startup Founder",
      excerpt: "Instead of job hunting, I decided to create my own opportunity. Here's how AI Startup Studio made it possible.",
      content: "Instead of applying for jobs, I decided to create one for myself. The AI helped me validate my idea, create financial projections, and build a prototype. The journey from job seeker to startup founder was challenging but incredibly rewarding. Now I'm working on something I'm truly passionate about.",
      author: "James Wilson",
      authorType: "student",
      authorRole: "Recent Graduate & Founder",
      category: "success-story",
      date: "2024-01-05",
      readTime: "6 min read",
      likes: 187,
      comments: 32,
      tags: ["graduate", "job-creation", "prototype", "passion-project"],
      gradient: "bg-gradient-to-br from-emerald-400 to-green-600",
      featured: false
    },
    
    // Progress Updates
    {
      id: 4,
      title: "Month 2 Update: From Social Media App Idea to Working Prototype",
      excerpt: "Sarah shares her journey from college student with an idea to having a working prototype and business plan.",
      content: "It's been an incredible two months since I started with just an idea for a social media app. Using the AI business plan generator and voice input features, I now have a comprehensive 20-page business plan and a working prototype. The market analysis showed there's real demand for my concept. Next month, I'm planning to start user testing!",
      author: "Sarah Johnson",
      authorType: "student",
      authorRole: "College Student & Aspiring Founder",
      category: "progress-update",
      date: "2024-01-20",
      readTime: "4 min read",
      likes: 89,
      comments: 15,
      tags: ["social-media", "prototype", "progress", "student-founder"],
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
      featured: false
    },
    {
      id: 5,
      title: "18-Month Roadmap Complete: SaaS Development Milestone Reached",
      excerpt: "Alex shares how the AI-generated roadmap kept his solo SaaS development on track through 18 months.",
      content: "Just hit a major milestone in my solo SaaS journey! The 18-month roadmap generated by AI Startup Studio has been my north star. Sprint-based milestones and Kanban tracking kept me organized and focused. What started as an overwhelming project became manageable with clear, actionable steps. Revenue is growing month over month, and I couldn't be happier with the progress.",
      author: "Alex Rodriguez",
      authorType: "developer",
      authorRole: "Full-Stack Developer & SaaS Founder",
      category: "progress-update",
      date: "2024-01-18",
      readTime: "5 min read",
      likes: 234,
      comments: 41,
      tags: ["saas", "solo-founder", "roadmap", "milestone", "revenue"],
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
      featured: false
    },

    // How-To Guides
    {
      id: 6,
      title: "How to Validate Your Startup Idea in 7 Days Using AI",
      excerpt: "A step-by-step guide to quickly validate your startup concept using AI-powered market analysis tools.",
      content: "Idea validation doesn't have to take months. Here's how I validated my restaurant delivery concept in just one week using AI Startup Studio's market analysis tools. Step 1: Input your concept using voice or text. Step 2: Review the AI-generated TAM/SAM/SOM analysis. Step 3: Analyze competitor landscape. Step 4: Test pricing assumptions. Step 5: Validate with potential customers. Step 6: Refine based on feedback. Step 7: Make your go/no-go decision.",
      author: "Lisa Chen",
      authorType: "business-owner",
      authorRole: "Restaurant Owner & Entrepreneur",
      category: "how-to",
      date: "2024-01-12",
      readTime: "8 min read",
      likes: 312,
      comments: 67,
      tags: ["validation", "market-analysis", "how-to", "restaurant", "tam-sam-som"],
      gradient: "bg-gradient-to-br from-purple-400 to-violet-600",
      featured: true
    },
    {
      id: 7,
      title: "Building Your First MVP: A Non-Technical Founder's Guide",
      excerpt: "Learn how to create a minimum viable product even without coding skills, using modern no-code tools and strategies.",
      content: "As a non-technical founder, building an MVP seemed impossible until I discovered the right approach. Here's how I built my mobile app MVP without writing a single line of code. The key is understanding what you're building, why you're building it, and finding the right tools. AI Startup Studio helped me create realistic timelines and choose the best no-code platforms for my needs.",
      author: "Michael Brown",
      authorType: "entrepreneur",
      authorRole: "Non-Technical Founder",
      category: "how-to",
      date: "2024-01-08",
      readTime: "10 min read",
      likes: 445,
      comments: 89,
      tags: ["mvp", "no-code", "non-technical", "mobile-app", "guide"],
      gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
      featured: false
    },

    // Case Studies
    {
      id: 8,
      title: "Case Study: E-commerce Platform Selection for $10K Budget",
      excerpt: "Deep dive into how a local retailer chose the perfect e-commerce solution with detailed cost analysis.",
      content: "When I needed to take my retail business online with only $10,000 budget, the choices were overwhelming. AI Startup Studio provided detailed comparisons between Shopify, WooCommerce, and custom solutions. The analysis included hidden costs, scalability factors, and ROI projections. We ended up choosing a hybrid approach that saved 40% on initial costs while maintaining scalability for future growth.",
      author: "David Park",
      authorType: "business-owner",
      authorRole: "Local Retailer",
      category: "case-study",
      date: "2024-01-14",
      readTime: "12 min read",
      likes: 201,
      comments: 34,
      tags: ["e-commerce", "budget", "platform-selection", "retail", "roi"],
      gradient: "bg-gradient-to-br from-orange-400 to-red-600",
      featured: false
    },
    {
      id: 9,
      title: "From Freelancer to Agency: Scaling Design Business with AI",
      excerpt: "How a freelance designer used AI-powered business planning to scale into a successful agency.",
      content: "Scaling from solo freelancer to design agency seemed impossible until I used AI Startup Studio to create a formal business plan. The financial modeling showed exactly when to hire, how much to charge, and which services to prioritize. Six months later, we're a team of five with consistent monthly revenue. The key was having a clear roadmap and sticking to data-driven decisions.",
      author: "Jennifer Adams",
      authorType: "entrepreneur",
      authorRole: "Design Agency Founder",
      category: "case-study",
      date: "2024-01-11",
      readTime: "9 min read",
      likes: 178,
      comments: 29,
      tags: ["freelancer", "agency", "scaling", "design", "financial-modeling"],
      gradient: "bg-gradient-to-br from-orange-500 to-amber-600",
      featured: false
    },

    // Tips & Tricks
    {
      id: 10,
      title: "5 AI Prompts That Will Transform Your Business Planning",
      excerpt: "Discover the most effective AI prompts for generating actionable business insights and strategies.",
      content: "After helping hundreds of entrepreneurs, I've identified the 5 most powerful AI prompts for business planning: 1) 'Analyze the competitive landscape for [your idea] and identify unique positioning opportunities' 2) 'Create a 12-month revenue projection with key assumptions' 3) 'Generate user personas for [your target market] with pain points and motivations' 4) 'Design a customer acquisition funnel with cost estimates' 5) 'Identify the top 10 risks for this business and mitigation strategies'. These prompts consistently generate the most valuable insights.",
      author: "Dr. Amanda Foster",
      authorType: "entrepreneur",
      authorRole: "Business Consultant & AI Expert",
      category: "tips",
      date: "2024-01-16",
      readTime: "6 min read",
      likes: 387,
      comments: 72,
      tags: ["ai-prompts", "business-planning", "tips", "strategy", "consulting"],
      gradient: "bg-gradient-to-br from-pink-400 to-rose-600",
      featured: true
    },
    {
      id: 11,
      title: "The $500 Tech Stack: Maximum Impact, Minimum Budget",
      excerpt: "Complete guide to building a startup tech stack on a shoestring budget using free-tier services.",
      content: "Building a startup with only $500? It's possible! Here's the exact tech stack that powered three successful launches: Vercel (hosting - free), Supabase (database - free tier), Stripe (payments - pay per transaction), Cloudflare (CDN - free), Resend (emails - free tier), and GitHub (version control - free). The key is understanding the free tier limits and scaling strategically. This stack can handle your first 10,000 users without breaking the bank.",
      author: "Tom Chen",
      authorType: "developer",
      authorRole: "Bootstrap Startup Founder",
      category: "tips",
      date: "2024-01-13",
      readTime: "7 min read",
      likes: 512,
      comments: 94,
      tags: ["budget", "tech-stack", "bootstrap", "free-tier", "startup"],
      gradient: "bg-gradient-to-br from-pink-500 to-purple-600",
      featured: false
    },

    // Company Updates
    {
      id: 12,
      title: "Introducing Advanced Team Collaboration Features",
      excerpt: "New tools for startup teams to collaborate more effectively on business planning and product development.",
      content: "We're excited to announce our new team collaboration features! Based on feedback from over 100 startup teams, we've built dependency mapping, resource planning, and real-time collaboration tools. Teams can now work together on business plans, track project dependencies, and coordinate complex product launches. The Jennifer from our case studies helped us test these features with her product management workflow. Beta access starts next week!",
      author: "AI Startup Studio Team",
      authorType: "team",
      authorRole: "Product Team",
      category: "company-update",
      date: "2024-01-22",
      readTime: "4 min read",
      likes: 156,
      comments: 23,
      tags: ["product-update", "collaboration", "teams", "features", "beta"],
      gradient: "bg-gradient-to-br from-slate-400 to-gray-600",
      featured: false
    }
  ]

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      const matchesAuthorType = selectedAuthorType === 'all' || post.authorType === selectedAuthorType
      
      return matchesSearch && matchesCategory && matchesAuthorType
    })
  }, [searchTerm, selectedCategory, selectedAuthorType])

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold text-lg">Community Hub</span>
            </div>

            <h1 className="text-6xl lg:text-8xl md:text-9xl font-bold text-slate-900 text-center flex flex-col gap-4">
            Join the <AuroraText>Entrepreneur</AuroraText> Community
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto py-8 font-light">
              Share your journey, learn from others, and stay updated with the latest insights, 
              success stories, and tips from fellow entrepreneurs building amazing startups.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">2,500+</div>
                <div className="text-slate-600">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">340+</div>
                <div className="text-slate-600">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">150+</div>
                <div className="text-slate-600">Weekly Posts</div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-center mb-8 mt-15">
              <h3 className="font-light text-lg md:text-xl text-slate-600 py-4 text-center max-w-4xl mx-auto leading-relaxed"> <AuroraText>Connect with us on social media</AuroraText></h3>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-gray-800 hover:bg-gray-800 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">GitHub</span>
                </a>
                
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-black hover:bg-black text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="font-medium">X (Twitter)</span>
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-500 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span className="font-medium">Discord</span>
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-red-500 hover:bg-red-500 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">YouTube</span>
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-600 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold text-lg">Blog & Articles</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Discover <AuroraText>Insights</AuroraText> & Stories
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Explore our comprehensive collection of success stories, how-to guides, case studies, and expert tips. 
              Learn from real entrepreneurs who've built successful startups using our AI-powered platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {/* Top row: Search Bar + Author Type Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 shadow-sm"
                />
              </div>

              {/* Author Type Filter */}
              <Popover open={authorDropdownOpen} onOpenChange={setAuthorDropdownOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className="min-w-[180px] flex items-center justify-between bg-white/80 backdrop-blur-sm border border-blue-200 text-slate-700 hover:bg-white hover:border-blue-300 shadow-sm rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <span className="text-sm font-medium">
                      {selectedAuthorType !== 'all' 
                        ? authorTypes.find(type => type.id === selectedAuthorType)?.name 
                        : 'All Authors'
                      }
                    </span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[200px] bg-white" side="right" align="start">
                  <Command>
                    <CommandInput placeholder="Search authors..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {authorTypes.map((type) => (
                          <CommandItem
                            key={type.id}
                            value={type.id}
                            onSelect={(value) => {
                              setSelectedAuthorType(value)
                              setAuthorDropdownOpen(false)
                            }}
                          >
                            {type.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Bottom row: Category Filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg font-semibold'
                      : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md backdrop-blur-sm'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedArticle(post)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="relative">
                    <div className={`w-full h-48 ${post.gradient} group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
                      <div className="text-white text-4xl font-bold opacity-20">
                        {categories.find(c => c.id === post.category)?.icon}
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        post.category === 'success-story' ? 'bg-green-600' :
                        post.category === 'how-to' ? 'bg-blue-600' :
                        post.category === 'case-study' ? 'bg-purple-600' :
                        post.category === 'tips' ? 'bg-orange-600' :
                        'bg-slate-600'
                      }`}>
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">All Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => setSelectedArticle(post)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-fit"
              >
                <div className="relative">
                  <div className={`w-full h-40 ${post.gradient} group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
                    <div className="text-white text-3xl font-bold opacity-30">
                      {categories.find(c => c.id === post.category)?.icon}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                      post.category === 'success-story' ? 'bg-green-600' :
                      post.category === 'progress-update' ? 'bg-blue-600' :
                      post.category === 'how-to' ? 'bg-purple-600' :
                      post.category === 'case-study' ? 'bg-orange-600' :
                      post.category === 'tips' ? 'bg-pink-600' :
                      'bg-slate-600'
                    }`}>
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    
                    <span className="text-slate-500">{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Share Your Story?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of entrepreneurs sharing their journey and helping others succeed.
            </p>
            <button className="group bg-white text-blue-600 h-14 px-8 text-base font-semibold transition-all duration-300 hover:bg-blue-50 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transform cursor-pointer mx-auto" onClick={handleGetStarted}>
                <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform text-blue-600" />
                Start Building Your Startup
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-blue-600" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-white/20 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal()
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${selectedArticle.gradient} rounded-lg flex items-center justify-center`}>
                  <div className="text-white text-lg font-bold">
                    {categories.find(c => c.id === selectedArticle.category)?.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedArticle.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <User className="w-4 h-4" />
                    <span>{selectedArticle.author}</span>
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Article Header Image */}
              <div className={`w-full h-64 ${selectedArticle.gradient} rounded-xl mb-6 flex items-center justify-center`}>
                <div className="text-white text-6xl font-bold opacity-30">
                  {categories.find(c => c.id === selectedArticle.category)?.icon}
                </div>
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  selectedArticle.category === 'success-story' ? 'bg-green-600' :
                  selectedArticle.category === 'progress-update' ? 'bg-blue-600' :
                  selectedArticle.category === 'how-to' ? 'bg-purple-600' :
                  selectedArticle.category === 'case-study' ? 'bg-orange-600' :
                  selectedArticle.category === 'tips' ? 'bg-pink-600' :
                  'bg-slate-600'
                }`}>
                  {categories.find(c => c.id === selectedArticle.category)?.name}
                </span>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{selectedArticle.readTime}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{selectedArticle.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedArticle.comments}</span>
                  </div>
                </div>
              </div>

              {/* Article Title and Author */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">{selectedArticle.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{selectedArticle.author}</div>
                    <div className="text-slate-600 text-sm">{selectedArticle.authorRole}</div>
                  </div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">{selectedArticle.excerpt}</p>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comment Box */}
               {showCommentBox && (
                 <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                   <h4 className="text-lg font-semibold text-slate-900 mb-3">Add a Comment</h4>
                   <textarea
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                     placeholder="Share your thoughts about this article..."
                     className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                   />
                   <div className="flex items-center gap-3 mt-3">
                     <button
                       onClick={handleCommentSubmit}
                       disabled={!commentText.trim()}
                       className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                         commentText.trim()
                           ? 'bg-blue-600 text-white hover:bg-blue-700'
                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       }`}
                     >
                       <Send className="w-4 h-4" />
                       Submit Comment
                     </button>
                     <button
                       onClick={() => {
                         setShowCommentBox(false)
                         setCommentText('')
                       }}
                       className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                     >
                       Cancel
                     </button>
                   </div>
                 </div>
               )}

               {/* Action Buttons */}
               <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                 <div className="flex items-center gap-4">
                   <button 
                     onClick={() => handleLike(selectedArticle.id)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                       likedArticles.has(selectedArticle.id)
                         ? 'bg-red-100 text-red-600'
                         : 'bg-red-50 text-red-600 hover:bg-red-100'
                     }`}
                   >
                     <Heart className={`w-4 h-4 ${likedArticles.has(selectedArticle.id) ? 'fill-current' : ''}`} />
                     <span>Like ({selectedArticle.likes + (likedArticles.has(selectedArticle.id) ? 1 : 0)})</span>
                   </button>
                   <button 
                     onClick={() => setShowCommentBox(!showCommentBox)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                       showCommentBox 
                         ? 'bg-blue-100 text-blue-600'
                         : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                     }`}
                   >
                     <MessageCircle className="w-4 h-4" />
                     <span>{showCommentBox ? 'Hide Comment' : `Comment (${selectedArticle.comments})`}</span>
                   </button>
                   <button 
                     onClick={() => handleShare(selectedArticle)}
                     className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                   >
                     <Share className="w-4 h-4" />
                     <span>Share</span>
                   </button>
                 </div>
                 <button
                   onClick={closeModal}
                   className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                 >
                   Close
                 </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Community
