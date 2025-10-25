// src/api/tickets.js
const STATUS_OPTIONS = ["open", "in_progress", "closed"];
let ticketsData = [
  {
    id: 1,
    title: "Database Migration Required",
    description: "Move from MySQL to PostgreSQL for better performance.",
    status: "open",
    priority: "High",
    created: "2025-10-20",
  },
  {
    id: 2,
    title: "Update Landing Page Hero",
    description: "Needs new copy and image rotation.",
    status: "in_progress",
    priority: "Medium",
    created: "2025-10-21",
  },
  {
    id: 3,
    title: "Accessibility Audit for Forms",
    description: "Check all form focus states and screen reader support.",
    status: "closed",
    priority: "High",
    created: "2025-10-18",
  },
];

export const getTickets = () => Promise.resolve(ticketsData);

export const createTicket = (newTicket) => {
  const ticket = {
    ...newTicket,
    id: Date.now(),
    created: new Date().toISOString().split("T")[0],
  };
  ticketsData.push(ticket);
  return Promise.resolve(ticket);
};

export const updateTicket = (updatedTicket) => {
  const index = ticketsData.findIndex((t) => t.id === updatedTicket.id);
  if (index !== -1) {
    ticketsData[index] = updatedTicket;
    return Promise.resolve(updatedTicket);
  }
  return Promise.reject(new Error("Ticket not found."));
};

export const deleteTicket = (id) => {
  const initialLength = ticketsData.length;
  ticketsData = ticketsData.filter((t) => t.id !== id);
  if (ticketsData.length < initialLength) {
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error("Failed to delete ticket."));
};
