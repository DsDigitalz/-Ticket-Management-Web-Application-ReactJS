// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/common/Layout";
import { getTickets } from "../api/tickets";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Clock } from "lucide-react"; // Icons for professional look

// --- Theme Colors (Arbitrary Hex Values) ---
// Background: #0F172A
// Surface (Card BG): #1E293B
// Primary Blue: #3B82F6
// Primary Blue Hover: #2563EB
// Text High: #F8FAFC
// Text Low: #94A3B8
// Border: #334155
// Red (Logout): #EF4444

// Custom Status Colors for visual distinction
const STATUS_COLORS = {
  total: { hex: "#3B82F6", icon: <TrendingUp size={36} /> }, // Primary Blue
  open: { hex: "#10B981", icon: <Clock size={36} /> }, // Emerald Green
  resolved: { hex: "#A855F7", icon: <CheckCircle size={36} /> }, // Purple
};

const StatCard = ({ title, count, type }) => {
  const { hex: color, icon } = STATUS_COLORS[type] || STATUS_COLORS.total;

  // Framer Motion: Fade-in and Slide-in on scroll (User Instruction)
  return (
    // <article> semantic tag for the Stat Card
    <motion.article
      // bg-[#1E293B], border-l-[color], rounded-xl, shadow-2xl
      className={`bg-[#1E293B] p-6 rounded-xl shadow-2xl shadow-black/30 h-full border-l-4 transition-transform duration-300 hover:scale-[1.02]`}
      style={{ borderLeftColor: color }} // Inline style for dynamic border color
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h3
        // text-[#94A3B8]
        className="text-[#94A3B8] uppercase text-sm font-semibold mb-2"
      >
        {title}
      </h3>
      <div className="flex items-center justify-between">
        <p
          // text-[#F8FAFC]
          className="text-5xl font-extrabold text-[#F8FAFC]"
        >
          {count}
        </p>
        <span
          style={{ color: color }}
          className="transition-colors duration-300"
        >
          {icon}
        </span>
      </div>
    </motion.article>
  );
};

export const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 });

  useEffect(() => {
    // Simulated ticket fetching
    getTickets()
      .then((tickets) => {
        const open = tickets.filter((t) => t.status === "open").length;
        const resolved = tickets.filter((t) => t.status === "closed").length;
        setStats({
          total: tickets.length,
          open: open,
          resolved: resolved,
        });
      })
      .catch((err) => {
        console.error("Failed to load dashboard stats:", err);
        // In a real app, show toast notification here
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth/login"); // Redirect to Login screen as per criteria
  };

  return (
    <Layout>
      {/* Max-width container is handled by the parent <Layout> component */}

      {/* <header> semantic tag for the Dashboard header */}
      <header className="flex justify-between items-center py-6 sm:py-8 border-b border-[#334155] mb-8">
        <h1
          // text-[#F8FAFC]
          className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]"
        >
          Dashboard Overview
        </h1>
        {/* Logout Button (Visible & Styled) */}
        <button
          onClick={handleLogout}
          // bg-red-600 hover:bg-red-700
          className="bg-[#EF4444] hover:bg-[#DC2626] text-[#F8FAFC] font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg shadow-red-600/30 hover:scale-[1.02]"
        >
          Logout
        </button>
      </header>

      {/* <section> semantic tag for the Stats summary */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <StatCard title="Total Tickets" count={stats.total} type="total" />
        <StatCard title="Open Tickets" count={stats.open} type="open" />
        <StatCard
          title="Resolved Tickets"
          count={stats.resolved}
          type="resolved"
        />
      </section>

      {/* <nav> semantic tag for navigation links */}
      <motion.nav
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Navigation Link to Ticket Management */}
        <Link
          to="/tickets"
          // bg-[#3B82F6] hover:bg-[#2563EB]
          className="inline-block px-8 py-4 text-lg sm:text-xl font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.01] transition duration-300"
        >
          Go to Ticket Management ➡️
        </Link>
      </motion.nav>
    </Layout>
  );
};
