import React, { useState, useEffect } from 'react';

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
    <div className="time-date">
      <h2>
        {currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })}
      </h2>
      <p>{currentTime.toLocaleDateString()}</p>
    </div>
  );
};

export default TimeDate;
