// Frontend (React)

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = ({ adminDetails }) => {
  const [formDetails, setFormDetails] = useState({
    admin_id: "",
    name: "", // Changed from username to name to match the state update logic
  });

  const [announcementDetails, setAnnouncementDetails] = useState({
    title: "",
    message: "",
    announcement_id: "",
  });

  const [eventDetails, setEventDetails] = useState({
    title: "",
    event_id: "",
  });

  useEffect(() => {
    if (adminDetails) {
      setFormDetails((prevState) => ({
        ...prevState,
        name: adminDetails.name,
        admin_id: adminDetails.admin_id,
      }));
    }
  }, [adminDetails]);

  const handleAdminDetailsSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
  };

  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/announcements", {
        title: announcementDetails.title,
        message: announcementDetails.message,
        announcement_id: announcementDetails.announcement_id, // Include announcement ID in request
      });
      if (response.status === 201) {
        alert("Announcement posted successfully!");
      }
    } catch (error) {
      alert("Error posting announcement. Please try again later.");
      console.error("Error posting announcement:", error);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/community", {
        title: eventDetails.title,
        event_id: eventDetails.event_id, // Include event ID in request
      });
      if (response.status === 201) {
        alert("Community event posted successfully!");
      }
    } catch (error) {
      alert("Error posting community event. Please try again later.");
      console.error("Error posting community event:", error);
    }
  };
  const [day, setDay] = useState("");
  const [meal, setMeal] = useState("");
  const [menuItems, setMenuItems] = useState("");

  const handleSubmit = async (formData) => {
    try {
      // Make an API call to submit the menu data
      const response = await axios.post("http://localhost:4000/menu", formData);
      if (response.status === 201) {
        alert("Menu added successfully!");
        // Optionally, you can fetch the updated menu data here
      }
    } catch (error) {
      alert("Error adding menu. Please try again later.");
      console.error("Error adding menu:", error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <form className="admin-details-form" onSubmit={handleAdminDetailsSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label> <br></br>
          <input
            type="text"
            id="name"
            name="name"
            value={formDetails.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin_id">Admin ID:</label>
          <input
            type="text"
            id="admin_id"
            name="admin_id"
            value={formDetails.admin_id}
            readOnly
          />
        </div>
      </form>

      <form className="announcement-form" onSubmit={handleAnnouncementSubmit}>
        <div className="form-group">
          <label htmlFor="title">Announcement Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Announcement Title"
            value={announcementDetails.title}
            onChange={handleAnnouncementChange}
          />
          <textarea
            name="message"
            placeholder="Announcement Message"
            value={announcementDetails.message}
            onChange={handleAnnouncementChange}
          />
          <input
            type="text"
            id="announcement_id"
            name="announcement_id"
            placeholder="Announcement ID"
            value={announcementDetails.announcement_id}
            onChange={handleAnnouncementChange}
          />
        </div>
        <button className="btn-post-announcement" type="submit">
          Post Announcement
        </button>
      </form>
      <form className="event-form" onSubmit={handleEventSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Event Title"
            value={eventDetails.title}
            onChange={handleEventChange}
          />
          <input
            type="text"
            id="event_id"
            name="event_id"
            placeholder="Event ID"
            value={eventDetails.event_id}
            onChange={handleEventChange}
          />
        </div>
        <button className="btn-post-event" type="submit">
          Post Community Event
        </button>
      </form>
      <form className="menu-form" onSubmit={handleSubmit}>
        <label>
          Day:
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </label>
        <label>
          Meal:
          <input
            type="text"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            required
          />
        </label>
        <label>
          Menu Items:
          <input
            type="text"
            value={menuItems}
            onChange={(e) => setMenuItems(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Menu</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
