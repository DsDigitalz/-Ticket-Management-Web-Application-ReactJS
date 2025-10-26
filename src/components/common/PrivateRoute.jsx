// src/components/common/PrivateRoute.jsx
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, isAuthReady } = useAuth();
  const navigate = useNavigate();

  // useEffect is CRITICAL for handling redirection outside of render
  useEffect(() => {
    if (isAuthReady && !isAuthenticated) {
      // Redirect to login if the check is done and user is NOT authenticated
      navigate("/auth/login", { replace: true });
    }
  }, [isAuthenticated, isAuthReady, navigate]);

  if (!isAuthReady) {
    // Show nothing while the initial check is ongoing
    return null;
  }

  // Render child routes only if authenticated
  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
