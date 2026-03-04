import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">Unlost</div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span className={mobileMenuOpen ? "active" : ""}></span>
        <span className={mobileMenuOpen ? "active" : ""}></span>
        <span className={mobileMenuOpen ? "active" : ""}></span>
      </div>

      {/* Sidebar Navigation */}
      <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li>
          <Link to="/lost-items" onClick={closeMobileMenu}>Lost</Link>
        </li>
        <li>
          <Link to="/found-items" onClick={closeMobileMenu}>Found</Link>
        </li>
        <li>
          <Link to="/matches" onClick={closeMobileMenu}>Match</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile" onClick={closeMobileMenu}>{user.name}</Link>
            </li>
            <li>
              <span onClick={handleLogout} className="logout-btn">
                Logout
              </span>
            </li>
          </>
        ) : (
          <li>
            <Link to="/signup" onClick={closeMobileMenu}>Signup/Login</Link>
          </li>
        )}
      </ul>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
    </nav>
  );
}

export default Navbar;
