import React, { useState, useEffect } from 'react';
import '../styles/Greeting.css';

const Greeting = () => {
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

  return (
    <div className="greeting-container">
      <h2 className="greeting-message">{greeting}</h2>
    </div>
  );
};

export default Greeting;