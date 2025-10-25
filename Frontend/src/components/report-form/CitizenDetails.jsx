import React from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineEnvironment,
  AiOutlineGlobal,
  AiOutlineNumber,
} from "react-icons/ai";
import { motion } from "framer-motion";

const CitizenDetails = ({ data, handleChange }) => {
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

  return (
    <motion.div
      className="w-full  mx-auto p-6 bg-white shadow-md rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl font-semibold text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Citizen Details
      </motion.h2>
      <div className="space-y-4">
        {/* Name Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
            <AiOutlineUser className="text-lg text-gray-500" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={data.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
            <AiOutlineMail className="text-lg text-gray-500" />
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
        </motion.div>

        {/* Phone Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
            <AiOutlinePhone className="text-lg text-gray-500" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={data.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            pattern="[0-9]{10}"
            title="Phone number should be 10 digits"
          />
        </motion.div>

        {/* Street Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
            <AiOutlineHome className="text-lg text-gray-500" />
            Street
          </label>
          <input
            type="text"
            name="street"
            placeholder="Enter your street address"
            value={data.street}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </motion.div>

        {/* Landmark Field */}
        <motion.div variants={inputVariants}>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
            <AiOutlineEnvironment className="text-lg text-gray-500" />
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            placeholder="Enter nearby landmark"
            value={data.landmark}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </motion.div>

        {/* City and State Row */}
        <motion.div variants={inputVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
              <AiOutlineEnvironment className="text-lg text-gray-500" />
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={data.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
              <AiOutlineEnvironment className="text-lg text-gray-500" />
              State
            </label>
            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              value={data.state}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </motion.div>

        {/* Country and PIN Code Row */}
        <motion.div variants={inputVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
              <AiOutlineGlobal className="text-lg text-gray-500" />
              Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              value={data.country}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
              <AiOutlineNumber className="text-lg text-gray-500" />
              PIN Code
            </label>
            <input
              type="text"
              name="pin"
              placeholder="Enter your PIN code"
              value={data.pin}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              pattern="[0-9]{6}"
              title="PIN code should be 6 digits"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CitizenDetails;