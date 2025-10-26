// src/hooks/useAuth.jsx
import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import toast from "react-hot-toast";

// Keys for localStorage
const SESSION_KEY = "TICKETAPP_AUTH_TOKEN";
const USER_DATA_KEY = "TICKETAPP_REGISTERED_USER";

// --- Context and Hooks ---
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// --- Auth Provider Component ---
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Check for session on load
  useEffect(() => {
    const token = localStorage.getItem(SESSION_KEY);
    setIsAuthenticated(!!token);
    setIsAuthReady(true); // Session check complete
  }, []);

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
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
    return true;
  }, []);

  const login = useCallback((username, password) => {
    const storedData = localStorage.getItem(USER_DATA_KEY);
    const storedUser = storedData ? JSON.parse(storedData) : null;

    if (
      !storedUser ||
      storedUser.username !== username ||
      storedUser.password !== password
    ) {
      return false; // AuthScreen handles the error toast
    }

    // Success
    localStorage.setItem(SESSION_KEY, "mock-jwt-token-" + new Date().getTime());
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    toast("Logged out successfully.", { icon: "👋" });
  }, []);

  const authContextValue = {
    isAuthenticated,
    isAuthReady,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
