import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AnnouncementPage.css";

function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`http://localhost:4000/announcements`);
      if (!response.ok) {
        throw new Error("Failed to fetch announcement details");
      }
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcement details:", error);
      setError("Failed to fetch announcement details");
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to Campus Dining Hall</h1>
      </header>

      <main className="main">
        <div className="announcements">
          <h2>Announcements</h2>
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement">
              <h3>{announcement.title}</h3>
              <p>{announcement.message}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AnnouncementPage;
