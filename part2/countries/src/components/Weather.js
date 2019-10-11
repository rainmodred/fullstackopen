import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then(response => {
        setWeather(response.data);
      });
  }, [city]);

  if (!weather) return <div>Error</div>;
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature: {weather.main.temp} Celsius</p>
      <p>wind: {weather.wind.speed} kph </p>
    </div>
  );
}
