import React, { useState, useEffect } from "react";
import authService from "../services/authServices";
import StudentDashboard from "./StudentDashboard";

const StudentLogin = () => {
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
        studentDetails ? (
          <StudentDashboard studentDetails={studentDetails} />
        ) : (
          <p>Loading student details...</p>
        )
      ) : (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Student Login
          </h2>
          <form onSubmit={handleLogin}>
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
                width: "100%",
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
                width: "100%",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
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

export default StudentLogin;
