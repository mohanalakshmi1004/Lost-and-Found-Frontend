import React, { useState } from "react";
import '../styles/style.css';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function FoundForm({ addFoundItem }) {
  const [item, setItem] = useState("");
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);

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
      alert("You must be logged in to report a found item!");
      return;
    }

    const newItem = {
      item,
      place,
      desc,
      foundDate,
      contactName: userName,
      contactPhone: contact,
      userAddress,
      image,
    };

    try {
      // 2. Add the Authorization header to the fetch call
      const response = await fetch(`${API_URL}/api/found`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Fixed: Sends the token to the backend
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`"${item}" added successfully!`);
        // Reset form fields
        setItem(""); setPlace(""); setDesc(""); setFoundDate("");
        setUserName(""); setUserAddress(""); setContact(""); setImage(null);
      } else {
        // If the token is expired or missing, show the backend error message
        alert("Failed to add item: " + (data.message || "Unauthorized"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting the form");
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Report Found Item</h3>
      <input type="text" placeholder="Item Name" value={item} onChange={(e) => setItem(e.target.value)} required />
      <input type="text" placeholder="Place Found" value={place} onChange={(e) => setPlace(e.target.value)} required />
      <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="date" value={foundDate} onChange={(e) => setFoundDate(e.target.value)} />
      <input type="text" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      <input type="text" placeholder="Your Address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
      <input type="text" placeholder="Contact Details" value={contact} onChange={(e) => setContact(e.target.value)} required />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FoundForm;