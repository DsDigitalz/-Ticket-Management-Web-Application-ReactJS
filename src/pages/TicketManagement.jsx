// src/pages/TicketManagement.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Layout } from "../components/common/Layout";
import { StatusTag } from "../components/tickets/StatusTag";
import { getTickets, deleteTicket } from "../api/tickets";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Reusable Framer Motion variants for lists
const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const TicketCard = ({ ticket, onDelete }) => {
  // <article> semantic tag for each ticket
  return (
    <motion.article
      className="bg-surface p-6 rounded-xl shadow-md border border-border flex justify-between items-start"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-text-high mb-2">
          {ticket.title}
        </h3>
        <p className="text-text-low mb-3">{ticket.description}</p>
        <StatusTag status={ticket.status} />
        <span className="text-text-low text-sm ml-4">
          Priority: {ticket.priority}
        </span>
      </div>
      <div className="flex space-x-2">
        {/* Simulated Edit and Delete Buttons */}
        <button
          // In a full implementation, this would open a modal/form
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm transition duration-150"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(ticket.id, ticket.title)}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition duration-150"
        >
          Delete
        </button>
      </div>
    </motion.article>
  );
};

export const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTickets = useCallback(() => {
    setIsLoading(true);
    getTickets()
      .then((data) => {
        setTickets(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load tickets. Please retry.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleDelete = (id, title) => {
    if (
      !window.confirm(`Are you sure you want to delete the ticket: "${title}"?`)
    ) {
      return;
    }

    deleteTicket(id)
      .then(() => {
        toast.success(`Ticket "${title}" successfully deleted.`);
        loadTickets(); // Reload the list
      })
      .catch(() => {
        toast.error(
          "Failed to delete ticket. Network error or ticket not found."
        );
      });
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-text-high mb-8">
        Ticket Management
      </h1>

      {/* Action Bar for Create Button */}
      <div className="mb-8 text-right">
        <button
          // This would open the TicketForm component/modal
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          + Create New Ticket
        </button>
      </div>

      {/* <section> semantic tag for the list of tickets */}
      <section className="space-y-4">
        {isLoading ? (
          <p className="text-center text-text-low">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-text-low">
            No tickets found. Create one!
          </p>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDelete={handleDelete}
            />
          ))
        )}
      </section>
    </Layout>
  );
};
