// src/components/common/Layout.jsx
import React from "react";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  return (
    // <main> semantic tag: Main content wrapper for public pages.
    // min-h-screen ensures it takes full viewport height
    <div className="min-h-screen bg-[#0F172A] my-auto flex flex-col">
      <main className="flex-grow max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};
