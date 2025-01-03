import React, { useState, useEffect, useCallback } from "react";
import { gapi } from "gapi-script";
import "../styles/CalendarEvents.css";

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const CALENDAR_ID = "primary";
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const initializeGoogleClient = useCallback(() => {
    if (typeof gapi !== "undefined") {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: SCOPES,
          })
          .then(() => {
            gapi.auth2.getAuthInstance().signIn().then(() => {
              listUpcomingEvents();
              // Save to localStorage to remember access granted
              localStorage.setItem("calendarAccessGranted", "true");
            });
          })
          .catch((err) => {
            console.error("Error initializing Google Calendar API:", err);
            setError("Error initializing Google Calendar API.");
          });
      });
    } else {
      console.error("gapi not available");
      setError("Google API is not available.");
    }
  }, [API_KEY, CLIENT_ID, SCOPES]);

  const listUpcomingEvents = useCallback(() => {
    if (typeof gapi !== "undefined") {
      gapi.client.calendar.events
        .list({
          calendarId: CALENDAR_ID,
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 5,
          orderBy: "startTime",
        })
        .then((response) => {
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
    }
  }, [CALENDAR_ID]);

  useEffect(() => {
    const accessGranted = localStorage.getItem("calendarAccessGranted");
    if (accessGranted === "true") {
      initializeGoogleClient(); // Initialize directly if access was already granted
    } else {
      if (typeof window !== "undefined") {
        const userAcknowledged = window.confirm(
          "This app requires access to your Google Calendar. Do you wish to continue?"
        );
        if (userAcknowledged) {
          initializeGoogleClient();
        }
      }
    }
  }, [initializeGoogleClient]);

  return (
    <div className="calendar-events">
      <h2>Your Events</h2>
      {error || events.length === 0 ? (
        <p className="no-events">{error || "No upcoming events found."}</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.summary}</strong> -{" "}
              {new Date(event.start.dateTime || event.start.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarEvents;