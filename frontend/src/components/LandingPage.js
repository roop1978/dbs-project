import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Menu from "./Menu";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate("/student-login");
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  const [announcements, setAnnouncements] = useState([]);
  const [communityEvents, setCommunityEvents] = useState([]);

  useEffect(() => {
    // Fetch announcements
    axios
      .get("http://localhost:4000/announcements")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });

    // Fetch community events
    axios
      .get("http://localhost:4000/community")
      .then((response) => {
        setCommunityEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching community events:", error);
      });
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-buttons">
        <button className="login-button" onClick={handleStudentLogin}>
          Student Login
        </button>
        <button className="login-button" onClick={handleAdminLogin}>
          Admin Login
        </button>
      </div>
      <div className="tab-container">
        {/* Announcements Tab */}
        <div className="tab-wrapper">
          <h2 className="tab-title">Announcements</h2>
          <section className="announcements-section">
            <ul className="announcement-list">
              {announcements.map((announcement) => (
                <li key={announcement.id}>
                  <h3 className="announcement-title">{announcement.title}</h3>
                  <p className="announcement-message">{announcement.message}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Community Events Tab */}
        <div className="tab-wrapper">
          <h2 className="tab-title">Community Events</h2>
          <section className="community-events-section">
            <ul className="event-list">
              {communityEvents.map((event) => (
                <li key={event.id}>
                  <h3 className="event-title">{event.title}</h3>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
