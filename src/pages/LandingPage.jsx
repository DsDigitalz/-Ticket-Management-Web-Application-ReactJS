// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "../components/common/Layout";
import { Shield, LayoutDashboard, Database } from "lucide-react";

// Theme Colors
// Background: #0F172A (slate-900) - Handled by Layout
// Surface (Card BG): #1E293B (slate-800)
// Primary Blue: #3B82F6 (blue-500)
// Primary Blue Hover: #2563EB (blue-600)
// Text High: #F8FAFC (white)
// Text Low: #94A3B8 (slate-400)
// Border: #334155 (slate-700)

const FeatureBox = ({ icon, title, description, delay }) => {
  return (
    <motion.article
      className="bg-[#1E293B] p-6 rounded-xl shadow-xl border border-[#334155] shadow-black/30 h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <span className="text-3xl text-[#3B82F6] mb-4 block">{icon}</span>
      <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">{title}</h3>
      <p className="text-[#94A3B8]">{description}</p>
    </motion.article>
  );
};

// Component for a decorative circle
const DecorativeCircle = ({
  size,
  top,
  left,
  right,
  bottom,
  color,
  zIndex = 0,
  opacity = 0.3,
}) => (
  <div
    className="absolute rounded-full filter blur-xl animate-pulse-slow pointer-events-none"
    style={{
      width: size,
      height: size,
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      backgroundColor: color,
      zIndex: zIndex,
      opacity: opacity,
    }}
  ></div>
);

export const LandingPage = () => {
  return (
    <Layout>
      {/* Hero Section with Wavy Background and Decorative Circles */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pb-30  text-center bg-[#0F172A] -mx-4 sm:-mx-8 rounded-b-[50px] md:rounded-b-[100px] shadow-lg shadow-black/40">
        {/* Wavy Background SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full text-[#1E293B] z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,192L60,197.3C120,203,240,213,360,224C480,235,600,245,720,229.3C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>

        {/* Decorative Circle 1 (Hero) */}
        <DecorativeCircle
          size="200px"
          top="10%"
          left="5%"
          color="#3B82F6"
          opacity={0.2}
          zIndex={1}
        />
        {/* Decorative Circle 2 (Hero) */}
        <DecorativeCircle
          size="150px"
          bottom="20%"
          right="10%"
          color="#A855F7"
          opacity={0.15}
          zIndex={1}
        />

        <motion.header
          className="mb-12 relative z-10" // Ensure header is above circles and wave
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold text-[#F8FAFC] mb-4 opacity-90">
            TicketApp
          </h1>
          <p className="text-xl text-[#94A3B8] mb-8">
            Your robust, multi-platform solution for simple and efficient ticket
            management.
          </p>
          <nav className="space-x-4">
            <Link
              to="/auth/login"
              className="inline-block px-8 py-3 text-lg font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] transition duration-300 shadow-lg shadow-[#3B82F6]/50"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="inline-block px-8 py-3 text-lg font-bold rounded-lg border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 transition duration-300"
            >
              Get Started
            </Link>
          </nav>
        </motion.header>
      </section>

      {/* Features Section */}
      <section className="relative grid md:grid-cols-3 gap-8 pt-20 pb-20">
        {/* Decorative Circle 3 (Features) */}
        <DecorativeCircle
          size="180px"
          top="20%"
          right="20%"
          color="#10B981"
          opacity={0.1}
          zIndex={0}
        />

        <FeatureBox
          icon={<LayoutDashboard />}
          title="Unified Design"
          description="A consistent look across all frameworks (React, Vue, Twig)."
          delay={0.1}
        />
        <FeatureBox
          icon={<Shield />}
          title="Secure Workflow"
          description="Protected routes and session management with local storage."
          delay={0.25}
        />
        <FeatureBox
          icon={<Database />}
          title="Full CRUD"
          description="Create, Read, Update, and Delete tickets with real-time validation."
          delay={0.4}
        />
      </section>

      {/* Consistent Footer */}
      <footer className="text-center py-4 text-xs text-[#94A3B8] border-t border-[#334155] mt-auto">
        © 2025 TicketApp. All rights reserved. Built with React and Tailwind
        CSS.
      </footer>
    </Layout>
  );
};
