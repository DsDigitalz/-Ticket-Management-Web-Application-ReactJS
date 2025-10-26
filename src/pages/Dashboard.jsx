// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Corrected import path
import { PrivateLayout } from "../components/common/PrivateLayout"; // Uses the sidebar layout
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Clock } from "lucide-react";

// Theme Colors for consistency
const STATUS_COLORS = {
  total: { hex: "#3B82F6", icon: <TrendingUp size={36} /> },
  open: { hex: "#10B981", icon: <Clock size={36} /> },
  resolved: { hex: "#A855F7", icon: <CheckCircle size={36} /> },
};

// Mock API Call to simulate fetching ticket data
const mockGetTickets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, status: "open" },
        { id: 2, status: "open" },
        { id: 3, status: "closed" },
        { id: 4, status: "open" },
        { id: 5, status: "closed" },
        { id: 6, status: "open" },
        { id: 7, status: "open" },
        { id: 8, status: "closed" },
      ]);
    }, 500); // Simulate network delay
  });
};

// StatCard component for displaying key metrics
const StatCard = ({ title, count, type }) => {
  const { hex: color, icon } = STATUS_COLORS[type] || STATUS_COLORS.total; // Fallback to total color

  // Framer Motion: Fade-in and Slide-in on scroll
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
  const { logout } = useAuth(); // Get logout function from context
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 });

  // Fetch mock ticket data on component mount
  useEffect(() => {
    mockGetTickets()
      .then((tickets) => {
        const open = tickets.filter((t) => t.status === "open").length;
        const resolved = tickets.filter((t) => t.status === "closed").length; // Assuming 'closed' means resolved
        setStats({
          total: tickets.length,
          open: open,
          resolved: resolved,
        });
      })
      .catch((err) => {
        console.error("Failed to load dashboard stats:", err);
        // Could add a toast error here for user
      });
  }, []); // Empty dependency array means this runs once on mount

  // Handler for logout button
  const handleLogout = () => {
    logout(); // Calls the logout function from AuthContext
  };

  return (
    <PrivateLayout>
      {" "}
      {/* Dashboard uses the private layout with the sidebar */}
      {/* <header> semantic tag for the page title and logout button */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center py-6 sm:py-8 border-b border-[#334155] mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4 sm:mb-0">
          Welcome Back!{" "}
          <span className="text-[#94A3B8]">Dashboard Overview</span>
        </h1>
        {/* <button
          onClick={handleLogout}
          className="bg-[#EF4444] hover:bg-[#DC2626] text-[#F8FAFC] font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg shadow-red-600/30 hover:scale-[1.02] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          aria-label="Logout"
        >
          Logout
        </button> */}
      </header>
      {/* <section> semantic tag for dashboard statistics */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <StatCard title="Total Tickets" count={stats.total} type="total" />
        <StatCard title="Open Tickets" count={stats.open} type="open" />
        <StatCard
          title="Resolved Tickets"
          count={stats.resolved}
          type="resolved"
        />
      </section>
      {/* <nav> semantic tag for quick navigation */}
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
