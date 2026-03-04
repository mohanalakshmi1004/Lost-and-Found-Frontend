import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import all CSS
import "./styles/style.css";
import "./styles/Navbar.css";
import "./styles/Container.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/montserrat/400.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
