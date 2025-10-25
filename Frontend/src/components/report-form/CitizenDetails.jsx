// CitizenDetails.jsx
import React, { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineEnvironment,
  AiOutlineNumber,
} from "react-icons/ai";
import { motion } from "framer-motion";

const CitizenDetails = ({ data, handleChange }) => {
  const [locationLoading, setLocationLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    handleChange(e);
  };

  // Animation variants for input fields
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Fetch live location and address
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Update state and propagate to parent via handleChange
          handleChange({ target: { name: "lat", value: latitude } });
          handleChange({ target: { name: "lon", value: longitude } });

          try {
            // Reverse geocoding using OpenStreetMap Nominatim
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const dataGeo = await response.json();

            const city = dataGeo.address.city || dataGeo.address.town || dataGeo.address.village || "";
            const street = dataGeo.address.road || dataGeo.address.neighbourhood || "";
            const state = dataGeo.address.state || dataGeo.address.state_district || ""; // Extract state
            const pin = dataGeo.address.postcode || ""; // Extract PIN code

            handleChange({ target: { name: "city", value: city } });
            handleChange({ target: { name: "street", value: street } });
            handleChange({ target: { name: "state", value: state } }); // Auto-fill State
            handleChange({ target: { name: "pin", value: pin } }); // Auto-fill PIN code
          } catch (error) {
            console.error("Error fetching address:", error);
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationLoading(false);
    }
  }, []);

  return (
    <motion.div
      className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-4 sm:p-5 md:p-6 bg-white shadow-md rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-5 md:mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Citizen Details
      </motion.h2>
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {/* Name Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
            <AiOutlineUser className="text-base sm:text-lg md:text-xl text-gray-500" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={data.name}
            onChange={handleInputChange}
            className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
            required
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
            <AiOutlineMail className="text-base sm:text-lg md:text-xl text-gray-500" />
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleInputChange}
            className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
            required
          />
        </motion.div>

        {/* Phone Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
            <AiOutlinePhone className="text-base sm:text-lg md:text-xl text-gray-500" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={data.phone}
            onChange={handleInputChange}
            className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
            pattern="[0-9]{10}"
            title="Phone number should be 10 digits"
          />
        </motion.div>

        {/* Street Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
            <AiOutlineHome className="text-base sm:text-lg md:text-xl text-gray-500" />
            Street
          </label>
          <input
            type="text"
            name="street"
            placeholder="Enter your street address"
            value={data.street}
            onChange={handleInputChange}
            className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
          />
        </motion.div>

        {/* Landmark Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
            <AiOutlineEnvironment className="text-base sm:text-lg md:text-xl text-gray-500" />
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            placeholder="Enter nearby landmark"
            value={data.landmark}
            onChange={handleInputChange}
            className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
          />
        </motion.div>

        {/* City and State Row */}
        <motion.div variants={inputVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          <div>
            <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
              <AiOutlineEnvironment className="text-base sm:text-lg md:text-xl text-gray-500" />
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Auto-filled City"
              value={data.city || ""}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
              <AiOutlineEnvironment className="text-base sm:text-lg md:text-xl text-gray-500" />
              State
            </label>
            <input
              type="text"
              name="state"
              placeholder="Auto-filled State"
              value={data.state || ""}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
            />
          </div>
        </motion.div>

        {/* PIN Code Row */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
            <AiOutlineNumber className="text-base sm:text-lg md:text-xl text-gray-500" />
            PIN Code
          </label>
          <input
            type="text"
            name="pin"
            placeholder="Auto-filled PIN code"
            value={data.pin || ""}
            onChange={handleInputChange}
            className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
            pattern="[0-9]{6}"
            title="PIN code should be 6 digits"
          />
        </motion.div>

        {/* Latitude and Longitude Fields */}
        <motion.div variants={inputVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          <div>
            <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
              <AiOutlineEnvironment className="text-base sm:text-lg md:text-xl text-gray-500" />
              Latitude
            </label>
            <input
              type="text"
              name="lat"
              placeholder="Auto-filled Latitude"
              value={data.lat || ""}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
              readOnly
            />
          </div>
          <div>
            <label className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2 md:mb-2 gap-2">
              <AiOutlineEnvironment className="text-base sm:text-lg md:text-xl text-gray-500" />
              Longitude
            </label>
            <input
              type="text"
              name="lon"
              placeholder="Auto-filled Longitude"
              value={data.lon || ""}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
              readOnly
            />
          </div>
        </motion.div>

        {/* Loading State */}
        {locationLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-gray-500"
          >
            Fetching location...
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CitizenDetails;