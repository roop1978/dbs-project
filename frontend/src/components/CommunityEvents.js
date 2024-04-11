import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommunityEvents.css"; // Import CSS file

function CommunityEventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:4000/community`);
      if (!response.ok) {
        throw new Error("Failed to fetch community events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching community events:", error);
      setError("Failed to fetch community events");
    }
  };

  return (
    <div className="community-events-page">
      <header className="header">
        <h1>Community Events</h1>
      </header>

      <main className="main">
        <div className="events">
          {events.map((event, index) => (
            <div key={index} className="event">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CommunityEventsPage;
