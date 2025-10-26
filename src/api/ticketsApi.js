// src/api/ticketsApi.js
let MOCK_DB = [
  {
    id: 101,
    title: "Database Migration Failure",
    description:
      "The nightly migration script failed to connect to the staging database.",
    status: "open",
    priority: "high",
    createdAt: Date.now() - 500000,
  },
  {
    id: 102,
    title: "Update Button Styling",
    description:
      "The primary blue button on the dashboard is slightly off-brand.",
    status: "in_progress",
    priority: "low",
    createdAt: Date.now() - 300000,
  },
  {
    id: 103,
    title: "Authentication Flow Test",
    description:
      "Confirmed that the new logout function clears the session correctly.",
    status: "closed",
    priority: "medium",
    createdAt: Date.now() - 100000,
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockTicketApi = {
  // Read all tickets
  readAll: async () => {
    await delay(500);
    return [...MOCK_DB].sort((a, b) => b.id - a.id); // Sort by ID descending
  },

  // Create new ticket
  create: async (ticket) => {
    await delay(400);
    const newId = Math.max(...MOCK_DB.map((t) => t.id), 100) + 1;
    const newTicket = {
      ...ticket,
      id: newId,
      createdAt: Date.now(),
      status: ticket.status || "open", // Fallback status
    };
    MOCK_DB.unshift(newTicket);
    return newTicket;
  },

  // Update existing ticket
  update: async (updatedTicket) => {
    await delay(400);
    const index = MOCK_DB.findIndex((t) => t.id === updatedTicket.id);
    if (index === -1) throw new Error("Ticket not found.");
    MOCK_DB[index] = updatedTicket;
    return updatedTicket;
  },

  // Delete ticket
  delete: async (id) => {
    await delay(300);
    const initialLength = MOCK_DB.length;
    MOCK_DB = MOCK_DB.filter((t) => t.id !== id);
    if (MOCK_DB.length === initialLength)
      throw new Error("Ticket not found for deletion.");
    return true;
  },
};
