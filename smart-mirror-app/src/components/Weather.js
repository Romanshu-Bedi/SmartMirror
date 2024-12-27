import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
      }
    };

    const requestLocationAccess = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error('Error obtaining location:', error.message);
            setError('Location access denied. Enable location to see weather information.');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser');
      }
    };

    const askForLocationAccess = () => {
      const userAcknowledged = window.confirm(
        'This app needs your location to fetch weather updates. Do you want to grant location access?'
      );
      if (userAcknowledged) {
        requestLocationAccess();
      } else {
        setError('Location access denied. Enable location to see weather information.');
      }
    };

    askForLocationAccess();
  }, [apiKey]);

  if (error) return <div className="weather-container">{error}</div>;
  if (!weatherData) return <div className="weather-container">Loading weather...</div>;

  return (
    <div className="weather-container">
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="weather-icon"
      />
      <div className="weather-info">
        <div className="temperature">{weatherData.main.temp}°</div>
        <div className="feels-like">feels like {weatherData.main.feels_like}°</div>
      </div>
    </div>
  );
};

export default Weather;