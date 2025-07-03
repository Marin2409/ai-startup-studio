// ----------------------------------
// Imports                          
// ----------------------------------
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/Badge-ui'
import { motion } from "motion/react";  
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { HeroVideoDialog } from './ui/Hero-video-dialog';
import { TypingAnimation } from './ui/Typing-animation';
import { AuroraText } from './ui/Aurora-text';

const Hero = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login', { state: { from: '/' } })
  }

  return (
    <div className="min-h-screen relative flex w-full flex-col gap-6 items-center justify-center px-4 py-15 mx-auto">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10"></div>

        {/* New Feature Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center w-full"
        >
            <Badge variant="secondary" className="cursor-pointer mb-6 px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-all">
              <Sparkles className="w-4 h-4 mr-2" />
              Now with 7 Integrated AI-Powered Tools
            </Badge>
        </motion.div>

        {/* Hero Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl lg:text-8xl md:text-9xl font-bold text-slate-900 text-center flex flex-col gap-4 "
        >
            <h1>AI Startup <AuroraText>Studio</AuroraText></h1>
            <span className="text-3xl lg:text-4xl md:text-5xl font-normal text-slate-600">
              From Idea to MVP in Seconds
            </span>
        </motion.div>

        {/* Hero Description */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-light text-lg md:text-xl text-slate-600 py-4 text-center max-w-4xl mx-auto leading-relaxed"
        >
          The complete AI-powered platform for startup creation. Generate business plans, roadmaps, 
          and development environments with intelligent automation. Replace expensive consultants 
          with AI that understands your vision.
        </motion.div>
        
        {/* Hero Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 relative z-10 items-center mt-4"
        >
            {/* Primary CTA */}
            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white h-14 px-8 text-base font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transform cursor-pointer" onClick={handleGetStarted}>
                <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Start Building Your Startup
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button className="group cursor-pointer h-14 px-8 rounded-full border-2 border-blue-300 bg-white text-blue-600 text-base hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 flex items-center justify-center" onClick={handleGetStarted}>
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
            </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 mt-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-slate-900">5M+</span>
              </div>
              <p className="text-slate-600 text-sm">Startups launched</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-slate-900">85%</span>
              </div>
              <p className="text-slate-600 text-sm">Time reduction</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-slate-900">7</span>
              </div>
              <p className="text-slate-600 text-sm">AI tools integrated</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Video */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="relative group"
        >
          {/* Video container with fade effect - mask only applied to thumbnails */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="hero-video-mask">
              <HeroVideoDialog
                className="block dark:hidden"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Hero Video"
              />
              <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                thumbnailAlt="Hero Video"
              />
            </div>
          </div>
        </motion.div>
        <TypingAnimation className="font-light text-lg md:text-xl text-slate-600 py-4 text-center max-w-4xl mx-auto leading-relaxed">
          "We transform visionary ideas into intelligent solutions."
        </TypingAnimation>
        <p className="font-light text-lg md:text-xl text-slate-600 py-4 text-center max-w-4xl mx-auto leading-relaxed">
          <AuroraText>AI Startup Studio CEO - Jose Marin</AuroraText>
        </p>
    </div>
  )
}

export default Hero
