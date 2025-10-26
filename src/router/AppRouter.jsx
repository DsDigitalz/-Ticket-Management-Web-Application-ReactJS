// src/router/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

// Import pages
import { LandingPage } from "../pages/LandingPage.jsx";
import { AuthScreen } from "../pages/AuthScreen.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import PrivateRoute from "../components/common/PrivateRoute.jsx";
import { TicketManagement } from "../pages/TicketManagement.jsx";
import { NotFound } from "../pages/NotFound.jsx";

export default function AppRouter() {
  const { isAuthReady } = useAuth();

  // 1. Conditional Loading Check (Prevents premature redirect issues)
  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F172A] text-[#94A3B8] text-lg">
        <p className="animate-pulse">Loading secure session...</p>
      </div>
    );
  }

  // 2. Render the Router once authentication is ready
  return (
    <Router>
      <Routes>
        {/* Landing Page (Public) */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes (Public) */}
        <Route path="/auth/login" element={<AuthScreen isLogin={true} />} />
        <Route path="/auth/signup" element={<AuthScreen isLogin={false} />} />

        {/* Protected Routes Wrapper */}
        <Route element={<PrivateRoute />}>
          {/* Dashboard (Protected) */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other protected routes here (e.g., TicketManagement) */}
          <Route path="/tickets" element={<TicketManagement />} />
        </Route>

        {/* 404/Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
