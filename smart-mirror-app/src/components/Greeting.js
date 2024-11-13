import React, { useState, useEffect } from 'react';
import '../styles/Greeting.css';

const Greeting = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.elements.nameInput.value;
    setName(userName);
  };

  return (
    <div className="greeting-container">
      <h2 className="greeting-message">
        {greeting}{name ? `, ${name}` : ''}
      </h2>
      {!name && (
        <form onSubmit={handleNameSubmit} className="name-form">
          <input
            type="text"
            name="nameInput"
            className="name-input"
            placeholder="Enter your name"
            required
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Greeting;