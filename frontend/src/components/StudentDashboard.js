import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css";
const StudentDashboard = ({ studentDetails }) => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    id: "",
    cgpa: "",
    remaining_balance: "",
  });
  const [feedbackId, setFeedbackId] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
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
  const handleFeedbackButtonClick = () => {
    setShowFeedbackInput(true);
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.post("http://localhost:4000/postfeedback", {
        feedbackId,
        feedbackText,
        studentId: formDetails.student_id,
      });
      if (response.status === 200) {
        alert("Feedback submitted successfully!");
        setFeedbackId("");
        setFeedbackText("");
        setShowFeedbackInput(false);
      }
    } catch (error) {
      alert("Error submitting feedback. Please try again later.");
      console.error("Error submitting feedback:", error);
    }
  };
  const navigate = useNavigate();

  const handleSeeMenuClick = () => {
    // Redirect to the Menu component
    navigate("/menu");
  };
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Student Dashboard</h2>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            name="id"
            value={formDetails.student_id}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="form-label">CGPA:</label> <br></br>
          <input
            type="text"
            name="cgpa"
            value={formDetails.cgpa}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Remaining Balance:</label>
          <input
            type="text"
            name="remainingBalance"
            value={formDetails.remaining_balance}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="action-button-container">
          <button onClick={handleAvailMeal} className="action-button">
            Avail Meal
          </button>
          <div className="feedback-section">
            {showFeedbackInput ? (
              <div className="feedback-input-section">
                <input
                  type="text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Type your feedback here..."
                  className="input-field"
                />
                <input
                  type="text"
                  value={feedbackId}
                  onChange={(e) => setFeedbackId(e.target.value)}
                  placeholder="Feedback ID"
                  className="input-field"
                />
                <button
                  onClick={handleSubmitFeedback}
                  className="action-button"
                >
                  Submit Feedback
                </button>
              </div>
            ) : (
              <button
                onClick={handleFeedbackButtonClick}
                className="action-button"
              >
                Provide Feedback
              </button>
            )}
            <button className="action-button" onClick={handleSeeMenuClick}>
              SEE MENU
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default StudentDashboard;
