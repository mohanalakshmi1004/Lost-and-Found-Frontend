import React, { useState } from "react";

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

    const newItem = {
      item,
      place,
      desc,
      foundDate,
      contactName: userName,   // ✅ match backend
      contactPhone: contact,   // ✅ match backend
      userAddress,
      image,
    };

    try {
      const response = await fetch("http://localhost:5000/api/found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`"${item}" added successfully!`);
        setItem("");
        setPlace("");
        setDesc("");
        setFoundDate("");
        setUserName("");
        setUserAddress("");
        setContact("");
        setImage(null);
      } else {
        alert("Failed to add item: " + data.message);
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
