// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "../components/common/Layout"; // Use the public Layout for full screen look
import { AlertTriangle } from "lucide-react";

// Framer Motion Variants for scroll animation and overall page entry
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const NotFound = () => {
  return (
    // Wrap with the simple Layout to get the dark background and centering
    <Layout>
      {/* <main> semantic tag for the primary content of the 404 page */}
      <motion.main
        className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-[#1E293B] rounded-xl shadow-2xl shadow-black/50 border-t-4 border-[#3B82F6]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="404 Page Not Found"
      >
        {/* Icon */}
        <motion.div variants={itemVariants}>
          <AlertTriangle
            size={80}
            className="text-[#3B82F6] mb-6 animate-pulse"
          />
        </motion.div>

        {/* Status Code */}
        <motion.hgroup variants={itemVariants}>
          <h1 className="text-9xl font-extrabold text-[#F8FAFC] mb-4">404</h1>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#94A3B8] mb-8">
            Page Not Found
          </h2>
        </motion.hgroup>

        {/* Message */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-[#94A3B8] max-w-md mb-10"
        >
          Oops! It looks like you've followed a broken link or entered a URL
          that doesn't exist on this app.
        </motion.p>

        {/* Navigation Link */}
        <motion.nav variants={itemVariants}>
          <Link
            to="/"
            className="inline-block px-8 py-3 text-lg font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.05] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/50"
            aria-label="Go back to Home"
          >
            Return to Home Page
          </Link>
        </motion.nav>
      </motion.main>
    </Layout>
  );
};
