// App.js
import React from 'react';
import './App.css';
import TimeDate from './components/TimeDate';
import Weather from './components/Weather';
import NewsFeed from './components/NewsFeed';
import CalendarEvents from './components/CalendarEvents';
import FullScreenToggle from './components/FullScreenToggle';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      {/* To-Do List Button and List Display */}
      <TodoList /> {/* Display To-Do List at the top center */}
      
      <TimeDate />
      <Weather />
      <NewsFeed />
      <CalendarEvents />
      
      {/* Full-Screen Button in the bottom-right */}
      <FullScreenToggle />
    </div>
  );
}

export default App;