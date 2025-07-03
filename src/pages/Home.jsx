// ----------------------------------
// Imports                          
// ----------------------------------
import React from 'react'

// ----------------------------------
// Components                       
// ----------------------------------
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Features from '../components/Features'
import Showcase from '../components/Showcase'

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Showcase Section */}
        <Showcase />

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        <CTA />

    </div>
  )
}

export default Home
