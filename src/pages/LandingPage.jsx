// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "../components/common/Layout";

// --- Theme Colors (Arbitrary Hex Values) ---
// Background: #0F172A (slate-900)
// Surface: #1E293B (slate-800)
// Primary Blue: #3B82F6 (blue-500)
// Accent/Text: #F8FAFC (white/slate-50)

const featureItems = [
  {
    title: "Unified Design",
    desc: "A consistent look across all frameworks (React, Vue, Twig).",
  },
  {
    title: "Secure Workflow",
    desc: "Protected routes and session management with local storage.",
  },
  {
    title: "Full CRUD",
    desc: "Create, Read, Update, and Delete tickets with real-time validation.",
  },
];

// Framer Motion variants for fade-in and slide-in on scroll (User Instruction)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  // Combination of fade-in and slide-in
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const LandingPage = () => {
  // Wavy background SVG, filling with the surface color to visually hold the features
  const waveSvg = (
    <svg
      // fill-[#1E293B] (Surface color)
      className="absolute bottom-0 left-0 w-full fill-[#1E293B] z-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      style={{ height: "150px" }}
    >
      <path
        fillOpacity="1"
        d="M0,224L48,224C96,224,192,224,288,218.7C384,213,480,203,576,218.7C672,235,768,277,864,266.7C960,256,1056,192,1152,186.7C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  );

  return (
    <Layout>
      {/* Hero Section: BG Gradient for visual depth, overflow-hidden for circles */}
      <header className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden">
        {/* Max width wrapper: Max-width 1440px centered, responsive padding, elevated content */}
        <div className="max-w-[1440px] mx-auto relative z-10 px-4 sm:px-6 md:px-12 py-20 sm:py-24 pb-32 md:py-45 flex flex-col items-center  justify-center text-center">
          {/* Decorative Circles (Animated on load) */}
          <motion.div
            // Accent color #EC4899 (pink) with opacity
            className="absolute -top-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-[#EC4899]/30 to-[#9333EA]/20 rounded-full blur-3xl"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            // Primary color #3B82F6 (blue) with opacity
            className="absolute -top-32 right-10 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-[#3B82F6]/30 to-[#06B6D4]/20 rounded-full blur-3xl"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          />

          {/* Hero Content (Animated) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10" // Ensures content is above circles
          >
            {/* App Name */}
            <motion.h1
              // text-[#F8FAFC] (Bright White)
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-[#F8FAFC] mb-4 sm:mb-6 tracking-tight drop-shadow-lg"
              variants={itemVariants}
            >
              TicketApp
            </motion.h1>

            {/* Catchy Description */}
            <motion.p
              // text-[#94A3B8] (Light Gray)
              className="text-lg sm:text-xl md:text-2xl text-[#94A3B8] mb-8 sm:mb-10 max-w-2xl mx-auto px-4 leading-relaxed"
              variants={itemVariants}
            >
              Your robust, multi-platform solution for simple and efficient
              ticket management. Streamline your workflow with ease.
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
              variants={itemVariants}
            >
              <Link
                to="/auth/login"
                // bg-[#3B82F6] | hover:bg-[#2563EB] | Stronger shadows
                className="w-full sm:w-auto px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-xl shadow-[#3B82F6]/30 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                // border-[#3B82F6] | text-[#3B82F6] | hover:bg-[#3B82F6]
                className="w-full sm:w-auto px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-[#F8FAFC] hover:border-[#3B82F6] shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wavy SVG Background (positioned behind content, over background) */}
        {waveSvg}
      </header>

      {/* Features Section: Box-shaped Cards (Animated on scroll) */}
      <motion.section
        // Pulled up by -8rem to overlap the wave perfectly, using the max-width
        className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 mt-10  sm:pb-20 md:pb-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          // text-[#F8FAFC]
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#0F172A] mb-8 sm:mb-10 md:mb-12"
          variants={itemVariants}
        >
          Core Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {featureItems.map((feature, index) => (
            <motion.article
              key={index}
              // bg-[#1E293B] (Surface) | border-[#334155] (Border) | rounded-2xl | Stronger shadow
              className="bg-[#1E293B] p-6 sm:p-8 rounded-2xl border border-[#334155] shadow-2xl shadow-black/50 hover:shadow-[#3B82F6]/30 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              variants={itemVariants}
            >
              <h3
                // text-[#3B82F6]
                className="text-xl sm:text-2xl font-semibold text-[#3B82F6] mb-3 sm:mb-4 relative z-10"
              >
                {feature.title}
              </h3>
              <p
                // text-[#94A3B8]
                className="text-[#94A3B8] text-sm sm:text-base leading-relaxed relative z-10"
              >
                {feature.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </Layout>
  );
};
