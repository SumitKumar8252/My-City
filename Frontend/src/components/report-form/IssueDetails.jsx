
import React from "react";
import { motion } from "framer-motion";

const issueTypes = [
  "Pothole",
  "Garbage",
  "Streetlight Failure",
  "Water Leakage",
  "Road Damage",
  "Other",
];

const IssueDetails = ({ data, handleChange }) => {
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
      className="w-full mx-auto p-6 bg-white shadow-md rounded-lg"
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
        Issue Details
      </motion.h2>
      <div className="space-y-4">
        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Type
          </label>
          <select
            name="issueType"
            value={data.issueType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select Issue Type</option>
            {issueTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Title
          </label>
          <input
            type="text"
            name="issueTitle"
            placeholder="Issue Title"
            value={data.issueTitle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description of the Issue
          </label>
          <textarea
            name="issueDescription"
            placeholder="Description of the Issue"
            value={data.issueDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
            rows={4}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IssueDetails;