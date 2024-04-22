import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "messmanagement",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function authenticateStudent(studentId, password) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM student_profile WHERE student_id = ? AND password = ?",
      [studentId, password]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("Error authenticating student:", error);
    return false;
  }
}

async function authenticateAdmin(username, password) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM admin_profile WHERE name = ? AND password = ?",
      [username, password]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("Error authenticating admin:", error);
    return false;
  }
}

async function fetchStudentDetails(studentId) {
  try {
    const [rows] = await pool.execute(
      "SELECT name, student_id, cgpa, remaining_balance FROM student_profile WHERE student_id = ?",
      [studentId]
    );
    if (rows.length === 0) {
      throw new Error("Student not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching student details from the database:", error);
    throw error;
  }
}

async function getAdminDetails(adminName) {
  try {
    const [rows] = await pool.execute(
      "SELECT name, admin_id FROM admin_profile WHERE name = ?",
      [adminName]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching admin details:", error);
    throw error;
  }
}

async function getRemainingBalanceForStudents() {
  try {
    const [rows] = await pool.execute(`
      SELECT sp.student_id, sp.name AS student_name,
             SUM(t.amt_deducted) AS total_deducted,
             sp.cgpa AS initial_balance,
             (sp.cgpa - IFNULL(SUM(t.amt_deducted), 0)) AS remaining_balance
      FROM student_profile sp
      LEFT JOIN transactions t ON sp.student_id = t.student_id
      GROUP BY sp.student_id;
    `);
    return rows;
  } catch (error) {
    console.error("Error retrieving remaining balance:", error);
    throw error;
  }
}

async function createMenuForNewWeek(mealType, price, itemNames) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO menu (meal_type, price, item_name_1, item_name_2, item_name_3) VALUES (?, ?, ?, ?, ?)",
      [mealType, price, itemNames[0], itemNames[1], itemNames[2]]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
}

async function getMenuForCurrentWeek() {
  try {
    const [rows] = await pool.execute(`
      SELECT * FROM menu
      WHERE WEEK(menu_date) = WEEK(CURRENT_DATE())
      ORDER BY menu_id DESC
      LIMIT 1
    `);
    return rows;
  } catch (error) {
    console.error("Error fetching menu for current week:", error);
    throw error;
  }
}

async function deductBalance(userId, amount) {
  try {
    const [userData] = await pool.execute(
      "SELECT balance FROM user WHERE id = ?",
      [userId]
    );
    const currentBalance = userData[0].balance;

    const newBalance = currentBalance - amount;

    if (newBalance < 0) {
      throw new Error("Insufficient balance");
    }

    await pool.execute("UPDATE user SET balance = ? WHERE id = ?", [
      newBalance,
      userId,
    ]);

    return true;
  } catch (error) {
    console.error("Error deducting balance:", error);
    throw error;
  }
}

async function weeklyBalanceDeduction(startDate, endDate) {
  try {
    const [result] = await pool.execute(
      "CALL CalculateWeeklyBalanceDeduction(?, ?)",
      [startDate, endDate]
    );
    return result;
  } catch (error) {
    console.error("Error executing complex query:", error);
    throw error;
  }
}

async function processTransaction(studentId, transactionAmount) {
  try {
    const [studentData] = await pool.execute(
      "SELECT remaining_balance FROM student_profile WHERE student_id = ?",
      [studentId]
    );
    const currentBalance = studentData[0].remaining_balance;

    if (currentBalance < transactionAmount) {
      throw new Error("Insufficient balance");
    }

    const newBalance = currentBalance - transactionAmount;

    await pool.execute(
      "UPDATE student_profile SET remaining_balance = ? WHERE student_id = ?",
      [newBalance, studentId]
    );

    return newBalance;
  } catch (error) {
    console.error("Error processing transaction:", error);
    throw error;
  }
}

async function getAnnouncements() {
  try {
    const [rows] = await pool.execute("SELECT * FROM announcements");
    return rows;
  } catch (error) {
    console.error("Error getting announcements:", error);
    throw error;
  }
}

async function postAnnouncement(title, message) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO announcements (title, message) VALUES (?, ?)",
      [title, message]
    );
    console.log("Announcement posted successfully");
    return result;
  } catch (error) {
    console.error("Error inserting announcement:", error);
    throw error;
  }
}

async function saveFeedbackToDatabase(feedbackId,feedbackText,studentId) {
  try {
    // Log parameters for debugging
    console.log("Saving feedback to database with parameters:");
    console.log("Feedback Text:", feedbackText);
    console.log("Student ID:", studentId);
    console.log("Feedback ID:", feedbackId);

    // Execute SQL query to insert feedback
    await pool.execute(
      "INSERT INTO feedback (feedback_id, feedback_text, student_id) VALUES (?, ?, ?)",
      [feedbackId, feedbackText, studentId]
    );
  } catch (error) {
    // Log error if any
    console.error("Error saving feedback to database:", error);
    throw error; // Throw error for further handling
  }
}
// Function to retrieve feedback from the database
async function getFeedback() {
  try {
    // Execute SQL query to fetch feedback from the database
    const [rows] = await pool.query("SELECT * FROM feedback");

    // Return the fetched feedback
    return rows;
  } catch (error) {
    console.error("Error fetching feedback from the database:", error);
    throw error;
  }
}

async function uploadMenuImage(menuImage) {
  try {
    // Use menuImage.path or menuImage.buffer depending on how multer saves the file
    const [result] = await pool.execute(
      "INSERT INTO weekly_menu (menu_image) VALUES (?)",
      [menuImage.path] // Adjust this based on how multer saves the file
    );
    console.log("Menu image uploaded successfully");
    return result;
  } catch (error) {
    console.error("Error uploading menu image:", error);
    throw error;
  }
}

async function getLatestMenuImage() {
  try {
    const [rows] = await pool.execute(
      "SELECT menu_image FROM weekly_menu ORDER BY date DESC LIMIT 1"
    );
    if (rows.length > 0) {
      return rows[0].menu_image;
    } else {
      throw new Error("No menu image found");
    }
  } catch (error) {
    console.error("Error retrieving latest menu image:", error);
    throw error;
  }
}

async function getCommunityEvents() {
  try {
    const [rows] = await pool.execute("SELECT * FROM community_events");
    return rows;
  } catch (error) {
    console.error("Error fetching community events:", error);
    throw error;
  }
}

async function postCommunityEvent(title) {
  try {
    await pool.execute("INSERT INTO community_events (title) VALUES (?)", [
      title,
    ]);
    console.log("Community event posted successfully");
  } catch (error) {
    console.error("Error posting community event:", error);
    throw error;
  }
}

export {
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
  getFeedback,
};
