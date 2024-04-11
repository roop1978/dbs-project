import express from "express";
import multer from "multer";
import cors from "cors";
import * as database from "./database/database.js";
import {
  authenticateStudent,
  authenticateAdmin,
  fetchStudentDetails,
  getAdminDetails,
  getRemainingBalanceForStudents,
  getMenuForCurrentWeek,
  createMenuForNewWeek,
  deductBalance,
  weeklyBalanceDeduction,
  processTransaction,
  getAnnouncements,
  postAnnouncement,
  saveFeedbackToDatabase,
  uploadMenuImage,
  getLatestMenuImage,
  getCommunityEvents,
  postCommunityEvent,
} from "./database/database.js";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });

app.post("/login/student", async (req, res) => {
  const { studentId, password } = req.body;
  if (!studentId || !password) {
    return res
      .status(400)
      .json({ message: "Student ID and password are required" });
  }

  try {
    const isAuthenticated = await database.authenticateStudent(
      studentId,
      password
    );
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

app.post("/login/admin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const isAuthenticated = await database.authenticateAdmin(
      username,
      password
    );
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
    const studentDetails = await database.fetchStudentDetails(studentId);
    res.status(200).json(studentDetails);
  } catch (error) {
    console.error("Error retrieving student details:", error);
    res.status(500).json({ message: "Error retrieving student details" });
  }
});

app.get("/remaining_balance", async (req, res) => {
  try {
    const remainingBalanceData =
      await database.getRemainingBalanceForStudents();
    res.json(remainingBalanceData);
  } catch (error) {
    console.error("Error retrieving remaining balance:", error);
    res.status(500).json({ message: "Error retrieving remaining balance" });
  }
});

app.post("/menu/create", async (req, res) => {
  const { username, password, mealType, price, itemNames } = req.body;

  try {
    const isAdminAuthenticated = await database.authenticateAdmin(
      username,
      password
    );
    if (!isAdminAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const menuId = await database.createMenuForNewWeek(
      mealType,
      price,
      itemNames
    );
    res.status(200).json({ message: "Menu created successfully", menuId });
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const menuData = await database.getMenuForCurrentWeek();
    res.json(menuData);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Error fetching menu" });
  }
});

app.post("/announcements", async (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: "Title and message are required" });
  }

  try {
    await database.postAnnouncement(title, message);
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error posting announcement:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while posting the announcement" });
  }
});

app.get("/weekly-balance-deduction", async (req, res) => {
  try {
    const startDate = "2024-04-01";
    const endDate = "2024-04-07";
    const totalDeduction = await database.weeklyBalanceDeduction(
      startDate,
      endDate
    );
    res.status(200).json({ success: true, totalDeduction });
  } catch (error) {
    console.error("Error retrieving weekly balance deduction:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/transaction", async (req, res) => {
  try {
    const { studentId, transactionAmount } = req.body;
    const newBalance = await database.processTransaction(
      studentId,
      transactionAmount
    );
    res.status(200).json({ success: true, newBalance });
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const { feedbackText, studentId } = req.body;
    if (!feedbackText || !studentId) {
      return res
        .status(400)
        .json({ message: "Feedback text and student ID are required" });
    }
    await saveFeedbackToDatabase(feedbackText, studentId);
    return res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to get admin details by username
app.get("/admin-details/:username", async (req, res) => {
  try {
    const adminName = req.params.username;
    const adminDetails = await getAdminDetails(adminName);
    res.status(200).json(adminDetails);
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to upload menu image
app.post("/menu/upload", (req, res) => {
  const { id, menuImage } = req.body;
  uploadMenuImage(id, menuImage, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading menu image" });
    }
    res.json({ message: "Menu image uploaded successfully", result });
  });
});

// Endpoint to get latest menu image
app.get("/menu/latest", async (req, res) => {
  try {
    const imagePath = await getLatestMenuImage();
    res.status(200).json({ imagePath });
  } catch (error) {
    console.error("Error retrieving latest menu image:", error);
    res.status(500).send("Internal server error");
  }
});

// Endpoint to get community events
app.get("/community", async (req, res) => {
  try {
    const events = await getCommunityEvents();
    res.json(events);
  } catch (error) {
    console.error("Error fetching community events:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching community events" });
  }
});

// Endpoint to post a new community event
app.post("/community", async (req, res) => {
  try {
    const { event_id, title } = req.body;
    if (!event_id || !title) {
      return res.status(400).json({ error: "Event ID and title are required" });
    }
    await postCommunityEvent(event_id, title);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error posting community event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while posting the community event" });
  }
});
// Endpoint to get announcements
app.get("/announcements", async (req, res) => {
  try {
    const announcements = await getAnnouncements();
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching announcements" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
