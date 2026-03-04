import React, { useState } from "react";
import '../styles/style.css';

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/+$/g, "");

function LostForm({ addLostItem }) {
  const [item, setItem] = useState("");
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item || !place || !userName || !contact) {
      alert("Item, Place, Name, and Contact are required!");
      return;
    }

    // 1. Get the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to report an item!");
      return;
    }

    const newItem = {
      item,
      place,
      desc,
      lostDate,
      contactName: userName,
      contactPhone: contact,
      userAddress,
      image,
    };

    try {
      // 2. Include the Authorization header in the fetch call
      const response = await fetch(`${API_URL}/api/lost`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // THE CRUCIAL FIX
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(`"${item}" added successfully!`);
        // Reset form
        setItem(""); setPlace(""); setDesc(""); setLostDate("");
        setUserName(""); setUserAddress(""); setContact(""); setImage(null);
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        // If 401, the token might be expired
        alert("Failed to add item: " + (data.message || "Unauthorized access"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting the form");
    }
  };

  return (
    <div className="form-card">
      <h3>Report Lost Item</h3>
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Item Name" value={item} onChange={(e) => setItem(e.target.value)} required />
        <input type="text" placeholder="Place Lost" value={place} onChange={(e) => setPlace(e.target.value)} required />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input type="date" value={lostDate} onChange={(e) => setLostDate(e.target.value)} />
        <input type="text" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <input type="text" placeholder="Your Address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
        <input type="text" placeholder="Contact Details" value={contact} onChange={(e) => setContact(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LostForm;