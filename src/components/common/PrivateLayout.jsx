// src/components/common/PrivateLayout.jsx
import React, { useState } from "react";
// 🎯 CRITICAL CHANGE: Import NavLink instead of Link
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, ListTodo, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Navigation Component for sidebar links
const Navigation = ({ isMobile, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    // FIX: Ensure the action calls navigate for programmatic use cases (like on mobile close)
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: Home,
      action: () => navigate("/dashboard"),
    },
    {
      name: "Ticket Management",
      to: "/tickets",
      icon: ListTodo,
      action: () => navigate("/tickets"),
    },
    {
      name: "Logout",
      to: "/auth/login",
      icon: LogOut,
      action: logout,
      isLogout: true,
    },
  ];

  // Framer Motion variants for animated navigation items (User Instruction)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Helper function to build the common styles and active styles
  const getLinkClass = (isActive, isLogout) => {
    const baseStyles =
      "flex items-center space-x-3 p-2 rounded-lg text-[#F8FAFC] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]";

    if (isLogout) {
      // Logout button styles (red hover)
      return `${baseStyles} hover:bg-[#EF4444]/20 hover:text-[#EF4444]`;
    }

    if (isActive) {
      // 🎯 ACTIVE/FOCUSED STYLE: Blue background and brighter text
      return `${baseStyles} bg-[#3B82F6] text-[#F8FAFC] font-bold shadow-inner shadow-black/20`;
    }

    // Default (inactive) styles
    return `${baseStyles} hover:bg-[#3B82F6]/20 hover:text-[#3B82F6]`;
  };

  return (
    // <nav> semantic tag
    <nav
      className={`flex flex-col ${isMobile ? "p-6 space-y-4" : "space-y-2"}`}
      aria-label="Main Navigation"
    >
      {navItems.map((item, index) => {
        const navContent = (
          <div className="flex items-center space-x-3">
            <item.icon size={20} />
            <span className="font-semibold">{item.name}</span>
          </div>
        );

        // Wrap the whole link content in the Framer motion div
        const motionWrapper = (content, isActive, isLogout) => (
          <motion.div
            key={item.name}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={getLinkClass(isActive, isLogout)}
          >
            {content}
          </motion.div>
        );

        if (item.action && item.isLogout) {
          // Logic for the Logout Button
          return (
            // Use <button> for non-navigation action (Logout)
            <button
              key={item.name}
              onClick={() => {
                item.action();
                if (onClose) onClose();
              }}
              className="text-left w-full"
              aria-label={item.name}
            >
              {/* Pass isActive=false as Logout is never the active page */}
              {motionWrapper(navContent, false, true)}
            </button>
          );
        }

        // Use NavLink for navigation links (Dashboard, Ticket Management)
        return (
          // 🎯 NavLink allows for styling based on the active state
          <NavLink
            key={item.name}
            to={item.to}
            onClick={onClose}
            aria-label={`Maps to ${item.name}`}
            // NavLink uses a function prop to determine the class/style
            className={({ isActive }) =>
              // The actual NavLink styling is applied via the motionWrapper here
              // The motionWrapper determines the class based on isActive
              `text-left w-full ${getLinkClass(isActive, false)}`
            }
          >
            {/* Render the inner content, wrapped by Framer Motion and styled by NavLink */}
            {({ isActive }) => motionWrapper(navContent, isActive, false)}
          </NavLink>
        );
      })}
    </nav>
  );
};

// Main PrivateLayout component (rest remains the same)
export const PrivateLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Framer Motion variants for sidebar animation
  const sidebarVariants = {
    closed: { x: "-100%" },
    open: { x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Desktop Sidebar (Fixed) */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-[#1E293B] border-r border-[#334155] p-4 hidden lg:block z-40">
        <div className="py-6 mb-8 border-b border-[#334155]">
          <h2 className="text-2xl font-extrabold text-[#3B82F6] px-3">
            TicketApp
          </h2>
        </div>
        <Navigation onClose={() => {}} />
      </aside>

      <main className="lg:ml-64 relative min-h-screen">
        {/* Mobile Header with Menu Button */}
        <header className="flex lg:hidden justify-between items-center bg-[#1E293B] p-4 border-b border-[#334155] sticky top-0 z-50">
          <h2 className="text-xl font-extrabold text-[#3B82F6]">TicketApp</h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-[#F8FAFC] hover:text-[#3B82F6] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Mobile Sidebar (Collapsible Navigation) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              aria-modal="true"
              role="dialog"
            >
              <motion.aside
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 left-0 w-64 h-full bg-[#1E293B] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b border-[#334155]">
                  <h2 className="text-2xl font-extrabold text-[#3B82F6]">
                    TicketApp
                  </h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-[#F8FAFC] hover:text-[#3B82F6] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    aria-label="Close navigation menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <Navigation
                  isMobile={true}
                  onClose={() => setIsSidebarOpen(false)}
                />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </div>
      </main>
    </div>
  );
};
