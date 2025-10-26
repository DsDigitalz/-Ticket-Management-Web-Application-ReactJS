## Project Overview

TicketApp is a modern, responsive web application for managing support tickets and tasks. The project is built using React and styled with Tailwind CSS, prioritizing a clean, dark-themed user interface (UI) and a smooth user experience (UX) powered by Framer Motion animations.

## Key Technologies

Frontend: React (Vite)

Routing: React Router DOM (v6)

Styling: Tailwind CSS (Dark Theme)

Animation: Framer Motion (for transitions and scroll effects)

State/Context: Custom React Context (AuthContext.jsx)

Notifications: react-hot-toast

Icons: Lucide Icons

## Implemented Features

1. Authentication System
   A mock authentication system is in place using React Context and Local Storage.

Login & Registration: Handled by a single, reusable component (AuthScreen.jsx) using the isLogin prop.

Routes: Login is accessible at /auth/login and Registration at /auth/register.

Protected Routes: Navigation to /dashboard and /tickets is protected, requiring a successful login/registration.

Logout: Integrated into the PrivateLayout and handled by the AuthContext.

2. Layouts and Navigation
   The application uses two main layout components for structural consistency:

Layout.jsx: The public layout used for the Landing Page and Authentication Screens.

PrivateLayout.jsx: The protected layout used for the Dashboard and Ticket Management.

Responsive Sidebar: Features a fixed sidebar on desktop and a mobile-friendly, animated overlay menu using Framer Motion.

Active Link Highlighting: Uses the NavLink component to visually highlight the current page (e.g., Dashboard or Ticket Management) with a blue background and bold text.

Animations: All sidebar links are animated with a fade-in and slide-in effect on mount.

3. UI/UX Enhancements
   Framer Motion Integration: All custom components (FeatureBox, StatCard, etc.) and core navigation elements feature scroll-based or mount animations (fade-in/slide-in).

Semantic Markup: HTML elements (<main>, <section>, <aside>, <nav>, <article>) are used appropriately for accessibility and structure.

Themed Toasts: Global notifications (react-hot-toast) are styled to match the dark UI, using the #1E293B background and theme accent colors (blue, green, red) for success/error states.
