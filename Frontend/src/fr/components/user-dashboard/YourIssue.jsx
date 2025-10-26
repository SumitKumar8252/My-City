import React from "react";
import { motion } from "framer-motion";

// Sample static data (replace with dynamic data later)
const issues = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    street: "123 Main St",
    landmark: "Near City Park",
    city: "New York",
    state: "NY",
    pin: "10001",
    issueType: "Pothole",
    issueTitle: "Pothole on Main St",
    issueDescription: "Large pothole causing traffic issues near the park entrance.",
    images: [
      "https://images.unsplash.com/photo-1593604340847-a4b6baca1c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1611832198286-cb8f5c8b5e51?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    ],
    lat: "40.7128",
    lon: "-74.0060",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-987-6543",
    street: "456 Park Ave",
    landmark: "Opposite Central Library",
    city: "Los Angeles",
    state: "CA",
    pin: "90001",
    issueType: "Streetlight",
    issueTitle: "Streetlight Outage",
    issueDescription: "Streetlight not working, causing safety concerns at night.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    ],
    lat: "34.0522",
    lon: "-118.2437",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1-555-456-7890",
    street: "789 Elm St",
    landmark: "Near School",
    city: "Chicago",
    state: "IL",
    pin: "60601",
    issueType: "Garbage",
    issueTitle: "Garbage Overflow",
    issueDescription: "Overflowing garbage bin at the corner, attracting pests.",
    images: [],
    lat: "41.8781",
    lon: "-87.6298",
  },
];

const YourIssue = () => {
  // For dynamic data, replace static `issues` with state and API call
  // Example:
  /*
  const [issues, setIssues] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/issues')
      .then(response => response.json())
      .then(data => setIssues(data))
      .catch(error => console.error('Error fetching issues:', error));
  }, []);
  */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-gray-700 mb-10 tracking-tight"
        >
          Your Issues
        </motion.h1>

        {/* Issues Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {issues.map((issue) => (
            <motion.div
              key={issue.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white shadow-md rounded-2xl p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Issue Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">{issue.issueTitle}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    issue.issueType === "Pothole"
                      ? "bg-yellow-100 text-yellow-700"
                      : issue.issueType === "Streetlight"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {issue.issueType}
                </span>
              </div>

              {/* Personal Information */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Reported By
                </h4>
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span> {issue.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {issue.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {issue.phone}
                </p>
              </div>

              {/* Address Information */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Location
                </h4>
                <p className="text-gray-700">
                  <span className="font-medium">Address:</span> {issue.street}, {issue.landmark},{" "}
                  {issue.city}, {issue.state} {issue.pin}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Coordinates:</span> Lat: {issue.lat}, Lon: {issue.lon}
                </p>
              </div>

              {/* Issue Details */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Issue Details
                </h4>
                <p className="text-gray-700">
                  <span className="font-medium">Title:</span> {issue.issueTitle}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Description:</span> {issue.issueDescription}
                </p>
              </div>

              {/* Images */}
              {issue.images.length > 0 ? (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Images
                  </h4>
                  <div className="flex overflow-x-auto space-x-4 pb-2">
                    {issue.images.map((image, index) => (
                      <motion.img
                        key={index}
                        src={image}
                        alt={`Issue ${issue.issueTitle} - Image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No images provided</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default YourIssue;