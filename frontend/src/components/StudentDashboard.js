import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = ({ studentDetails }) => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    id: "",
    cgpa: "",
    remaining_balance: "",
  });

  useEffect(() => {
    if (studentDetails) {
      setFormDetails(studentDetails);
    }
  }, [studentDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the formDetails object to the backend API for processing
    console.log(formDetails); // Placeholder for API call
  };

  const handleAvailMeal = async () => {
    try {
      const response = await axios.post("http://localhost:4000/transaction", {
        studentId: formDetails.student_id,
        transactionAmount: 200,
      });
      if (response.status === 200) {
        // Transaction successful, update student balance in UI
        // You may need to fetch student details again to get updated balance
        alert("Meal availed successfully!");
      }
    } catch (error) {
      alert("Error availing meal. Please try again later.");
      console.error("Error availing meal:", error);
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Student Dashboard
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Student ID:</label>
          <input
            type="text"
            name="id"
            value={formDetails.student_id}
            onChange={handleChange}
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>CGPA:</label>
          <input
            type="text"
            name="cgpa"
            value={formDetails.cgpa}
            onChange={handleChange}
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Remaining Balance:</label>
          <input
            type="text"
            name="remainingBalance"
            value={formDetails.remaining_balance}
            onChange={handleChange}
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "45%",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleAvailMeal}
            style={{
              backgroundColor: "#008CBA",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "45%",
            }}
          >
            Avail Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentDashboard;
