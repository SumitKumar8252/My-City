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

const WEATHER_API_KEY = "492e73ba9d916a50d5e45660256cb4c4";
const GOOGLE_MAPS_API_KEY = "AIzaSyBeZ6FwoqOu-yVYm-RAQF8QuZYqJBHq_mM";

const LiveLocationWeather = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });

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
      setLocationName(data.name || "Unknown location");
    } catch (err) {
      setError("Unable to fetch weather");
      console.error(err);
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
      className="w-full min-h-[600px] flex flex-col md:flex-row items-stretch justify-center gap-6 p-6 shadow-lg overflow-hidden rounded-xl"
      style={{
        background:
          "radial-gradient(circle at center top, rgba(255, 150, 120, 0.1) 10%, rgba(255, 150, 120, 0) 60%), rgba(255, 150, 120, 0.15) 40%",
      }}
    >
      {/* Google Map */}
      <motion.div
        className="w-full md:w-1/2 flex-1 rounded-lg overflow-hidden shadow-md"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {isLoaded ? (
          <GoogleMap
            center={{ lat: coords.lat, lng: coords.lon }}
            zoom={14}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            <Marker position={{ lat: coords.lat, lng: coords.lon }} />
          </GoogleMap>
        ) : (
          <p className="text-center mt-4">Loading map...</p>
        )}
      </motion.div>

      {/* Weather Info */}
      <motion.div
        className="w-full md:w-1/2 flex-1 p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between"
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {weather && (
          <>
            {/* Location & Main Temperature */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">
                {locationName}, {weather.sys.country}
              </h2>
              <p className="mt-2 text-lg capitalize flex items-center justify-center gap-2 text-gray-700">
                <FaTemperatureHigh className="text-yellow-500" />
                {weather.weather[0].description}
              </p>
              <p className="mt-2 text-3xl font-semibold flex items-center justify-center gap-2 text-gray-800">
                <WiThermometer className="text-red-500 text-4xl" />
                {weather.main.temp}°C
              </p>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
              <WeatherCard
                icon={<FaTemperatureLow className="text-blue-500 text-3xl" />}
                label="Min Temp"
                value={`${weather.main.temp_min}°C`}
              />
              <WeatherCard
                icon={<FaTemperatureHigh className="text-red-500 text-3xl" />}
                label="Max Temp"
                value={`${weather.main.temp_max}°C`}
              />
              <WeatherCard
                icon={<WiHumidity className="text-blue-500 text-3xl" />}
                label="Humidity"
                value={`${weather.main.humidity}%`}
              />
              <WeatherCard
                icon={<FaTachometerAlt className="text-purple-500 text-3xl" />}
                label="Pressure"
                value={`${weather.main.pressure} hPa`}
              />
              <WeatherCard
                icon={<BsEye className="text-gray-500 text-3xl" />}
                label="Visibility"
                value={`${weather.visibility / 1000} km`}
              />
              <WeatherCard
                icon={<WiStrongWind className="text-green-500 text-3xl" />}
                label="Wind"
                value={`${weather.wind.speed} m/s`}
              />
              <WeatherCard
                icon={<WiSunrise className="text-orange-500 text-3xl" />}
                label="Sunrise"
                value={formatTime(weather.sys.sunrise)}
              />
              <WeatherCard
                icon={<WiSunset className="text-red-500 text-3xl" />}
                label="Sunset"
                value={formatTime(weather.sys.sunset)}
              />
            </div>

            {/* Date & Time */}
            <p className="mt-6 text-center text-sm text-gray-500">
              {new Date(weather.dt * 1000).toLocaleString()}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

// Weather Card Component for cleaner professional look
const WeatherCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
    {icon}
    <p className="text-sm mt-1 text-gray-600">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default LiveLocationWeather;
