import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] mx-auto max-w-[1440px] mt-0 py-6 sm:py-10 md:py-12 border-t border-[#334155]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[#94A3B8] text-xs sm:text-sm gap-4">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} TicketApp. All rights reserved.
        </p>
        <div className="flex gap-4 sm:gap-6">
          <Link
            to="/privacy"
            className="hover:text-[#F8FAFC] transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-[#F8FAFC] transition-colors duration-200"
          >
            Terms
          </Link>
          <Link
            to="/contact"
            className="hover:text-[#F8FAFC] transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
