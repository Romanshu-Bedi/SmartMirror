import React, { useState, useEffect } from 'react';
import '../styles/TimeDate.css';

const TimeDate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="time-date-container">
      <div className="time">
        {currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false // Use 24-hour format
        })}
      </div>
      <div className="date">
        {currentTime.toLocaleDateString([], {
          month: '2-digit',
          day: '2-digit'
        })}
      </div>
    </div>
  );
};

export default TimeDate;