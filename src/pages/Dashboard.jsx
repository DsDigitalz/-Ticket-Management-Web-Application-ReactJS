// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { PrivateLayout } from "../components/common/PrivateLayout";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Clock, Loader2 } from "lucide-react"; // Import Loader2
import { useTickets } from "../hooks/useTickets"; // 🎯 Import the central hook

// (STATUS_COLORS and StatCard component remain the same)
// ... (Your StatCard component implementation)
const STATUS_COLORS = {
  total: { hex: "#3B82F6", icon: <TrendingUp size={36} /> },
  open: { hex: "#10B981", icon: <Clock size={36} /> },
  resolved: { hex: "#A855F7", icon: <CheckCircle size={36} /> },
};

const StatCard = ({ title, count, type }) => {
  const { hex: color, icon } = STATUS_COLORS[type] || STATUS_COLORS.total;

  return (
    // <article> semantic tag for individual content blocks
    <motion.article
      className={`bg-[#1E293B] p-6 rounded-xl shadow-2xl shadow-black/30 h-full border-l-4 transition-transform duration-300 hover:scale-[1.02] hover:bg-[#2C3B53]`}
      style={{ borderLeftColor: color }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-[#94A3B8] uppercase text-sm font-semibold mb-2">
        {title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-5xl font-extrabold text-[#F8FAFC]">{count}</p>
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
  // 🎯 Use the data and loading state from the central hook
  const { tickets, loading, error } = useTickets();

  // The data is already fetched by the TicketProvider wrapper in App.jsx
  const total = tickets.length;
  const open = tickets.filter(
    (t) => t.status === "open" || t.status === "in_progress"
  ).length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <PrivateLayout>
      <header className="flex flex-col sm:flex-row justify-between sm:items-center py-6 sm:py-8 border-b border-[#334155] mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4 sm:mb-0">
          Welcome Back!{" "}
          <span className="text-[#94A3B8]">Dashboard Overview</span>
        </h1>
      </header>

      {/* Conditional Rendering based on Loading State */}
      {loading ? (
        <div className="text-center py-20 text-[#94A3B8] flex flex-col items-center">
          <Loader2 size={32} className="animate-spin text-[#3B82F6] mb-4" />
          <p className="text-lg">Loading dashboard statistics instantly...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-400">
          <p className="text-lg">
            An error occurred: {error}. Please try refreshing.
          </p>
        </div>
      ) : (
        <motion.section
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard title="Total Tickets" count={total} type="total" />
          <StatCard title="Open/Progress" count={open} type="open" />
          <StatCard title="Resolved Tickets" count={resolved} type="resolved" />
        </motion.section>
      )}

      {/* Quick Navigation section remains the same */}
      <motion.nav
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label="Quick Navigation"
      >
        <h2 className="text-2xl font-semibold text-[#F8FAFC] mb-6">
          Ready to manage your tickets?
        </h2>
        <Link
          to="/tickets"
          className="inline-block px-10 py-4 text-lg sm:text-xl font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.01] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        >
          Go to Ticket Management ➡️
        </Link>
      </motion.nav>
    </PrivateLayout>
  );
};
