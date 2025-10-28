// src/components/common/PrivateLayout.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Home, ListTodo, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Navigation Component
const Navigation = ({ isMobile, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: Home },
    { name: "Ticket Management", to: "/tickets", icon: ListTodo },
    {
      name: "Logout",
      to: "/auth/login",
      icon: LogOut,
      action: logout,
      isLogout: true,
    },
  ];

  const getLinkClass = (isActive, isLogout) => {
    const baseStyles =
      "flex items-center space-x-3 p-2 rounded-lg text-[#F8FAFC] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]";

    if (isLogout)
      return `${baseStyles} hover:bg-[#EF4444]/20 hover:text-[#EF4444]`;

    if (isActive)
      return `${baseStyles} bg-[#3B82F6] text-[#F8FAFC] font-bold shadow-inner shadow-black/20`;

    return `${baseStyles} hover:bg-[#3B82F6]/20 hover:text-[#3B82F6]`;
  };

  return (
    <nav
      className={`flex flex-col ${isMobile ? "p-6 space-y-4" : "space-y-2"}`}
      aria-label="Main Navigation"
    >
      {navItems.map((item) => {
        const navContent = (
          <div className="flex items-center space-x-3">
            <item.icon size={20} />
            <span className="font-semibold">{item.name}</span>
          </div>
        );

        if (item.isLogout) {
          return (
            <button
              key={item.name}
              onClick={() => {
                item.action();
                if (onClose) onClose();
              }}
              className={getLinkClass(false, true) + " text-left w-full"}
              aria-label={item.name}
            >
              {navContent}
            </button>
          );
        }

        return (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={onClose}
            aria-label={`Go to ${item.name}`}
            className={({ isActive }) =>
              `text-left w-full ${getLinkClass(isActive, false)}`
            }
          >
            {navContent}
          </NavLink>
        );
      })}
    </nav>
  );
};

// Main Layout
export const PrivateLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-[#1E293B] border-r border-[#334155] p-4 hidden lg:block z-40">
        <div className="py-6 mb-8 border-b border-[#334155]">
          <h2 className="text-2xl font-extrabold text-[#3B82F6] px-3">
            TicketApp
          </h2>
        </div>
        <Navigation onClose={() => {}} />
      </aside>

      <main className="lg:ml-64 relative min-h-screen">
        {/* Mobile Header */}
        <header className="flex lg:hidden justify-between items-center bg-[#1E293B] p-4 border-b border-[#334155] sticky top-0 z-50">
          <h2 className="text-xl font-extrabold text-[#3B82F6]">TicketApp</h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-[#F8FAFC] hover:text-[#3B82F6] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Mobile Sidebar (Simple CSS Transition Instead of Framer Motion) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-[60] bg-black/70 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <aside
              className="fixed top-0 left-0 w-64 h-full bg-[#1E293B] shadow-2xl transform transition-transform duration-300"
              style={{
                transform: isSidebarOpen
                  ? "translateX(0)"
                  : "translateX(-100%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-[#334155]">
                <h2 className="text-2xl font-extrabold text-[#3B82F6]">
                  TicketApp
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-[#F8FAFC] hover:text-[#3B82F6] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <Navigation
                isMobile={true}
                onClose={() => setIsSidebarOpen(false)}
              />
            </aside>
          </div>
        )}

        {/* Content Area */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </div>
      </main>
    </div>
  );
};
