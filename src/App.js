import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./Layout"; // Layout includes Navbar & Footer

// strip any trailing slash so we don't end up with double // when appending paths
const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/+$/g, "");

// ✅ PrivateRoute Component (Protected Pages)
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}
function App() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const lostRes = await fetch(`${API_URL}/api/lost`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const foundRes = await fetch(`${API_URL}/api/found`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const lostData = await lostRes.json();
      const foundData = await foundRes.json();

      setLostItems(lostData);
      setFoundItems(foundData);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  fetchData();
}, []);

  const addLostItem = (item) => {
    const updated = [...lostItems, item];
    setLostItems(updated);
    localStorage.setItem("lostItems", JSON.stringify(updated));
  };

  const addFoundItem = (item) => {
    const updated = [...foundItems, item];
    setFoundItems(updated);
    localStorage.setItem("foundItems", JSON.stringify(updated));
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/lost-items"
            element={
              <PrivateRoute>
                <LostItems addLostItem={addLostItem} />
              </PrivateRoute>
            }
          />
          <Route
            path="/found-items"
            element={
              <PrivateRoute>
                <FoundItems addFoundItem={addFoundItem} />
              </PrivateRoute>
            }
          />
          <Route
            path="/matches"
            element={
              <PrivateRoute>
                <Matches />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
