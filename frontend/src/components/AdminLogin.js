import React, { useState, useEffect } from "react";
import authService from "../services/authServices";
import AdminDashboard from "./AdminDashboard";

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
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
      }}
    >
      {authenticated ? (
        adminDetails ? (
          <AdminDashboard adminDetails={adminDetails} />
        ) : (
          <p>Loading admin details...</p>
        )
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>Admin Login</h2>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminLogin;
