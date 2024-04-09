import axios from "axios";

const API_BASE_URL = "http://localhost:4000"; // Update with your API base URL

const getRemainingBalanceForStudents = async (studentId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/student-details/${studentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching remaining balance for student:", error);
    throw error;
  }
};

const saveFeedbackToDatabase = async (feedbackText, studentId) => {
  try {
    await axios.post(`${API_BASE_URL}/feedback`, { feedbackText, studentId });
  } catch (error) {
    console.error("Error saving feedback to database:", error);
    throw error;
  }
};

const availMeal = async (studentId) => {
  try {
    // Make a POST request to your server to avail the meal
    const response = await axios.post(`${API_BASE_URL}/avail-meal`, {
      studentId: studentId,
    });

    // Return the updated balance from the response
    return response.data.remainingBalance;
  } catch (error) {
    console.error("Error availing meal:", error);
    throw error;
  }
};

export { getRemainingBalanceForStudents, saveFeedbackToDatabase, availMeal };
