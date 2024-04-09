import express from "express";
import {
  authenticateStudent,
  authenticateAdmin,
  getRemainingBalanceForStudents,
  getMenuForCurrentWeek,
  createMenuForNewWeek,
  deductBalance,
  postAnnouncement,
  getAnnouncements,
  weeklyBalanceDeduction,
  processTransaction,
  saveFeedbackToDatabase,
  fetchStudentDetails,
} from "./database/database.js";

const app = express();
const port = 4000;
import cors from "cors";

app.use(cors());
app.use(express.json());

// Endpoint for student login
app.post("/login/student", async (req, res) => {
  const { studentId, password } = req.body;
  if (!studentId || !password) {
    return res
      .status(400)
      .json({ message: "Student ID and password are required" });
  }

  try {
    const isAuthenticated = await authenticateStudent(studentId, password);
    if (isAuthenticated) {
      return res
        .status(200)
        .json({ message: "Student authentication successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for admin login
app.post("/login/admin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const isAuthenticated = await authenticateAdmin(username, password);
    if (isAuthenticated) {
      return res
        .status(200)
        .json({ message: "Admin authentication successful" });
    } else {
      return res.status(401).json({ message: "Admin authentication failed" });
    }
  } catch (error) {
    console.error("Error authenticating admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/student-details/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const studentDetails = await fetchStudentDetails(studentId);
    res.status(200).json(studentDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Endpoint for getting remaining balance for students
app.get("/remaining_balance", async (req, res) => {
  try {
    const remainingBalanceData = await getRemainingBalanceForStudents();
    res.json(remainingBalanceData);
  } catch (error) {
    console.error("Error retrieving remaining balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for creating menu for new week (Admin only)
app.post("/menu/create", async (req, res) => {
  const { username, password, mealType, price, itemNames } = req.body;

  try {
    const isAdminAuthenticated = await authenticateAdmin(username, password);
    if (!isAdminAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const menuId = await createMenuForNewWeek(mealType, price, itemNames);
    res.status(200).json({ message: "Menu created successfully", menuId });
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for getting menu for current week
app.get("/menu", async (req, res) => {
  try {
    const menuData = await getMenuForCurrentWeek();
    res.json(menuData);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/scan-qr", async (req, res) => {
  const { userId, qrData } = req.body;

  try {
    const success = await deductBalance(userId, 200);
    if (success) {
      res.json({ success: true, message: "Amount deducted successfully" });
    } else {
      res.status(400).json({ success: false, message: "Insufficient balance" });
    }
  } catch (error) {
    console.error("Error scanning QR code:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/announcement", async (req, res) => {
  const { announcementText } = req.body;

  try {
    // Call the postAnnouncement function from database.js
    await postAnnouncement(announcementText);

    // Send success response
    res.status(200).json({ message: "Announcement posted successfully" });
  } catch (error) {
    console.error("Error posting announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for retrieving announcements (Student)
app.get("/announcement", async (req, res) => {
  try {
    // Call the getAnnouncements function from database.js
    const announcements = await getAnnouncements();

    // Send the retrieved announcements as response
    res.json(announcements);
  } catch (error) {
    console.error("Error retrieving announcements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/weekly-balance-deduction", async (req, res) => {
  try {
    // Provide the start and end dates for the weekly period
    const startDate = "2024-04-01";
    const endDate = "2024-04-07";

    // Call the function to execute the stored procedure
    const totalDeduction = await weeklyBalanceDeduction(startDate, endDate);

    // Send the total deduction in the response
    res.status(200).json({ success: true, totalDeduction });
  } catch (error) {
    console.error("Error retrieving weekly balance deduction:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/transaction", async (req, res) => {
  try {
    const { studentId, transactionAmount } = req.body;

    // Call the processTransaction function from database.js to handle the transaction
    const newBalance = await processTransaction(studentId, transactionAmount);

    // Send a success response with the updated balance
    res.status(200).json({ success: true, newBalance });
  } catch (error) {
    // If an error occurs, send an error response with the appropriate message
    console.error("Error processing transaction:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/feedback", async (req, res) => {
  const { feedbackText, studentId } = req.body;
  if (!feedbackText || !studentId) {
    return res
      .status(400)
      .json({ message: "Feedback text and student ID are required" });
  }

  try {
    // Save the feedback to the database
    await saveFeedbackToDatabase(feedbackText, studentId);

    // Send a success response
    return res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
