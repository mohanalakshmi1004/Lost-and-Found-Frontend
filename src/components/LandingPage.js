import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // adjust path if your Navbar is elsewhere
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== Navbar ===== */}
      <Navbar />

      <div className="landing-container">
        {/* ===== Hero Section ===== */}
        <section className="hero-section">
          <h1 className="landing-title">Welcome to Lost & Found Match</h1>
          <p className="landing-subtitle">
            A smart and secure way to reconnect people with their lost belongings. 
            Whether you’ve misplaced something valuable or found an item that needs to 
            reach its owner, we make the process simple and reliable.
          </p>
          <button className="get-started-btn" onClick={() => navigate("/lost-items")}>
            Get Started
          </button>
        </section>

        {/* ===== Lost & Found Section ===== */}
        <section className="section-grid">
          <div className="info-card">
            <h3>Lost Something?</h3>
            <p>Report your lost item easily and let the community help you find it.</p>
            <button onClick={() => navigate("/lost-items")}>Go to Lost</button>
          </div>

          <div className="info-card">
            <h3>Found Something?</h3>
            <p>Post about the found item so the owner can reclaim it quickly.</p>
            <button onClick={() => navigate("/found-items")}>Go to Found</button>
          </div>
        </section>

        {/* ===== Key Aspects (Lost & Found) ===== */}
        <section className="key-aspects">
          <div className="key-text">
            <h2>Key Aspects of Lost & Found</h2>
            <ul>
              <li>Quick and easy reporting process</li>
              <li>Secure data storage for item details</li>
              <li>Smart matching based on descriptions</li>
              <li>Community-driven platform for trust and transparency</li>
            </ul>
          </div>
          <div className="key-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
              alt="Lost and Found"
            />
          </div>
        </section>

        {/* ===== Match & Profile Section ===== */}
        <section className="section-grid">
          <div className="info-card">
            <h3>Check Matches</h3>
            <p>See if any found item matches your lost report instantly.</p>
            <button onClick={() => navigate("/matches")}>Go to Matches</button>
          </div>

          <div className="info-card">
            <h3>Your Profile</h3>
            <p>View and manage your reports and matched items with ease.</p>
            <button onClick={() => navigate("/profile")}>Go to Profile</button>
          </div>
        </section>

        {/* ===== Key Aspects (Match & Profile) ===== */}
        <section className="key-aspects">
          <div className="key-text">
            <h2>Key Aspects of Matches & Profile</h2>
            <ul>
              <li>Smart matching algorithm connects lost and found reports</li>
              <li>Profile dashboard to track your reports</li>
              <li>Real-time updates and match suggestions</li>
              <li>Transparency and privacy guaranteed</li>
            </ul>
          </div>
          <div className="key-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile & Matches"
            />
          </div>
        </section>
      </div>

     
    </>
  );
}

export default LandingPage;
