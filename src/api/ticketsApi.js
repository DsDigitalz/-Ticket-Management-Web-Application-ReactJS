// src/api/ticketsApi.js

const TICKET_STORAGE_KEY = "TICKETAPP_TICKETS";

// Helper to initialize or load tickets from localStorage
const loadTickets = () => {
  const data = localStorage.getItem(TICKET_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  // Initial mock data if storage is empty
  return [
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
      status: "in progress",
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
};

// Helper to save tickets to localStorage
const saveTickets = (tickets) => {
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockTicketApi = {
  // Read all tickets
  readAll: async () => {
    await delay(500);
    const tickets = loadTickets();
    return tickets.sort((a, b) => b.id - a.id); // Sort by ID descending
  },

  // Create new ticket
  create: async (ticket) => {
    await delay(400);
    let tickets = loadTickets();
    const newId = Math.max(...tickets.map((t) => t.id), 100) + 1;
    const newTicket = {
      ...ticket,
      id: newId,
      createdAt: Date.now(),
      status: ticket.status || "open", // Fallback status
    };
    tickets.unshift(newTicket);
    saveTickets(tickets);
    return newTicket;
  },

  // Update existing ticket
  update: async (updates) => {
    await delay(400);
    let tickets = loadTickets();
    const index = tickets.findIndex((t) => t.id === updates.id);

    if (index === -1) throw new Error("Ticket not found.");

    const updatedTicket = { ...tickets[index], ...updates };
    tickets[index] = updatedTicket;

    saveTickets(tickets);
    return updatedTicket;
  },

  // Delete ticket
  delete: async (id) => {
    await delay(300);
    let tickets = loadTickets();
    const initialLength = tickets.length;
    tickets = tickets.filter((t) => t.id !== id);

    if (tickets.length === initialLength) {
      throw new Error("Ticket not found for deletion.");
    }

    saveTickets(tickets);
    return true;
  },
};
