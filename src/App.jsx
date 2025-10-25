// src/App.jsx
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router/AppRouter";

const App = () => {
  return (
    <div>
      {" "}
      <AppRouter />;{/* Other components like Router, Layout, etc. */}
      {/* ... */}
      {/* Styled Toaster (Place this once in your app) */}
      <Toaster
        position="top-right" // You can change the position
        toastOptions={{
          // Default style for all toasts
          className: "shadow-lg rounded-xl backdrop-blur-md",
          style: {
            background: "#1E293B", // Surface color
            color: "#F8FAFC", // Text High color
            border: "1px solid #334155", // Border color
          },
          // Custom styles for success toasts
          success: {
            iconTheme: {
              primary: "#3B82F6", // Primary Blue
              secondary: "#F8FAFC",
            },
          },
          // Custom styles for error toasts
          error: {
            iconTheme: {
              primary: "#EF4444", // Error Red
              secondary: "#F8FAFC",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
