// src/pages/AuthScreen.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // CRITICAL: Corrected import path
import { Layout } from "../components/common/Layout";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export const AuthScreen = ({ isLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showMainPassword, setShowMainPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Destructure login/register from useAuth hook
  const { login, register } = useAuth();
  const navigate = useNavigate(); // This hook is correctly used for internal navigation

  const title = isLogin ? "Login to Ticketrax" : "Create Account";
  const actionText = isLogin ? "Login" : "Sign Up";

  // Framer Motion variants for the form container
  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic client-side validation
    if (!username || !password || (!isLogin && !confirmPassword)) {
      setError("All fields are mandatory.");
      toast.error("Please fill in all fields.");
      return;
    }

    if (isLogin) {
      // Logic for Login
      const success = login(username, password);
      if (!success) {
        // If login function returns false (mock failure)
        setError("Invalid username or password.");
        toast.error("Login failed: Invalid username or password.");
      }
      // If success, navigate is handled internally by AuthContext's login function
    } else {
      // Logic for Sign Up
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        toast.error("Password and Confirm Password must match.");
        return;
      }

      const success = register(username, password);
      if (success) {
        toast.success("Account created successfully! Please log in.");
        navigate("/auth/login"); // Redirect to login after successful registration
      }
      // If register fails (e.g., username taken in a real API), register function
      // would return false and AuthScreen could show an error, but mock currently always succeeds.
    }
  };

  return (
    <Layout>
      {" "}
      {/* Use the public Layout for authentication screens */}
      {/* <section> semantic tag for the centered form */}
      <section className="flex items-center justify-center min-h-[70vh] py-10 sm:py-16">
        <motion.div
          className="w-full max-w-md bg-[#1E293B] p-8 rounded-xl border border-[#334155] shadow-2xl shadow-black/50"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-center text-[#F8FAFC] mb-8">
            {title}
          </h2>

          {/* <form> semantic tag for authentication */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-[#94A3B8] font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#0F172A] border border-[#334155] text-[#F8FAFC] rounded-lg p-3 w-full focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition duration-150"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Main Password Field (Login & Signup) */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-[#94A3B8] font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showMainPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#0F172A] border border-[#334155] text-[#F8FAFC] rounded-lg p-3 w-full focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition duration-150 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowMainPassword(!showMainPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8]  transition duration-150"
                  aria-label={
                    showMainPassword ? "Hide password" : "Show password"
                  }
                >
                  {showMainPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Only for Sign Up) */}
            {!isLogin && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-[#94A3B8] font-medium"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-[#0F172A] border border-[#334155] text-[#F8FAFC] rounded-lg p-3 w-full focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition duration-150 pr-10"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8]  transition duration-150"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Inline Error Message */}
            {error && <p className="text-[#EF4444] text-sm mt-1">{error}</p>}

            <motion.button
              type="submit"
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-[#3B82F6]/30"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {actionText}
            </motion.button>
          </form>

          {/* Link to switch between Login and Sign Up */}
          <p className="mt-6 text-center text-[#94A3B8]">
            {isLogin ? "Need an account? " : "Already have an account? "}
            <Link
              to={isLogin ? "/auth/register" : "/auth/login"} // CRITICAL: Corrected to /auth/register
              className="text-[#3B82F6] hover:text-[#77A4FF] font-medium transition duration-150"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Link>
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};
