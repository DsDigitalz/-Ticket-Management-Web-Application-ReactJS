// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
// src/main.jsx (CORRECT - uses named export)
import { App } from './App.jsx';
// ...
import "./index.css"; // Your main CSS file with Tailwind directives

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
