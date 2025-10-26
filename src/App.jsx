// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // 🎯 The Toast Library

// Import all page components (omitted for brevity)
import { Dashboard } from "./pages/Dashboard";
import { TicketManagement } from "./pages/TicketManagement";
import { LandingPage } from "./pages/LandingPage";
import { AuthScreen } from "./pages/AuthScreen";
import { NotFound } from "./pages/NotFound";

// Define custom styling based on your UI theme:
// Background: #1E293B (Surface)
// Text: #F8FAFC (High Contrast Text)
const TOAST_STYLE = {
  background: "#1E293B", // Dark card background color
  color: "#F8FAFC", // Light text color
  border: "1px solid #334155", // Border for separation
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)", // Subtle shadow
  padding: "16px", // Generous padding
  borderRadius: "8px", // Rounded corners
};

// Main application component
export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<AuthScreen isLogin={true} />} />
          <Route
            path="/auth/register"
            element={<AuthScreen isLogin={false} />}
          />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketManagement />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>

      {/* 🎯 Updated Toaster Component with custom styling */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "custom-toast-font", // Optional class if you need custom fonts/sizes
          style: TOAST_STYLE, // Apply the base style to all toasts

          // Custom styles for success/error toasts to override the default icons/colors
          success: {
            iconTheme: {
              primary: "#10B981", // Green accent color
              secondary: "#1E293B",
            },
            style: { border: "1px solid #10B981" }, // Green border for success
          },
          error: {
            iconTheme: {
              primary: "#EF4444", // Red accent color
              secondary: "#1E293B",
            },
            style: { border: "1px solid #EF4444" }, // Red border for error
          },
        }}
      />
    </BrowserRouter>
  );
}
