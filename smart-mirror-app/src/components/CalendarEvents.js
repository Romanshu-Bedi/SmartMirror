import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const CALENDAR_ID = "primary"; // "primary" refers to the user's main calendar
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
        setError("Error initializing Google Calendar API: " + JSON.stringify(err, null, 2));
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
      console.log("Fetched Events:", events);  // Log to confirm events are fetched
      if (events.length === 0) {
        setError("No upcoming events found.");
      }
    })
    .catch((err) => {
      console.error("Error fetching events:", err);
      setError("Error fetching events: " + JSON.stringify(err, null, 2));
    });
  };

  if (error) return <div>{error}</div>;
  if (!events || events.length === 0) return <div>Loading events...</div>;

  return (
    <div className="calendar-events">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.summary}</strong> - {new Date(event.start.dateTime || event.start.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarEvents;
