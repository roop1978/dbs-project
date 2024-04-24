import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png"; // Verify this path is correct for your project setup
import authService from "../services/authServices";
import StudentDashboard from "./StudentDashboard";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";
const StudentLogin = ({ goToMenu, toggleLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const handleAdminLogin = () => {
    navigate("/admin-login");
  };
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
      <img src={logo} alt="Logo" className="login-logo" />

      {authenticated ? (
        studentDetails ? (
          <StudentDashboard studentDetails={studentDetails} />
        ) : (
          <p className="loading-message">Loading student details...</p>
        )
      ) : (
        <>
          <div className="student-login-container">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="button-row">
                <button type="submit" className="login-button">
                  Log In
                </button>
                <button onClick={handleAdminLogin} className="toggle-login">
                  Switch to Admin Login
                </button>
              </div>
              <div className="menu-button-container"></div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentLogin;
