import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [lostItems, setLostItems] = useState([]);
  const [myFoundItems, setMyFoundItems] = useState([]); // items the logged-in user has reported
  const [allFoundItems, setAllFoundItems] = useState([]); // all found items for matching
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found in localStorage, redirecting to login");
      setLoading(false);
      navigate("/login");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      // fetch user's lost items, user's own found items (for display), and
      // all found items so we can match across users
      const [lostRes, myFoundRes, allFoundRes] = await Promise.all([
        axios.get("http://localhost:5000/api/lost", config),
        axios.get("http://localhost:5000/api/found", config),
        axios.get("http://localhost:5000/api/found/all", config),
      ]);

      setLostItems(lostRes.data);
      setMyFoundItems(myFoundRes.data);
      setAllFoundItems(allFoundRes.data);
    } catch (err) {
      // if token was invalid/expired, the server will send 401
      if (err.response && err.response.status === 401) {
        console.error("Auth error while fetching profile, redirecting to login");
        navigate("/login");
      } else {
        console.error("Failed to fetch profile data:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Added headers to delete request
  const deleteLostItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lost item?")) return;
    const token = localStorage.getItem("token");

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/lost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchData(); 
    } catch (err) {
      alert("Error deleting: " + (err.response?.status === 401 ? "Unauthorized. Log in again." : err.message));
    } finally {
      setDeletingId(null);
    }
  };

  // FIXED: Added headers to delete request
  const deleteFoundItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this found item?")) return;
    const token = localStorage.getItem("token");

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/found/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchData();
    } catch (err) {
      alert("Error deleting: " + (err.response?.status === 401 ? "Unauthorized. Log in again." : err.message));
    } finally {
      setDeletingId(null);
    }
  };

  // compare lost items only with global found list
  const lostWithMatch = lostItems.map((lost) => {
    const match = allFoundItems.find(
      (f) =>
        f.item.toLowerCase().includes(lost.item.toLowerCase()) &&
        f.place.toLowerCase().includes(lost.place.toLowerCase())
    );
    return match
      ? { ...lost, matched: true, finderName: match.contactName, finderContact: match.contactPhone }
      : lost;
  });

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader-container">
          <p>Loading Profile</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container profile-section">
      <h2 className="page-title">My Profile</h2>

      {/* LOST ITEMS */}
      <div className="section-header-group">
        <h3 className="section-subtitle">Lost Items</h3>
        <p className="item-count">{lostWithMatch.length} items reported</p>
      </div>
      
      {/* Logic check: Only show grid if there are items */}
      <div className="items-grid">
        {lostWithMatch.length === 0 ? (
          <p className="empty-msg">No lost items reported yet.</p>
        ) : (
          lostWithMatch.map((item) => (
            <div key={item._id} className="profile-card">
              <div className="card-content">
                <h3>{item.item}</h3>
                <div className="profile-info"><strong>Place:</strong> {item.place}</div>
                {item.lostDate && <div className="profile-info"><strong>Date:</strong> {new Date(item.lostDate).toDateString()}</div>}
                <div className="profile-info"><strong>Contact:</strong> {item.contactPhone}</div>
                {item.image && <img src={item.image} alt={item.item} className="card-img" />}
                
                {item.matched && (
                  <div className="match-alert">
                    ✅ Found! Contact finder: {item.finderName} ({item.finderContact})
                  </div>
                )}
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteLostItem(item._id)}
                disabled={deletingId === item._id}
              >
                {deletingId === item._id ? "Deleting..." : "Delete Item"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* FOUND ITEMS */}
      <div className="section-header-group">
        <h3 className="section-subtitle">Found Items</h3>
        <p className="item-count">{myFoundItems.length} items reported</p>
      </div>

      <div className="items-grid">
        {myFoundItems.length === 0 ? (
          <p className="empty-msg">No found items reported yet.</p>
        ) : (
          myFoundItems.map((item) => (
            <div key={item._id} className="profile-card">
              <div className="card-content">
                <h3>{item.item}</h3>
                <div className="profile-info"><strong>Place:</strong> {item.place}</div>
                {item.foundDate && <div className="profile-info"><strong>Date:</strong> {new Date(item.foundDate).toDateString()}</div>}
                <div className="profile-info"><strong>Contact:</strong> {item.contactPhone}</div>
                {item.image && <img src={item.image} alt={item.item} className="card-img" />}
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteFoundItem(item._id)}
                disabled={deletingId === item._id}
              >
                {deletingId === item._id ? "Deleting..." : "Delete Item"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;