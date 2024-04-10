import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "messmanagement",
  })
  .promise();
async function authenticateStudent(studentId, password) {
  try {
    const [result] = await pool.query(
      "SELECT * FROM student_profile WHERE student_id = ? AND password = ?",
      [studentId, password]
    );
    return result.length > 0; // Return true if authentication succeeds, false otherwise
  } catch (error) {
    console.error("Error authenticating student:", error);
    return false;
  }
}

async function authenticateAdmin(username, password) {
  try {
    const [result] = await pool.query(
      "SELECT * FROM admin_profile WHERE name = ? AND password = ?",
      [username, password]
    );
    return result.length > 0; // Return true if authentication succeeds, false otherwise
  } catch (error) {
    console.error("Error authenticating admin:", error);
    return false;
  }
}

async function fetchStudentDetails(studentId) {
  try {
    const [rows] = await pool.query(
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
    // Query to fetch admin details from the admin_profile table based on admin ID
    const [adminDetails] = await pool.query(
      "SELECT name,admin_id  FROM admin_profile WHERE name = ?",
      [adminName]
    );
    return adminDetails;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    throw error;
  }
}

async function getRemainingBalanceForStudents() {
  try {
    const [rows] = await pool.query(`
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
    const [result] = await pool.query(
      "INSERT INTO menu (meal_type, price, item_name_1, item_name_2, item_name_3) VALUES (?, ?, ?, ?, ?)",
      [mealType, price, itemNames[0], itemNames[1], itemNames[2]]
    );
    return result.insertId; // Return the ID of the newly inserted menu
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
}

async function getMenuForCurrentWeek() {
  try {
    // Your logic to fetch menu data for the current week goes here
    // You can use appropriate SQL queries to retrieve the menu items based on the current week
    const [rows] = await pool.query(`
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
    // Fetch user's current balance from the database
    const [userData] = await pool.query(
      "SELECT balance FROM user WHERE id = ?",
      [userId]
    );
    const currentBalance = userData[0].balance;

    // Deduct the specified amount from the user's balance
    const newBalance = currentBalance - amount;

    if (newBalance < 0) {
      throw new Error("Insufficient balance");
    }

    // Update the user's balance in the database
    await pool.query("UPDATE user SET balance = ? WHERE id = ?", [
      newBalance,
      userId,
    ]);

    return true; // Return true if balance deduction is successful
  } catch (error) {
    console.error("Error deducting balance:", error);
    throw error; // Propagate the error to the caller
  }
}
async function postAnnouncement(announcementText) {
  try {
    // Insert the announcement into the community_events table
    const query = `
      INSERT INTO community_events (date, event_name)
      VALUES (CURDATE(), ?)
    `;
    await pool.query(query, [announcementText]);
  } catch (error) {
    throw error;
  }
}
async function getAnnouncements() {
  try {
    // Retrieve announcements from the community_events table
    const query = `
      SELECT * FROM community_events
      ORDER BY date DESC
    `;
    const [announcements] = await pool.query(query);
    return announcements;
  } catch (error) {
    throw error;
  }
}
async function weeklyBalanceDeduction(startDate, endDate) {
  try {
    const [result] = await pool.query(
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
    // Fetch the student's current balance from the database
    const [studentData] = await pool.query(
      "SELECT remaining_balance FROM student_profile WHERE student_id = ?",
      [studentId]
    );
    const currentBalance = studentData[0].remaining_balance;

    // Check if the student has sufficient balance for the transaction
    if (currentBalance < transactionAmount) {
      throw new Error("Insufficient balance");
    }

    // Deduct the transaction amount from the student's balance
    const newBalance = currentBalance - transactionAmount;

    // Update the student's balance in the database
    await pool.query(
      "UPDATE student_profile SET remaining_balance = ? WHERE student_id = ?",
      [newBalance, studentId]
    );

    // Return the updated balance
    return newBalance;
  } catch (error) {
    console.error("Error processing transaction:", error);
    throw error; // Propagate the error to the caller
  }
}

async function saveFeedbackToDatabase(feedbackText, studentId) {
  try {
    await pool.query(
      "INSERT INTO feedback (feedback_text, student_id) VALUES (?, ?)",
      [feedbackText, studentId]
    );
    // You can add additional logic here if needed
  } catch (error) {
    console.error("Error saving feedback to database:", error);
    throw error;
  }
}

export {
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
  getAdminDetails,
};
