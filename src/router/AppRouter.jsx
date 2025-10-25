// src/router/AppRouter.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LandingPage } from "../pages/LandingPage";
import { Dashboard } from "../pages/Dashboard";
import { TicketManagement } from "../pages/TicketManagement";
import { AuthScreen } from "../pages/AuthScreen";
import { Toaster, toast } from "react-hot-toast";

// Component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    toast.error("Your session has expired — please log in again.");
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export const AppRouter = () => (
  <Router>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<AuthScreen isLogin={true} />} />
      <Route path="/auth/signup" element={<AuthScreen isLogin={false} />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <PrivateRoute>
            <TicketManagement />
          </PrivateRoute>
        }
      />

      {/* Fallback for unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);
