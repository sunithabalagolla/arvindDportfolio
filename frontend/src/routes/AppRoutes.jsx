import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Import existing pages
import Home from "../pages/Home";
import ArvindProfileDetails from "../pages/ArvindProfileDetails";
import AllOpportunities from "../pages/VolunteerDashboard/AllOpportunities";
import OpportunityDetails from "../pages/VolunteerDashboard/OpportunityDetails";
import JoinEvent from "../pages/VolunteerDashboard/JoinEvent";

import Time from "../pages/About/Time";
import MyViewPage from "../pages/MyViewPage/MyViewPage";
import NewsPage from "../pages/PressPage/NewsPage";
import GetInTouchPage from "../pages/Getintouch/GetInTouchPage";
import NewsletterPage from "../pages/NewsLetters/NewsletterPage";
import Gallery from "../pages/Gallery/Gallery";
import ImagesGallery from "../pages/Gallery/ImagesGallery";




// Import auth pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/auth/Dashboard";
import OTPVerification from "../pages/auth/OTPVerification";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import EventDetails from "../pages/Events/EventDetails";
import VideosGallery from "../pages/Gallery/VideosGallery";
import Shop from "../pages/shopNavigate/Shop";

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/arvind-details" element={<ArvindProfileDetails />} />

      {/* About Pages */}
      <Route path="/about/timeline" element={<Time />} />

      {/* View Pages */}
      <Route path="/view/Quotes" element={<MyViewPage />} />
      <Route path="/view/Articles" element={<MyViewPage />} />
      <Route path="/view/Blogs" element={<MyViewPage />} />

      {/* News Routes */}
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/AllNews" element={<NewsPage />} />
      <Route path="/news/PressRelease" element={<NewsPage />} />
      <Route path="/news/NewsCoverage" element={<NewsPage />} />
      <Route path="/news/Interviews" element={<NewsPage />} />
      <Route path="/news/Announcements" element={<NewsPage />} />
      <Route path="/news/*" element={<NewsPage />} />

      {/* Get in Touch */}
      <Route path="/getintouch/contact" element={<GetInTouchPage />} />
      <Route path="/getintouch/writetoar" element={<GetInTouchPage />} />

      {/* Newsletter */}
      <Route path="/newsletter/Recent" element={<NewsletterPage />} />
      <Route path="/newsletter/Archives" element={<NewsletterPage />} />
      <Route path="/newsletter/Subscriptions" element={<NewsletterPage />} />
      <Route path="/newsletter/Create" element={<NewsletterPage />} />

      {/* -------------gallery----------- */}
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gallery/images" element={<ImagesGallery />} />
      <Route path="/gallery/videos" element={<VideosGallery />} />
  
      <Route path="/shop" element={<Shop />} />

      {/* AUTHENTICATION ROUTES */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/otp-verification" element={<OTPVerification />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      
      {/* Legacy auth routes (redirect to new paths) */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />

      {/* PROTECTED ROUTES */}
      <Route 
        path="/auth/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Legacy dashboard route */}
      <Route path="/dashboard" element={<Navigate to="/auth/dashboard" replace />} />

      {/* Protected Volunteer Routes */}
      <Route 
        path="/volunteer/opportunities" 
        element={
          <ProtectedRoute>
            <AllOpportunities />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/volunteer/opportunity/:id" 
        element={
          <ProtectedRoute>
            <OpportunityDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/volunteer/join/:id" 
        element={
          <ProtectedRoute>
            <JoinEvent />
          </ProtectedRoute>
        } 
      />

      {/* Event Details - Keep public for now, or make protected based on your needs */}
    <Route path="/events/:eventId" element={<EventDetails/>} />

      {/* 404 Route - Should be last */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;