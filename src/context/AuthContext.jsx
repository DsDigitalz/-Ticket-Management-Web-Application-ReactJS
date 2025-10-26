// src/context/AuthContext.jsx
import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Essential for programmatic navigation

// Keys for localStorage (best practice to define constants)
const SESSION_KEY = "TICKETAPP_AUTH_TOKEN";
const USER_DATA_KEY = "TICKETAPP_REGISTERED_USER"; // For mock registration

// --- 1. AuthContext Object ---
// This is the actual React Context object. Default value is null.
const AuthContext = createContext(null);

// --- 2. useAuth Custom Hook ---
// This hook provides easy access to the auth context and includes a crucial safety check.
export const useAuth = () => {
  const context = useContext(AuthContext);

  // CRITICAL: This check ensures useAuth is always called within an AuthProvider.
  // It prevents the "Cannot destructure property 'x' of null" error.
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// --- 3. AuthProvider Component ---
// This component wraps your application (or parts of it) to provide authentication state and functions.
export const AuthProvider = ({ children }) => {
  // isAuthenticated: true/false based on token presence. null initially for loading state.
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // isAuthReady: Becomes true once initial token check is complete.
  const [isAuthReady, setIsAuthReady] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Effect to check for an existing session token on component mount.
  useEffect(() => {
    const token = localStorage.getItem(SESSION_KEY);
    setIsAuthenticated(!!token); // Set isAuthenticated based on token existence
    setIsAuthReady(true); // Mark authentication status as ready
  }, []); // Run once on mount

  // Memoized callback for user registration (mock implementation).
  const register = useCallback((username, password) => {
    if (localStorage.getItem(USER_DATA_KEY)) {
      toast.error("Account already exists. Please log in.");
      return false;
    }
    if (!username || !password) {
      toast.error("Username and password are required for registration.");
      return false;
    }
    const newUser = { username, password };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser)); // Store mock user
    return true;
  }, []); // Dependencies are empty as it doesn't rely on props/state

  // Memoized callback for user login (mock implementation).
  const login = useCallback(
    (username, password) => {
      const storedData = localStorage.getItem(USER_DATA_KEY);
      const storedUser = storedData ? JSON.parse(storedData) : null;

      if (
        !storedUser ||
        storedUser.username !== username ||
        storedUser.password !== password
      ) {
        // Return false; AuthScreen will handle the specific error toast.
        return false;
      }

      // Successful login: Store a mock token and update state.
      localStorage.setItem(
        SESSION_KEY,
        "mock-jwt-token-" + new Date().getTime()
      );
      setIsAuthenticated(true);
      navigate("/dashboard"); // Navigate to dashboard on success
      return true;
    },
    [navigate] // login depends on navigate
  );

  // Memoized callback for user logout.
  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY); // Remove token
    setIsAuthenticated(false); // Update authentication state
    toast("Logged out successfully.", { icon: "👋" });
    navigate("/auth/login"); // Redirect to login page
  }, [navigate]); // logout depends on navigate

  // The value provided by the context.
  const authContextValue = {
    isAuthenticated,
    isAuthReady,
    login,
    logout,
    register,
    navigate, // Expose navigate directly for convenience if needed in components
  };

  // Render a loading state while authentication status is being determined.
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-[#94A3B8]">
        <p>Checking authentication status...</p>
      </div>
    );
  }

  // Render children wrapped with the AuthContext.Provider.
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
