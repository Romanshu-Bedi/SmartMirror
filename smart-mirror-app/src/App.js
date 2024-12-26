import React from "react";
import "./App.css";
import TimeDate from "./components/TimeDate";
import Weather from "./components/Weather";
import NewsFeed from "./components/NewsFeed";
import CalendarEvents from "./components/CalendarEvents";
import FullScreenToggle from "./components/FullScreenToggle";
import TodoList from "./components/TodoList";
import Greeting from "./components/Greeting";
import StarsCanvas from "./components/StarsCanvas";

function App() {
  return (
    <div className="App">
      <StarsCanvas /> {/* Full-screen stars background */}
      <Greeting /> {/* Display personalized greeting */}
      <TodoList />
      <TimeDate />
      <Weather />
      <NewsFeed />
      <CalendarEvents />
      <FullScreenToggle />
    </div>
  );
}

export default App;