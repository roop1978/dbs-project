import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png"; // Verify this path is correct for your project setup
import authService from "../services/authServices";
import StudentDashboard from "./StudentDashboard";
import "./StudentLogin.css";
const StudentLogin = ({ goToMenu, toggleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    if (authenticated) {
      fetchStudentDetails();
    }
  }, [authenticated]);

  const fetchStudentDetails = async () => {
    try {
      // Fetch student details using API endpoint
      const response = await fetch(
        `http://localhost:4000/student-details/${username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }
      const data = await response.json();
      setStudentDetails(data);
    } catch (error) {
      console.error("Error fetching student details:", error);
      setError("Failed to fetch student details");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await authService.studentLogin(username, password);
      if (success) {
        setAuthenticated(true);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className="login-container">
      <img
        src={logo}
        alt="Logo"
        className="login-logo"
        style={{ width: "150px", height: "auto", marginBottom: "10px" }}
      />
      <h2>Student Login</h2>
      {authenticated ? (
        studentDetails ? (
          <StudentDashboard studentDetails={studentDetails} />
        ) : (
          <p>Loading student details...</p>
        )
      ) : (
        <>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {error}
            </p>
          )}
        </>
      )}
      <button onClick={toggleLogin} className="toggle-login">
        Switch to Admin Login
      </button>
      <button onClick={goToMenu} className="menu-button">
        Go to Menu
      </button>
    </div>
  );
};

export default StudentLogin;
