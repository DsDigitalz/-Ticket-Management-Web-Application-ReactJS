// src/components/common/Layout.jsx
import { motion } from "framer-motion";
import Footer from "./Footer";
// import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    // <article> is suitable for the main app content wrapper
    <article className="min-h-screen bg-background text-text-high font-sans">
      {/* Main content wrapper, centered with max-width: 1440px (~7xl) */}
      <motion.div
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {/* <main> semantic tag for the document's main content */}
        <main className="py-12 min-h-[80vh]">{children}</main>
      </motion.div>

      <Footer />
    </article>
  );
};

// src/components/common/Footer.jsx

