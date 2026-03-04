import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchList from "../components/MatchList";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Matches() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]); // this will hold all found items (global list)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // ... inside Matches component
// Matches.js - Logic Fix
const fetchData = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // 1. Fetch YOUR lost items
    // 2. Fetch ALL found items (Note: You might need a new route /api/found/all 
    // if your current /api/found is filtered to only show YOUR items)
    const [lostRes, foundRes] = await Promise.all([
      axios.get(`${API_URL}/api/lost`, config),
      axios.get(`${API_URL}/api/found/all`, config), // Suggesting a new route for public feed
    ]);

    setLostItems(lostRes.data);
    setFoundItems(foundRes.data);
  } catch (err) {
    console.error("Error fetching matches", err);
  } finally {
    setLoading(false);
  }
};

  if (loading)
    return (
      <div className="container loading-section">
        <div className="loader-container">
          <p>Finding Matches</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container">
      <h2 className="page-title">Potential Matches</h2>
      <MatchList lostItems={lostItems} foundItems={foundItems} />
    </div>
  );
}

export default Matches;