import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // Hide navbar on landing page

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideNavbar && <Navbar />}
      <div
        className={hideNavbar ? "landing-fullwidth" : "container"} // Use full width on landing
        style={{ flex: 1, paddingTop: hideNavbar ? "0" : "70px" }}
      >
        {children}
      </div>
      <Footer /> {/* Footer always visible */}
    </div>
  );
};

export default Layout;

