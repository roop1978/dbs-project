import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = ({ studentDetails }) => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    id: "",
    cgpa: "",

    remainingBalance: "",
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
    <div>
      <h2>Student Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            name="id"
            value={formDetails.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CGPA:</label>
          <input
            type="text"
            name="cgpa"
            value={formDetails.cgpa}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Remaining Balance:</label>
          <input
            type="text"
            name="remainingBalance"
            value={formDetails.remaining_balance}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleAvailMeal}>
          Avail Meal
        </button>
      </form>
    </div>
  );
};

export default StudentDashboard;
