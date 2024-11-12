// App.js
import React from 'react';
import './App.css';
import TimeDate from './components/TimeDate';
import Weather from './components/Weather';
import NewsFeed from './components/NewsFeed';
import CalendarEvents from './components/CalendarEvents';
import FullScreenToggle from './components/FullScreenToggle';

function App() {
  return (
    <div className="App">
      <h1>Welcome to SmartMirror</h1>
      <p>Your smart mirror app for time, weather, news, and more!</p>
      
      <TimeDate />
      <Weather />
      <NewsFeed />
      <CalendarEvents />
      
      {/* Full-Screen Button in the bottom-left */}
      <FullScreenToggle />
    </div>
  );
}

export default App;