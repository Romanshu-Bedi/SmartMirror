// App.js
import React from 'react';
import './App.css';
import TimeDate from './components/TimeDate';
import Weather from './components/Weather';
import NewsFeed from './components/NewsFeed';
import CalendarEvents from './components/CalendarEvents';
import FullScreenToggle from './components/FullScreenToggle';
import TodoList from './components/TodoList';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="App">
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