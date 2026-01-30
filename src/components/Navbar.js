import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Unlost</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/lost-items">Lost</Link></li>
        <li><Link to="/found-items">Found</Link></li>
        <li><Link to="/matches">Match</Link></li>
        <li><Link to="/profile">Profile</Link></li>
       <li><Link to="/signup">Signup/Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
