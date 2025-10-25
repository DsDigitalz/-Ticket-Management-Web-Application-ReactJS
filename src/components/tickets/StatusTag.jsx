// src/components/tickets/StatusTag.jsx
import React from "react";

const statusMap = {
  open: {
    text: "Open",
    bg: "bg-status-open-bg",
    color: "text-status-open-text",
  },
  in_progress: {
    text: "In Progress",
    bg: "bg-status-in-progress-bg",
    color: "text-status-in-progress-text",
  },
  closed: {
    text: "Closed",
    bg: "bg-status-closed-bg",
    color: "text-status-closed-text",
  },
};

export const StatusTag = ({ status }) => {
  const s = statusMap[status] || statusMap["closed"]; // Default to closed if status is invalid

  // <span> semantic tag for inline element
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${s.bg} ${s.color} uppercase tracking-wider`}
    >
      {s.text}
    </span>
  );
};
