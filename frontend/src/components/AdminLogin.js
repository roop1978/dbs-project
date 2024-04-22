// adminlogin.js
import React, { useState, useEffect } from "react";
import authService from "../services/authServices";
import AdminDashboard from "./AdminDashboard";
import logo from "../assets/logo.png";
import "./AdminLogin.css"

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [adminDetails, setAdminDetails] = useState(null);

  const fetchAdminDetails = async (username) => {
    try {
      // Fetch Admin details using API endpoint
      const response = await fetch(
        `http://localhost:4000/admin-details/${username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Admin details");
      }
      const data = await response.json();
      setAdminDetails(data);
    } catch (error) {
      console.error("Error fetching Admin details:", error);
      setError("Failed to fetch Admin details");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await authService.adminLogin(username, password);
      if (success) {
        // If login is successful, set authenticated to true
        setAuthenticated(true);
        // Fetch admin details only after successful login
        fetchAdminDetails(username);

        console.log(username);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };
  useEffect(() => {
    if (authenticated) {
      fetchAdminDetails();
    }
  }, [authenticated]);

  return (
    <div className="login-container">
      <img src={logo} alt="Admin Logo" className="login-logo" />
      {authenticated ? (
        adminDetails ? (
          <AdminDashboard adminDetails={adminDetails} />
        ) : (
          <p>Loading admin details...</p>
        )
      ) : (
        <>
          <h2 >Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="admin-username">Username:</label>
              <input
                type="text"
                id="admin-username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="admin-password">Password:</label>
              <input
                type="password"
                id="admin-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default AdminLogin;
