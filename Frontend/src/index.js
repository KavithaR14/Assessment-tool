import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import App from "./App"; // Your main App component
// import { BrowserRouter } from "react-router-dom";
// import "./index.css"; // Global styles

// Get the root element from your HTML
const rootElement = document.getElementById("root");

// Create a React root and render the app
const root = ReactDOM.createRoot(rootElement); // Use createRoot from react-dom/client
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
