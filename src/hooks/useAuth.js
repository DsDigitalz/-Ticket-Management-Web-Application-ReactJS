// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const SESSION_KEY = "ticketapp_session";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for session on load
  useEffect(() => {
    const token = localStorage.getItem(SESSION_KEY);
    setIsAuthenticated(!!token);
  }, []);

  const login = useCallback((username, password) => {
    // Basic simulation: only 'user/pass' works
    if (username === "user" && password === "pass") {
      const mockToken = "mock-jwt-token-" + new Date().getTime();
      localStorage.setItem(SESSION_KEY, mockToken);
      setIsAuthenticated(true);
      toast.success("Login successful! Redirecting...");
      return true;
    } else {
      toast.error("Login failed: Invalid credentials.");
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    toast("Logged out successfully.", { icon: "👋" });
  }, []);

  return { isAuthenticated, login, logout, SESSION_KEY };
};
