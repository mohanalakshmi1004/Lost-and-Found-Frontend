import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch latest lost and found items
  const fetchData = async () => {
    setLoading(true);
    try {
      const [lostRes, foundRes] = await Promise.all([
        axios.get("http://localhost:5000/api/lost"),
        axios.get("http://localhost:5000/api/found"),
      ]);

      setLostItems(lostRes.data.map(item => ({ ...item, _id: item._id.toString() })));
      setFoundItems(foundRes.data.map(item => ({ ...item, _id: item._id.toString() })));
    } catch (err) {
      console.error("Failed to fetch profile data:", err.response?.data || err.message);
      alert("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  // DELETE Lost Item
  const deleteLostItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lost item?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/lost/${id}`);
      await fetchData(); // Refetch latest items
    } catch (err) {
      console.error("Failed to delete lost item:", err.response?.data || err.message);
      alert("Failed to delete lost item: " + (err.response?.data?.message || err.message));
    } finally {
      setDeletingId(null);
    }
  };

  // DELETE Found Item
  const deleteFoundItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this found item?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/found/${id}`);
      await fetchData(); // Refetch latest items
    } catch (err) {
      console.error("Failed to delete found item:", err.response?.data || err.message);
      alert("Failed to delete found item: " + (err.response?.data?.message || err.message));
    } finally {
      setDeletingId(null);
    }
  };

  // Match lost items with found items
  const lostWithMatch = lostItems.map(lost => {
    const match = foundItems.find(f =>
      f.item.toLowerCase().includes(lost.item.toLowerCase()) &&
      f.place.toLowerCase().includes(lost.place.toLowerCase())
    );
    return match
      ? { ...lost, matched: true, finderName: match.contactName, finderContact: match.contactPhone }
      : lost;
  });

  if (loading) return <p>Loading profile data...</p>;

  return (
    <div className="container profile-section">
      <h2 className="page-title">My Profile</h2>

      {/* LOST ITEMS */}
      <h3 style={{ color: "skyblue" }}>Lost Items</h3>
      {lostWithMatch.length === 0 && <p className="empty-msg">No lost items reported yet.</p>}
      {lostWithMatch.map(item => (
        <div key={item._id} className="profile-card">
          <h3>{item.item}</h3>
          <div className="profile-info">Place: {item.place}</div>
          {item.lostDate && <div className="profile-info">Lost Date: {new Date(item.lostDate).toDateString()}</div>}
          {item.desc && <div className="profile-info">Description: {item.desc}</div>}
          <div className="profile-info">Name: {item.contactName}</div>
          <div className="profile-info">Contact: {item.contactPhone}</div>
          <div className="profile-info">Address: {item.userAddress}</div>
          {item.image && <img src={item.image} alt={item.item} style={{ maxWidth: "100%", marginTop: 10 }} />}
          {item.matched && (
            <p style={{ color: "#00ffcc", fontWeight: "bold" }}>
              ✅ Found! Contact finder: {item.finderName} ({item.finderContact})
            </p>
          )}
          <button
            className="status delete-btn"
            onClick={() => deleteLostItem(item._id)}
            disabled={deletingId === item._id}
          >
            {deletingId === item._id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}

      {/* FOUND ITEMS */}
      <h3 style={{ color: "skyblue", marginTop: 30 }}>Found Items</h3>
      {foundItems.length === 0 && <p className="empty-msg">No found items reported yet.</p>}
      {foundItems.map(item => (
        <div key={item._id} className="profile-card">
          <h3>{item.item}</h3>
          <div className="profile-info">Place: {item.place}</div>
          {item.foundDate && <div className="profile-info">Found Date: {new Date(item.foundDate).toDateString()}</div>}
          {item.desc && <div className="profile-info">Description: {item.desc}</div>}
          <div className="profile-info">Name: {item.contactName}</div>
          <div className="profile-info">Contact: {item.contactPhone}</div>
          <div className="profile-info">Address: {item.userAddress}</div>
          {item.image && <img src={item.image} alt={item.item} style={{ maxWidth: "100%", marginTop: 10 }} />}
          <button
            className="status delete-btn"
            onClick={() => deleteFoundItem(item._id)}
            disabled={deletingId === item._id}
          >
            {deletingId === item._id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Profile;
