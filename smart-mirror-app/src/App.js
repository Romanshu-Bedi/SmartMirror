import React from 'react';
import './App.css';
import TimeDate from './components/TimeDate';
import Weather from './components/Weather';
import NewsFeed from './components/NewsFeed';
import CalendarEvents from './components/CalendarEvents';

function App() {
  return (
    <div className="App">
      <h1>Welcome to SmartMirror</h1>
      <p>Your smart mirror app for time, weather, news, and more!</p>
      <TimeDate />
      <Weather />
      <NewsFeed />
      <CalendarEvents />
    </div>
  );
}

export default App;
