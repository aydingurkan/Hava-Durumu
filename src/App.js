import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState('');

  const fetchWeather = async () => {
    try {
      const apiKey = '32cc9def9575fa5a7a0720013d3c76f4'; // OpenWeatherMap API Key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);

      // Set background class based on weather condition
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      if (weatherCondition.includes('clear')) {
        setBackgroundClass('clear-sky');
      } else if (weatherCondition.includes('cloud')) {
        setBackgroundClass('cloudy');
      } else if (weatherCondition.includes('rain')) {
        setBackgroundClass('rainy');
      } else if (weatherCondition.includes('snow')) {
        setBackgroundClass('snowy');
      } else {
        setBackgroundClass('default');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setBackgroundClass('default');
    }
  };

  return (
    <div className={`background-container ${backgroundClass}`}>
      <div className="content">
        <h1>Hava Durumu Uygulaması</h1>
        <div className="search-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Şehir ismi girin"
          />
          <button onClick={fetchWeather}>Hava Durumunu Getir</button>
        </div>

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <h3>{weatherData.weather[0].description}</h3>
            <p>Hava Sıcaklığı: {weatherData.main.temp}°C</p>
            <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>

      <footer>
        <a href="#" onClick={() => alert('Hazırlayan: Aydın GÜRKAN')}>Hakkımda</a>
      </footer>
    </div>
  );
}

export default App;
