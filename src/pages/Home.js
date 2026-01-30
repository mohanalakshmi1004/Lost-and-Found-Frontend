import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      // If not logged in, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="page-title">
      <h1>Welcome to the Lost & Found Portal</h1>
      <p>Report your lost or found items quickly and find matches!</p>
    </div>
  );
}

export default Home;
