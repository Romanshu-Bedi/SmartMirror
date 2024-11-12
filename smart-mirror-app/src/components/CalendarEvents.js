import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import '../styles/CalendarEvents.css';

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const CALENDAR_ID = "primary";
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          listUpcomingEvents();
        });
      }).catch((err) => {
        console.error("Error initializing Google Calendar API:", err);
        setError("Error initializing Google Calendar API.");
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const listUpcomingEvents = () => {
    gapi.client.calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 5,
      orderBy: "startTime",
    })
    .then(response => {
      const events = response.result.items;
      setEvents(events);
      if (events.length === 0) {
        setError("No upcoming events found.");
      }
    })
    .catch((err) => {
      console.error("Error fetching events:", err);
      setError("Error fetching events.");
    });
  };

  return (
    <div className="calendar-events">
      <h2>Your Events</h2>
      {error || events.length === 0 ? (
        <p className="no-events">No upcoming events found.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.summary}</strong> - {new Date(event.start.dateTime || event.start.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarEvents;