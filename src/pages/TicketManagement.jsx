// src/pages/TicketManagement.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Layout } from "../components/common/Layout";
import { useTickets, STATUS_OPTIONS } from "../hooks/useTickets.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit, X } from "lucide-react";
import toast from "react-hot-toast";
import { PrivateLayout } from "../components/common/PrivateLayout.jsx";

// --- Color & Status Rules (Updated) ---
const STATUS_STYLES = {
  // open → Green tone
  open: "border-emerald-500 bg-emerald-900/20 text-emerald-300",
  // in_progress → Amber tone
  in_progress: "border-amber-500 bg-amber-900/20 text-amber-300",
  // closed → Gray tone
  closed: "border-slate-500 bg-slate-900/20 text-slate-300",
};

// 1. Ticket Card (Read/Display)
const TicketCard = ({ ticket, onEdit, onDelete }) => {
  const statusColor = STATUS_STYLES[ticket.status] || STATUS_STYLES.open;

  // Framer Motion: Fade-in and Slide-in (User Instruction)
  return (
    // <article> semantic tag (Card-like boxes used for tickets)
    <motion.article
      className="bg-[#1E293B] p-5 rounded-xl shadow-xl border border-[#334155] flex flex-col justify-between hover:border-[#3B82F6] transition-colors duration-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      aria-label={`Ticket ${ticket.id}: ${ticket.title}`} // Accessibility
    >
      <div>
        <header className="mb-3 flex justify-between items-start">
          <h3 className="text-xl font-bold text-[#F8FAFC] leading-tight pr-4">
            {ticket.title}
          </h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColor} whitespace-nowrap`}
          >
            {ticket.status.replace("_", " ")}
          </span>
        </header>
        <p className="text-[#94A3B8] text-sm mb-4 line-clamp-3">
          {ticket.description || "No description provided."}
        </p>
      </div>

      <footer className="flex justify-end space-x-2 border-t border-[#334155] pt-3">
        <motion.button
          onClick={() => onEdit(ticket)}
          className="text-[#3B82F6] hover:text-[#2563EB] transition duration-150 p-2 rounded-full hover:bg-[#3B82F6]/10 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          aria-label={`Edit ticket ${ticket.id}`} // Accessibility
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Edit size={18} />
        </motion.button>
        <motion.button
          onClick={() => onDelete(ticket.id)}
          className="text-[#EF4444] hover:text-[#DC2626] transition duration-150 p-2 rounded-full hover:bg-[#EF4444]/10 focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          aria-label={`Delete ticket ${ticket.id}`} // Accessibility
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={18} />
        </motion.button>
      </footer>
    </motion.article>
  );
};

// 2. Ticket Form Modal (Create/Update)
const TicketFormModal = ({ ticket, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: ticket?.title || "",
    description: ticket?.description || "",
    status: ticket?.status || STATUS_OPTIONS[0].value, // Default to first status
    priority: ticket?.priority || "medium",
  });
  const [errors, setErrors] = useState({});

  const isEdit = !!ticket?.id;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is mandatory.";
    }
    if (!formData.status) {
      newErrors.status = "Status is mandatory.";
    } else if (!STATUS_OPTIONS.some((opt) => opt.value === formData.status)) {
      newErrors.status =
        "Invalid status value. Must be 'open', 'in_progress', or 'closed'.";
    }
    // Simple length validation for description (Optional field)
    if (formData.description.length > 500) {
      newErrors.description = "Description must be under 500 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Real-time validation: Re-validate field on change
    if (errors[name]) {
      // Re-run validation on the specific field to clear the error immediately
      const tempFormData = { ...formData, [name]: value };
      const newErrors = {};

      if (name === "title" && !tempFormData.title.trim()) {
        newErrors.title = "Title is mandatory.";
      }
      if (
        name === "status" &&
        !STATUS_OPTIONS.some((opt) => opt.value === tempFormData.status)
      ) {
        newErrors.status = "Invalid status value.";
      } else if (name === "status" && !tempFormData.status) {
        newErrors.status = "Status is mandatory.";
      }
      if (name === "description" && tempFormData.description.length > 500) {
        newErrors.description = "Description must be under 500 characters.";
      }

      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(isEdit ? { ...ticket, ...formData } : formData);
    } else {
      // Display clear error feedback via toast
      toast.error("Please correct the validation errors below.");
    }
  };

  // Framer Motion for modal backdrop and container
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close on backdrop click
    >
      <motion.div
        className="bg-[#0F172A] w-full max-w-lg rounded-xl shadow-2xl p-6 border border-[#334155]"
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        role="dialog" // Accessibility
        aria-modal="true" // Accessibility
        aria-labelledby="modal-title" // Accessibility
      >
        <header className="flex justify-between items-center border-b border-[#334155] pb-3 mb-5">
          <h2 id="modal-title" className="text-2xl font-bold text-[#F8FAFC]">
            {isEdit ? "Edit Ticket" : "Create New Ticket"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F8FAFC] transition p-1 rounded-full hover:bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </header>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field (Mandatory) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="title"
              className="text-[#94A3B8] font-medium block mb-1"
            >
              Title <span className="text-[#EF4444]">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border ${
                errors.title ? "border-[#EF4444]" : "border-[#334155]"
              } focus:ring-2 focus:ring-[#3B82F6] outline-none transition`}
              placeholder="Enter ticket title (mandatory)"
              required
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-[#EF4444] text-sm mt-1">
                {errors.title}
              </p>
            )}
          </motion.div>

          {/* Description Field (Optional, with length validation) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <label
              htmlFor="description"
              className="text-[#94A3B8] font-medium block mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border ${
                errors.description ? "border-[#EF4444]" : "border-[#334155]"
              } focus:ring-2 focus:ring-[#3B82F6] outline-none transition resize-none`}
              placeholder="Detailed description (max 500 chars)"
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            {errors.description && (
              <p id="description-error" className="text-[#EF4444] text-sm mt-1">
                {errors.description}
              </p>
            )}
          </motion.div>

          {/* Status and Priority Fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status Field (Mandatory, strict options) */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label
                htmlFor="status"
                className="text-[#94A3B8] font-medium block mb-1"
              >
                Status <span className="text-[#EF4444]">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border ${
                  errors.status ? "border-[#EF4444]" : "border-[#334155]"
                } focus:ring-2 focus:ring-[#3B82F6] outline-none transition`}
                required
                aria-invalid={!!errors.status}
                aria-describedby={errors.status ? "status-error" : undefined}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p id="status-error" className="text-[#EF4444] text-sm mt-1">
                  {errors.status}
                </p>
              )}
            </motion.div>

            {/* Priority Field (Optional) */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label
                htmlFor="priority"
                className="text-[#94A3B8] font-medium block mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border border-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-[#3B82F6]/30 mt-6 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isEdit ? "Save Changes" : "Create Ticket"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// 3. Confirmation Modal (Delete)
const ConfirmDeleteModal = ({ ticketId, onClose, onConfirm }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#0F172A] w-full max-w-sm rounded-xl shadow-2xl p-6 border border-[#EF4444]/50"
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog" // Accessibility
        aria-modal="true" // Accessibility
        aria-labelledby="confirm-title" // Accessibility
        aria-describedby="confirm-description" // Accessibility
      >
        <h2
          id="confirm-title"
          className="text-xl font-bold text-[#F8FAFC] mb-3"
        >
          Confirm Deletion
        </h2>
        <p id="confirm-description" className="text-[#94A3B8] mb-6">
          Are you sure you want to delete ticket ID{" "}
          <span className="font-bold text-[#EF4444]">#{ticketId}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#94A3B8] rounded-lg hover:bg-[#1E293B] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(ticketId)}
            className="px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-[#F8FAFC] font-semibold rounded-lg transition shadow-lg shadow-[#EF4444]/30 focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---

export const TicketManagement = () => {
  const {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket,
  } = useTickets();

  // Assuming useAuth provides isAuthenticated and a navigate function (Router requirement)
  const { isAuthenticated, navigate } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  // Security & Authorization: Redirect if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      // Explicitly check for false after loading
      toast.error("Your session has expired — please log in again.");
      navigate("/auth/login"); // Redirect unauthorized users
    } else if (isAuthenticated === true) {
      fetchTickets(); // Fetch tickets only if authorized
    }
  }, [isAuthenticated, navigate]);

  // CRUD Handlers
  const handleOpenCreate = () => {
    setCurrentTicket(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ticket) => {
    setCurrentTicket(ticket);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id) => {
    setTicketToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleFormSubmit = async (data) => {
    if (data.id) {
      await updateTicket(data);
    } else {
      await createTicket(data);
    }
    setIsModalOpen(false); // Close modal on success
  };

  const handleConfirmDelete = async (id) => {
    await deleteTicket(id);
    setIsConfirmOpen(false); // Close modal on success
    setTicketToDelete(null);
  };

  if (isAuthenticated === false) return null; // Avoid rendering if we are about to redirect

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-[#94A3B8]">Loading data...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PrivateLayout>
        {/* Decorative Elements (Circular) */}
        {/* Circular Decorative Element 1 */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#3B82F6]/10 rounded-full filter blur-3xl opacity-30 pointer-events-none z-0 hidden lg:block" />
        {/* Circular Decorative Element 2 */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EF4444]/10 rounded-full filter blur-3xl opacity-20 pointer-events-none z-0 hidden lg:block" />

        {/* Header (z-10 to stay above decorations) */}
        <header className="flex flex-col sm:flex-row justify-between items-center py-6 sm:py-8 border-b border-[#334155] mb-8 relative z-10">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ticket Management
          </motion.h1>
          <motion.button
            onClick={handleOpenCreate}
            className="mt-4 sm:mt-0 bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg shadow-[#3B82F6]/30 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Create new ticket"
          >
            <Plus size={20} />
            <span>New Ticket</span>
          </motion.button>
        </header>

        {/* Flawless Error Handling: Display fetch error */}
        {error && (
          <motion.div
            className="bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444] p-4 rounded-lg mb-8 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            role="alert"
          >
            <p className="font-medium">Failed to load tickets. Please retry.</p>
          </motion.div>
        )}

        {/* Ticket List (Read) - Responsive Grid */}
        <section
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 relative z-10"
          aria-label="Existing Tickets"
        >
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))
          ) : (
            <motion.div
              className="sm:col-span-2 lg:col-span-3 text-center py-10 text-[#94A3B8] border border-dashed border-[#334155] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No tickets found. Click "New Ticket" to get started!
            </motion.div>
          )}
        </section>

        {/* Modals */}
        <AnimatePresence>
          {isModalOpen && (
            <TicketFormModal
              ticket={currentTicket}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleFormSubmit}
            />
          )}
          {isConfirmOpen && (
            <ConfirmDeleteModal
              ticketId={ticketToDelete}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={handleConfirmDelete}
            />
          )}
        </AnimatePresence>
      </PrivateLayout>
    </Layout>
  );
};
