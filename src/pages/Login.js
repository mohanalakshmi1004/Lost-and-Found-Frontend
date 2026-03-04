import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/SignupLogin.css";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Login response:", result);

    if (!response.ok) {
      setError(result.message);
      return;
    }

    // Store token & user
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    setError("");
    navigate("/");
  } catch (error) {
    setError("Something went wrong");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="auth-switch">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
