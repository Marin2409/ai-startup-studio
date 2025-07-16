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
import NavbarDashboard from './components/Navbar-dashboard'

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
import Project from './pages/Project'
import UserProfile from './components/User-profile'

const App = () => {

  const location = useLocation();
  const isLoginPath = location.pathname === "/login";
  const isDashboardPath = location.pathname === "/dashboard";
  const isProjectPath = location.pathname.startsWith("/project");
  const isUserProfilePath = location.pathname === "/user-profile";

  // Show navbar on all pages except login, dashboard, and project pages
  const showNavbar = !isLoginPath && !isDashboardPath && !isProjectPath && !isUserProfilePath;
  const showFooter = !isLoginPath && !isDashboardPath && !isProjectPath && !isUserProfilePath;

  return (
    <div>
      {/* Navbar */}
      {showNavbar && <Navbar />}

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

          {/* Project with ID */}
          <Route path="/project/:projectId" element={<Project />} />

          {/* User Profile */}
          <Route path="/user-profile" element={
            <div className="dashboard-layout">
              <NavbarDashboard />
              <UserProfile />
            </div>
          } />
          
        </Routes>
      </div>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  )
}

export default App
