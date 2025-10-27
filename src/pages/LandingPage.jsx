// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "../components/common/Layout";
import { Shield, LayoutDashboard, Database } from "lucide-react";

// Component for a feature box, using Framer Motion for scroll animation
const FeatureBox = ({ icon, title, description, delay }) => {
  // Use <article> for semantic markup
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

// Component for a decorative circle (purely visual)
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
      {/* Hero Section: <section> semantic tag */}
      <section className="relative overflow-hidden my-auto pt-30 pb-20 lg:pb-30  text-center bg-[#0F172A] -mx-4 sm:-mx-8 rounded-b-[50px] md:rounded-b-[100px] shadow-xl shadow-black/40">
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

        {/* Decorative Circles */}
        <DecorativeCircle
          size="200px"
          top="10%"
          left="5%"
          color="#3B82F6"
          opacity={0.2}
          zIndex={1}
        />
        <DecorativeCircle
          size="150px"
          bottom="35%"
          right="10%"
          color="#A855F7"
          opacity={0.15}
          zIndex={1}
        />

        {/* <header> semantic tag for hero content */}
        <motion.header
          className="mb-12 flex px-4  flex-col justify-center items-center relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#F8FAFC] mb-4 opacity-90">
            Ticketrax
          </h1>
          <p className="text-xl text-center text-[#94A3B8] mb-8">
            Your robust, multi-platform solution for simple and efficient ticket
            management.
          </p>

          {/* <nav> semantic tag for the call-to-action buttons */}
          <nav className="space-x-4">
            <Link
              to="/auth/login"
              className="inline-block px-8 py-3 text-lg font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] transition duration-300 shadow-lg shadow-[#3B82F6]/50"
              aria-label="Login to your account"
            >
              Login
            </Link>
            <Link
              to="/auth/register" // 🎯 FIX: Corrected path from /auth/signup to /auth/register
              className="inline-block px-8 py-3 text-lg font-bold rounded-lg border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 transition duration-300"
              aria-label="Create a new account"
            >
              Get Started
            </Link>
          </nav>
        </motion.header>
      </section>

      {/* Features Section: <section> semantic tag */}
      <section className="relative grid md:grid-cols-3 gap-8 pt-20 pb-20">
        {/* Decorative Circle 3 (Features) */}
        <DecorativeCircle
          size="150px"
          top="20%"
          right="45%"
          color="#10B981"
          opacity={0.1}
          zIndex={0}
        />

        {/* Feature Boxes with Framer Motion scroll effect (User requirement)
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
        /> */}
      </section>
    </Layout>
  );
};
