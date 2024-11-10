import React from 'react';
import './App.css';
import TimeDate from './components/TimeDate';
import Weather from './components/Weather';
import NewsFeed from './components/NewsFeed'; // Import the NewsFeed component

function App() {
  return (
    <div className="App">
      <h1>Welcome to SmartMirror</h1>
      <p>Your smart mirror app for time, weather, news, and more!</p>
      <TimeDate />
      <Weather />
      <NewsFeed /> {/* Add the NewsFeed component */}
    </div>
  );
}

export default App;
