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

// ✅ PrivateRoute Component (Protected Pages)
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const lost = JSON.parse(localStorage.getItem("lostItems")) || [];
    const found = JSON.parse(localStorage.getItem("foundItems")) || [];
    setLostItems(lost);
    setFoundItems(found);
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
                <Matches lostItems={lostItems} foundItems={foundItems} />
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
