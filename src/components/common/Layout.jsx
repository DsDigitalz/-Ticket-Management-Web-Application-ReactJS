// src/components/common/Layout.jsx
import React from "react";

// Theme Colors
// Background: #0F172A (slate-900)

export const Layout = ({ children }) => {
  return (
    <main className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* Container Rule: max-width: 1440px, centered */}
      <div className="max-w-[1440px] mx-auto p-4 sm:p-8">{children}</div>
    </main>
  );
};
