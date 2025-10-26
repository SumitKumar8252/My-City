import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { motion } from "framer-motion";
import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaTachometerAlt,
} from "react-icons/fa";
import { BsEye } from "react-icons/bs";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const LiveLocationWeather = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ lat, lon });
          await fetchWeather(lat, lon);
          setError("");
          setLoading(false);
        },
        () => {
          setError("Location permission denied. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: { lat, lon, units: "metric", appid: WEATHER_API_KEY },
        }
      );
      setWeather(data);
      setLocationName(data.name || "Unknown Location");
    } catch {
      setError("Unable to fetch weather data.");
    }
  };

  useEffect(() => {
    if (isLoaded) getLocation();
  }, [isLoaded]);

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString();

  if (loading)
    return <p className="text-center mt-10">Fetching your location...</p>;

  if (error)
    return (
      <div className="flex flex-col items-center gap-4 mt-10">
        <p className="text-red-500">{error}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={getLocation}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div
      className="w-full min-h-[600px] flex flex-col md:flex-row items-stretch gap-6 p-6 shadow-lg rounded-xl"
      style={{
        background:
          "radial-gradient(circle at top, rgba(255, 200, 150, 0.15), transparent)",
      }}
    >
      {/* Google Map Section */}
      <motion.div
        className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {isLoaded && coords.lat && coords.lon ? (
          <GoogleMap
            center={{ lat: coords.lat, lng: coords.lon }}
            zoom={13}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            <Marker position={{ lat: coords.lat, lng: coords.lon }} />
          </GoogleMap>
        ) : (
          <p className="text-center mt-6">Loading Map...</p>
        )}
      </motion.div>

      {/* Weather Info Section */}
      <motion.div
        className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {weather && (
          <>
            {/* Location + Temperature */}
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                {locationName}, {weather.sys.country}
              </h2>
              <p className="mt-1 text-lg capitalize flex items-center justify-center gap-2">
                <FaTemperatureHigh className="text-yellow-500" />{" "}
                {weather.weather[0].description}
              </p>
              <p className="mt-2 text-4xl font-semibold flex items-center justify-center gap-2">
                <WiThermometer className="text-red-500" />
                {weather.main.temp}°C
              </p>
            </div>

            {/* Weather Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-6">
              <WeatherCard
                icon={<FaTemperatureLow />}
                label="Min Temp"
                value={`${weather.main.temp_min}°C`}
              />
              <WeatherCard
                icon={<FaTemperatureHigh />}
                label="Max Temp"
                value={`${weather.main.temp_max}°C`}
              />
              <WeatherCard
                icon={<WiHumidity />}
                label="Humidity"
                value={`${weather.main.humidity}%`}
              />
              <WeatherCard
                icon={<FaTachometerAlt />}
                label="Pressure"
                value={`${weather.main.pressure} hPa`}
              />
              <WeatherCard
                icon={<BsEye />}
                label="Visibility"
                value={`${weather.visibility / 1000} km`}
              />
              <WeatherCard
                icon={<WiStrongWind />}
                label="Wind"
                value={`${weather.wind.speed} m/s`}
              />
              <WeatherCard
                icon={<WiSunrise />}
                label="Sunrise"
                value={formatTime(weather.sys.sunrise)}
              />
              <WeatherCard
                icon={<WiSunset />}
                label="Sunset"
                value={formatTime(weather.sys.sunset)}
              />
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              {new Date(weather.dt * 1000).toLocaleString()}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

// Small Reusable Card Component
const WeatherCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
    <div className="text-2xl">{icon}</div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default LiveLocationWeather;