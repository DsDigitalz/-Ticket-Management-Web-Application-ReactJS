/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  content: [
    // This scans everything in src/
    "./src/**/*.{js,jsx,ts,tsx}",
    // This scans your root index.html
    "./index.html",
  ],
  // ...
  theme: {
    extend: {
      colors: {
        // --- Core Application Palette ---
        primary: {
          DEFAULT: "#3B82F6", // Blue-500: Main interactive color
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        background: "#0F172A", // Slate-900: Deep, dark background for a premium look
        surface: "#1E293B", // Slate-800: Card/container background (boxes)
        border: "#334155", // Slate-600: Subtle separators
        "text-high": "#F8FAFC", // White: High contrast text
        "text-low": "#94A3B8", // Slate-400: Subdued text/placeholder

        // --- Ticket Status Colors (Required) ---
        status: {
          open: {
            // open → Green tone
            DEFAULT: "#10B981", // Emerald-500
            bg: "#064E3B", // Emerald-900 (for subtle background tag)
            text: "#A7F3D0", // Emerald-200 (for high contrast text tag)
          },
          "in-progress": {
            // in_progress → Amber tone
            DEFAULT: "#F59E0B", // Amber-500
            bg: "#78350F", // Amber-900
            text: "#FDE68A", // Amber-200
          },
          closed: {
            // closed → Gray tone
            DEFAULT: "#64748B", // Slate-500
            bg: "#1E293B", // Slate-800 (or 'surface' color)
            text: "#E2E8F0", // Slate-200
          },
        },

        // --- Decorative Circle/Accent Color ---
        accent: "#EC4899", // Pink-500: Bright, contrasting color for decorative elements
      },

      // --- Custom Shadows for Boxes ---
      boxShadow: {
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        float: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
