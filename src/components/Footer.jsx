// ----------------------------------
// Imports                          
// ----------------------------------
import React from 'react'
import { assets } from '../assets/assets'
import { AuroraText } from './ui/Aurora-text'

const Footer = () => {
  return (
          // Main footer container with white background and responsive padding
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-slate-800 relative overflow-hidden bg-white">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>
        
        {/* Main content area with border separator */}
        <div className="relative z-10 flex flex-col md:flex-row items-start justify-center gap-10 py-12 border-b border-slate-200">
        
        {/* Left section: Logo, description, and social media links */}
        <div className="max-w-96">
          {/* Company logo and name */}
          <div className="flex items-center space-x-3 mb-6">
            <img 
              className="h-10 custom-invert" 
              src={assets.logo} 
              alt="AI Startup Studio Logo" 
            />
            <span className="text-slate-800 font-bold text-xl">AI Startup Studio</span>
          </div>
          
          {/* Company description */}
          <p className="mt-6 text-sm text-slate-600 leading-relaxed">
            Empowering entrepreneurs and innovators to build the next generation of AI-powered startups. From idea to launch, we provide the tools, resources, and expertise you need to succeed.
          </p>
          
          {/* Social media icons container */}
          <div className="flex items-center gap-3 mt-6">
            {/* Twitter/X icon */}
            <a href="#" className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.167 2.5a9.1 9.1 0 0 1-2.617 1.275 3.733 3.733 0 0 0-6.55 2.5v.833a8.88 8.88 0 0 1-7.5-3.775s-3.333 7.5 4.167 10.833a9.7 9.7 0 0 1-5.834 1.667C8.333 20 17.5 15.833 17.5 6.25q0-.35-.067-.692A6.43 6.43 0 0 0 19.167 2.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            {/* GitHub icon */}
            <a href="#" className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-all duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15.833c-4.167 1.25-4.167-2.084-5.833-2.5m11.666 5v-3.225a2.8 2.8 0 0 0-.783-2.175c2.616-.292 5.366-1.283 5.366-5.833a4.53 4.53 0 0 0-1.25-3.125 4.22 4.22 0 0 0-.075-3.142s-.983-.292-3.258 1.233a11.15 11.15 0 0 0-5.833 0C5.225.541 4.242.833 4.242.833a4.22 4.22 0 0 0-.075 3.142 4.53 4.53 0 0 0-1.25 3.15c0 4.516 2.75 5.508 5.366 5.833a2.8 2.8 0 0 0-.783 2.15v3.225" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            {/* LinkedIn icon */}
            <a href="#" className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.333 6.667a5 5 0 0 1 5 5V17.5H15v-5.833a1.667 1.667 0 0 0-3.334 0V17.5H8.333v-5.833a5 5 0 0 1 5-5M5 7.5H1.667v10H5zM3.333 5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            {/* Discord icon */}
            <a href="#" className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.942 4.558a16.3 16.3 0 0 0-4.126-1.297 12.2 12.2 0 0 0-.529.94 15.01 15.01 0 0 0-4.573 0 11.1 11.1 0 0 0-.535-.94A16.26 16.26 0 0 0 3.058 4.56c-2.4 3.61-3.058 7.13-2.73 10.582a16.46 16.46 0 0 0 5.063 2.598 12.4 12.4 0 0 0 1.092-1.84 10.62 10.62 0 0 1-1.735-.68c.145-.108.287-.22.425-.334a11.66 11.66 0 0 0 10.105 0c.138.113.28.226.425.334-.55.331-1.135.613-1.740.68a12.32 12.32 0 0 0 1.092 1.84 16.42 16.42 0 0 0 5.063-2.598c.394-3.98-.658-7.43-2.785-10.584zM6.678 13.482c-.9 0-1.63-.846-1.63-1.884s.717-1.885 1.63-1.885c.914 0 1.647.859 1.631 1.885 0 1.038-.717 1.884-1.631 1.884zm6.644 0c-.9 0-1.63-.846-1.63-1.884s.717-1.885 1.63-1.885c.914 0 1.647.859 1.631 1.885 0 1.038-.717 1.884-1.631 1.884z" fill="#4F46E5" fillRule="evenodd" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right section: Navigation links in two columns */}
        <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          {/* Resources column */}
          <div>
            <h2 className="font-semibold text-blue-600 mb-5 text-sm tracking-wider">RESOURCES</h2>
            <ul className="text-sm text-slate-600 space-y-3 list-none">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Tutorials</a></li>
              <li><a href="/community" className="hover:text-blue-600 transition-colors duration-200">Blog</a></li>
              <li><a href="/community" className="hover:text-blue-600 transition-colors duration-200">Community</a></li>
            </ul>
          </div>
          
          {/* Company links column */}
          <div>
            <h2 className="font-semibold text-purple-600 mb-5 text-sm tracking-wider">COMPANY</h2>
            <ul className="text-sm text-slate-600 space-y-3 list-none">
              <li><a href="#" className="hover:text-purple-600 transition-colors duration-200">About</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors duration-200">Privacy</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors duration-200">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className="relative z-10 py-6 text-center">
        <p className="text-xs md:text-sm text-slate-500">
          Copyright 2025 © <AuroraText>AI Startup Studio</AuroraText>. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
