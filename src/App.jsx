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
import PricingOnboarding from './components/Pricing-onboarding'

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
import AccountPreferences from './components/AccountPreferences'
import HelpSupport from './components/Help&Support'
import CreateProject from './components/Create-project'
import UpgradePlan from './components/UpgradePlan'

const App = () => {

  const location = useLocation();
  const isLoginPath = location.pathname === "/login";
  const isDashboardPath = location.pathname === "/dashboard";
  const isProjectPath = location.pathname.startsWith("/project");
  const isUserProfilePath = location.pathname === "/account-preferences";
  const isHelpSupportPath = location.pathname === "/help-support";
  const isPricingOnboardingPath = location.pathname === "/pricing-onboarding";
  const isCreateProjectPath = location.pathname === "/create-project";
  const isUpgradePlanPath = location.pathname === "/upgrade-plan";

  // Show navbar on all pages except login, dashboard, and project pages
  const showNavbar = !isLoginPath && !isDashboardPath && !isProjectPath && !isUserProfilePath && !isHelpSupportPath && !isPricingOnboardingPath && !isCreateProjectPath && !isUpgradePlanPath;
  const showFooter = !isLoginPath && !isDashboardPath && !isProjectPath && !isUserProfilePath && !isHelpSupportPath && !isPricingOnboardingPath && !isCreateProjectPath && !isUpgradePlanPath;

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

          {/* Account Preferences */}
          <Route path="/account-preferences" element={
            <div className="project-layout">
              <NavbarDashboard />
              <AccountPreferences />
            </div>
          } />

          {/* Help & Support */}
          <Route path="/help-support" element={
            <div className="project-layout">
              <NavbarDashboard />
              <HelpSupport />
            </div>
          } />

          {/* Pricing Onboarding */}
          <Route path="/pricing-onboarding" element={
            <div className="project-layout">
              <NavbarDashboard />
              <PricingOnboarding />
            </div>
          } />

          {/* Create Project */}
          <Route path="/create-project" element={
            <div className="project-layout">
              <NavbarDashboard />
              <CreateProject />
            </div>
          } />

          {/* Upgrade Plan */}
          <Route path="/upgrade-plan" element={
            <div className="project-layout">
              <NavbarDashboard />
              <UpgradePlan />
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
