// src/components/tickets/TicketCard.jsx

import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TicketCard = ({ ticket }) => {
  // Use <article> or <section> for semantic grouping
  return (
    <motion.article 
      className="p-6 bg-gray-800 rounded-lg shadow-xl"
      // Animation on scroll: fade-in and slide-in
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* ... Card content (title, description, StatusTag) ... */}
    </motion.article>
  );
};