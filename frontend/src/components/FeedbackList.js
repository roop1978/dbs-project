// FeedbackList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackList.css";
const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:4000/feedback");
      setFeedback(response.data);
      console.log("Feedback:", response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div>
      <h2>Feedbacks</h2>
      <table>
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Feedback</th>
            <th>Student ID</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((item) => (
            <tr key={item.feedback_id}>
              <td>{item.feedback_id}</td>
              <td>{item.feedback_text}</td>
              <td>{item.student_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
