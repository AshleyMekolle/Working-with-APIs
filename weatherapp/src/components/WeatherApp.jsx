import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaThermometerHalf, 
  FaTint, 
  FaWind, 
  FaSun, 
  FaMoon,
  FaCloudSun,
  FaCloudMoon,
  FaCloud,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaPooStorm,
  FaSnowflake,
  FaSmog
} from 'react-icons/fa';
import '../styles/WeatherApp.css';

const api = {
  key: "593f2f4607d1a3b9a66c6fa865d8be27",
  base: "https://api.openweathermap.org/data/2.5/",
};

const iconMap = {
  '01d': FaSun,
  '01n': FaMoon,
  '02d': FaCloudSun,
  '02n': FaCloudMoon,
  '03d': FaCloud,
  '03n': FaCloud,
  '04d': FaCloud,
  '04n': FaCloud,
  '09d': FaCloudRain,
  '09n': FaCloudRain,
  '10d': FaCloudShowersHeavy,
  '10n': FaCloudShowersHeavy,
  '11d': FaPooStorm,
  '11n': FaPooStorm,
  '13d': FaSnowflake,
  '13n': FaSnowflake,
  '50d': FaSmog,
  '50n': FaSmog,
};

function WeatherApp() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
      });
  };

  const WeatherIcon = weather.weather ? iconMap[weather.weather[0].icon] : FaCloudSun;

  return (
    <motion.div 
      className="weather-app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="search-container"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Enter your town or city"
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          aria-label="Search for a city"
        />
        <motion.button 
          className="search-button"
          onClick={searchPressed}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Search"
        >
          <FaSearch />
        </motion.button>
      </motion.div>

      {typeof weather.main !== "undefined" && (
        <motion.div 
          className="weather-info"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="weather-icon"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <WeatherIcon size={100} />
          </motion.div>

          <motion.p 
            className="temp"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {Math.round(weather.main.temp)}°C <FaThermometerHalf />
          </motion.p>

          <motion.p 
            className="location"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {weather.name}, {weather.sys.country}
          </motion.p>

          <motion.div 
            className="weather-details"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p><FaTint /> Humidity: {weather.main.humidity}%</p>
            <p><FaWind /> Wind: {Math.round(weather.wind.speed * 3.6)} km/h</p>
            <p><FaCloudSun /> Condition: {weather.weather[0].main}</p>
            <p><FaSun /> Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><FaMoon /> Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default WeatherApp;