// src/App.jsx
import React from "react";
import AppRouter from "./router/AppRouter.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    // <AuthProvider> makes the useAuth hook available globally
    <AuthProvider>
      <AppRouter />
      {/* Global Toaster for notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1E293B", // Surface BG
            color: "#F8FAFC", // Text High
            border: "1px solid #334155",
          },
          success: { iconTheme: { primary: "#10B981", secondary: "#F8FAFC" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#F8FAFC" } },
        }}
      />
    </AuthProvider>
  );
}

export default App;
