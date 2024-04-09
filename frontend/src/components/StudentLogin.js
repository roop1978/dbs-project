// StudentLogin.js

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
      console.log(username);
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
    <div>
      {authenticated ? (
        studentDetails ? (
          <StudentDashboard studentDetails={studentDetails} />
        ) : (
          <p>Loading student details...</p>
        )
      ) : (
        <>
          <h2>Student Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default StudentLogin;
