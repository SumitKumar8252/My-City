import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

// Sample static data (replace with dynamic data later)
const initialIssues = [
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
    issueDescription:
      "Large pothole causing traffic issues near the park entrance.",
    images: [
      "https://images.unsplash.com/photo-1593604340847-a4b6baca1c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1611832198286-cb8f5c8b5e51?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    ],
    lat: "40.7128",
    lon: "-74.0060",
    date: "2025-10-24",
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
    date: "2025-10-23",
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
    date: "2025-10-22",
  },
];

const AllIssue = () => {
  // State
  const [issues, setIssues] = useState(initialIssues);
  const [searchCity, setSearchCity] = useState("");
  const [searchLat, setSearchLat] = useState("");
  const [searchLon, setSearchLon] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterState, setFilterState] = useState("");
  const [expandedIssue, setExpandedIssue] = useState(null);

  // Unique states for filter dropdown
  const states = [...new Set(initialIssues.map((issue) => issue.state))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
  };

  // Search, filter, sort function
  const handleSearch = () => {
    let filteredIssues = [...initialIssues]; // start from full data

    // Search by city
    if (searchCity) {
      filteredIssues = filteredIssues.filter((issue) =>
        issue.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }
    // Search by Lat/Lon
    else if (searchLat && searchLon) {
      filteredIssues = filteredIssues.filter(
        (issue) =>
          Math.abs(parseFloat(issue.lat) - parseFloat(searchLat)) < 0.01 &&
          Math.abs(parseFloat(issue.lon) - parseFloat(searchLon)) < 0.01
      );
    }

    // Filter by state
    if (filterState) {
      filteredIssues = filteredIssues.filter((issue) => issue.state === filterState);
    }

    // Sort by date
    filteredIssues.sort((a, b) =>
      sortOrder === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );

    setIssues(filteredIssues);
  };

  // Auto trigger search whenever filters change
  useEffect(() => {
    handleSearch();
  }, [searchCity, searchLat, searchLon, filterState, sortOrder]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 lg:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-10">
          <h1 className="text-3xl font-bold text-gray-700 mb-6 tracking-tight">All Issues</h1>

          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row gap-4">
            {/* City Search */}
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Search by City</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => { setSearchCity(e.target.value); if (e.target.value) { setSearchLat(""); setSearchLon(""); } }}
                  placeholder="Enter city name"
                  className="w-full p-2 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Latitude/Longitude Search */}
            <div className="flex-1 flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Latitude</label>
                <input
                  type="number"
                  value={searchLat}
                  onChange={(e) => { setSearchLat(e.target.value); if (e.target.value) setSearchCity(""); }}
                  placeholder="Enter latitude"
                  className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Longitude</label>
                <input
                  type="number"
                  value={searchLon}
                  onChange={(e) => { setSearchLon(e.target.value); if (e.target.value) setSearchCity(""); }}
                  placeholder="Enter longitude"
                  className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                disabled={!searchCity && (!searchLat || !searchLon)}
              >
                Search
              </button>
            </div>
          </div>

          {/* Sort & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Sort by Date</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Filter by State</label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Section - Issues List */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {issues.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">No issues found.</p>
          ) : (
            issues.map((issue) => (
              <motion.div key={issue.id} variants={itemVariants} whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }} whileTap={{ scale: 0.98 }} className="bg-white shadow-md rounded-2xl p-6">
                {/* Summary */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">{issue.issueTitle}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    issue.issueType === "Pothole" ? "bg-yellow-100 text-yellow-700" :
                    issue.issueType === "Streetlight" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {issue.issueType}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600"><span className="font-medium">City:</span> {issue.city}</p>
                  <p className="text-gray-600"><span className="font-medium">Date:</span> {new Date(issue.date).toLocaleDateString()}</p>
                  <p className="text-gray-600"><span className="font-medium">Reported By:</span> {issue.name}</p>
                </div>

                {/* Show More Details Button */}
                <button
                  onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {expandedIssue === issue.id ? "Hide Details" : "Show More Details"}
                </button>

                {/* Expanded Details */}
                {expandedIssue === issue.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.3 }} className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Personal Information</h4>
                      <p className="text-gray-700"><span className="font-medium">Name:</span> {issue.name}</p>
                      <p className="text-gray-600"><span className="font-medium">Email:</span> {issue.email}</p>
                      <p className="text-gray-600"><span className="font-medium">Phone:</span> {issue.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Location</h4>
                      <p className="text-gray-700"><span className="font-medium">Address:</span> {issue.street}, {issue.landmark}, {issue.city}, {issue.state} {issue.pin}</p>
                      <p className="text-gray-600"><span className="font-medium">Coordinates:</span> Lat: {issue.lat}, Lon: {issue.lon}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Issue Details</h4>
                      <p className="text-gray-700"><span className="font-medium">Title:</span> {issue.issueTitle}</p>
                      <p className="text-gray-600"><span className="font-medium">Description:</span> {issue.issueDescription}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Images</h4>
                      {issue.images.length > 0 ? (
                        <div className="flex overflow-x-auto space-x-4 pb-2">
                          {issue.images.map((image, index) => (
                            <motion.img key={index} src={image} alt={`Issue ${issue.issueTitle} - Image ${index + 1}`} className="w-32 h-32 object-cover rounded-lg shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} />
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No images provided</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* For dynamic data, replace `initialIssues` with API fetch */}
      {/*
      useEffect(() => {
        fetch('/api/issues')
          .then(res => res.json())
          .then(data => setIssues(data))
          .catch(err => console.error(err));
      }, []);
      */}
    </div>
  );
};

export default AllIssue;
