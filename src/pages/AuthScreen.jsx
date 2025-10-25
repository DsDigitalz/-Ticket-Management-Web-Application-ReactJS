// src/pages/AuthScreen.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/common/Layout";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; // <-- Import the toast library
import { Eye, EyeOff } from "lucide-react"; // <-- Import icons for password toggle (install lucide-react)

// --- Theme Colors (Arbitrary Hex Values) ---
// Background: #0F172A (slate-900)
// Surface (Card BG): #1E293B (slate-800)
// Primary Blue: #3B82F6 (blue-500)
// Primary Blue Hover: #2563EB (blue-600)
// Text High: #F8FAFC (white)
// Text Low: #94A3B8 (slate-400)
// Border: #334155 (slate-700)
// Error Red: #EF4444 (red-500)

export const AuthScreen = ({ isLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- New state for password toggle
  const { login } = useAuth();
  const navigate = useNavigate();

  const title = isLogin ? "Login to TicketApp" : "Create Account";
  const actionText = isLogin ? "Login" : "Sign Up";

  // Use the itemVariants from the LandingPage for consistent animation
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
    setError("");

    if (!username || !password) {
      setError("All fields are mandatory.");
      toast.error("Please fill in all fields."); // <-- Toast for validation
      return;
    }

    if (isLogin) {
      // Test credentials: user / pass
      const success = login(username, password);
      if (success) {
        toast.success("Login successful! Redirecting...");
        navigate("/dashboard"); // <-- Redirect on successful login
      } else {
        const authError = "Login failed: Invalid username or password.";
        setError(authError);
        toast.error(authError); // <-- Toast for failed login
      }
    } else {
      // Simulated Signup Logic
      // In a real app, this would call the API
      toast.success("Account created! Please log in."); // <-- Toast for successful signup
      navigate("/auth/login"); // <-- Redirect to login after signup
    }
  };

  return (
    <Layout>
      {/* <section> semantic tag for the centered form */}
      <section className="flex items-center justify-center min-h-[70vh] py-10 sm:py-16">
        {/* Auth Card Container - Framer Motion Animation */}
        <motion.div
          className="w-full max-w-md bg-[#1E293B] p-8 rounded-xl border border-[#334155] shadow-2xl shadow-black/50"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-[#F8FAFC] mb-8">
            {title}
          </h2>

          {/* <form> semantic tag for authentication */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-[#94A3B8] font-medium">
                Username {isLogin && "(Test: user)"}
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

            {/* Password Field with Toggle */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-[#94A3B8] font-medium">
                Password {isLogin && "(Test: pass)"}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} // <-- Conditional type
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#0F172A] border border-[#334155] text-[#F8FAFC] rounded-lg p-3 w-full focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition duration-150 pr-10" // Added padding-right
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // <-- Toggle function
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8]  transition duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Inline Error Message */}
              {error && <p className="text-[#EF4444] text-sm mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-[#3B82F6]/30"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {actionText}
            </motion.button>
          </form>

          {/* Toggle Link */}
          <p className="mt-6 text-center text-[#94A3B8]">
            {isLogin ? "Need an account? " : "Already have an account? "}
            <Link
              to={isLogin ? "/auth/signup" : "/auth/login"}
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
