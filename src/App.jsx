// ----------------------------------
// Imports                          
// ----------------------------------
import React from 'react'
// ----------------------------------
// Router                           
// ----------------------------------
import { Route, Routes, useLocation } from 'react-router-dom'

// ----------------------------------
// Components                       
// ----------------------------------
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ----------------------------------
// Pages                     
// ----------------------------------
import Home from './pages/Home' 
import Pricing from './pages/Pricing'
import UseCases from './pages/UseCases'
import Features from './pages/Features'
import Community from './pages/Community'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {

  const location = useLocation();
  const isLoginPath = location.pathname === "/login";
  const isDashboardPath = location.pathname === "/dashboard";

  return (
    <div>
      {/* Navbar */}
      {!isLoginPath && !isDashboardPath && <Navbar />}

      {/* Routes */}
      <div className='min-h-screen'>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Pricing */}
          <Route path="/pricing" element={<Pricing />} />

          {/* Use Cases */}
          <Route path="/use-cases" element={<UseCases />} />

          {/* Features */}
          <Route path="/features" element={<Features />} />

          {/* Community */}
          <Route path="/community" element={<Community />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      
      {/* Footer */}
      {!isLoginPath && !isDashboardPath && <Footer />}
    </div>
  )
}

export default App
