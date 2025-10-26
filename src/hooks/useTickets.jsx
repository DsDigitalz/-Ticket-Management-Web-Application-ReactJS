// src/hooks/useTickets.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { mockTicketApi } from "../api/ticketsApi.js";

// Data Validation Mandates: Strict status options
export const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "closed", label: "Closed" },
];

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Read: Fetch tickets
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockTicketApi.readAll();
      setTickets(data);
    } catch (err) {
      setError(err.message || "Failed to load tickets. Please retry.");
      toast.error("Failed to load tickets. Please retry."); // Flawless Error Handling
    } finally {
      setLoading(false);
    }
  };

  // Create: New ticket
  const createTicket = async (newTicketData) => {
    try {
      const createdTicket = await mockTicketApi.create(newTicketData);
      setTickets((prev) => [createdTicket, ...prev]);
      toast.success("Ticket created successfully!"); // Clear Success Feedback
    } catch (err) {
      toast.error("Failed to create ticket.");
    }
  };

  // Update: Edit ticket
  const updateTicket = async (updatedTicketData) => {
    try {
      const updatedTicket = await mockTicketApi.update(updatedTicketData);
      setTickets((prev) =>
        prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
      );
      toast.success(`Ticket #${updatedTicket.id} updated.`);
    } catch (err) {
      toast.error("Failed to update ticket.");
    }
  };

  // Delete: Remove ticket
  const deleteTicket = async (id) => {
    try {
      await mockTicketApi.delete(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
      toast.success(`Ticket #${id} deleted successfully.`);
    } catch (err) {
      toast.error("Failed to delete ticket.");
    }
  };

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket,
  };
};
