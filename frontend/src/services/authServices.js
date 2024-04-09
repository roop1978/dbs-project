// authServices.js

import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const authService = {
  async studentLogin(username, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/student`, {
        studentId: username,
        password,
      });
      if (response.status === 200) {
        // Return both authentication status and student ID
        return { authenticated: true, studentId: response.data.studentId };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    }
  },

  async adminLogin(username, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/admin`, {
        username,
        password,
      });
      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
