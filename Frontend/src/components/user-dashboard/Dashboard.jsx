import React from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Sample data
  const stats = [
    { title: "Total Issues", value: 130, color: "bg-blue-400" },
    { title: "New Issues", value: 15, color: "bg-yellow-300" },
    { title: "Pending Issues", value: 45, color: "bg-orange-300" },
    { title: "Completed Issues", value: 70, color: "bg-green-300" },
  ];

  const pieData = {
    labels: ["New", "Pending", "Completed"],
    datasets: [
      {
        data: [15, 45, 70],
        backgroundColor: ["#fef08a", "#fed7aa", "#6ee7b7"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const topUsers = [
    { name: "User A", complaints: 12 },
    { name: "User B", complaints: 10 },
    { name: "User C", complaints: 8 },
    { name: "User D", complaints: 6 },
    { name: "User E", complaints: 5 },
  ];

  const topCities = [
    { name: "New York", issues: 25 },
    { name: "Los Angeles", issues: 18 },
    { name: "Chicago", issues: 15 },
    { name: "Houston", issues: 12 },
    { name: "Miami", issues: 10 },
  ];

  const issues = {
    new: [
      {
        id: 1,
        title: "Pothole on Main St",
        description: "Reported today",
        time: "2 hours ago",
      },
      {
        id: 2,
        title: "Streetlight Outage",
        description: "Near Park Ave",
        time: "1 hour ago",
      },
    ],
    pending: [
      {
        id: 3,
        title: "Garbage Overflow",
        description: "Bin full at corner",
        time: "3 days ago",
      },
      {
        id: 4,
        title: "Illegal Dumping",
        description: "Behind school",
        time: "5 days ago",
      },
      {
        id: 5,
        title: "Sidewalk Crack",
        description: "Trip hazard",
        time: "1 week ago",
      },
    ],
    completed: [
      {
        id: 6,
        title: "Tree Trimming",
        description: "Overhanging wires",
        time: "Completed 2 days ago",
      },
      {
        id: 7,
        title: "Recycling Pickup",
        description: "Missed route",
        time: "Completed 1 day ago",
      },
    ],
  };

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
    <div className="min-h-screen bg-linear -to-br from-gray-100 to-gray-200 py-10 px-4 sm:px-8 lg:px-12 text-purple-700">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-gray-700 mb-10 tracking-tight"
        >
          Dashboard Overview
        </motion.h1>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                y: -4,
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.97 }}
              className={`bg-white shadow-md rounded-2xl p-6 text-center border-l-4 ${stat.color} border-opacity-30 hover:bg-gray-50 transition-colors duration-200`}
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                {stat.title}
              </motion.h3>
              <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-gray-800 mt-3"
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pie Chart and Top Users */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
        >
          {/* Pie Chart */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white shadow-md rounded-2xl p-8 hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Issue Status Distribution (%)
            </h3>
            <div className="flex justify-center">
              <div className="w-72 h-72">
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          padding: 24,
                          usePointStyle: true,
                          font: { size: 13, family: "'Inter', sans-serif" },
                          color: "#4B5563",
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        bodyFont: { size: 13, family: "'Inter', sans-serif" },
                        callbacks: {
                          label: function (context) {
                            const total = context.dataset.data.reduce(
                              (a, b) => a + b,
                              0
                            );
                            const percentage = (
                              (context.parsed / total) *
                              100
                            ).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Top 5 Users */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white shadow-md rounded-2xl p-8 hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Top 5 Users by Issues
            </h3>
            <ul className="space-y-4">
              {topUsers.map((user, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-blue-50 transition-colors duration-150"
                >
                  <span className="text-gray-700 font-medium">{user.name}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {user.complaints}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Top Cities and Issues Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Top 5 Cities */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white shadow-md rounded-2xl p-8 overflow-hidden hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Hexagon Backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 300 200"
                preserveAspectRatio="xMidYMid slice"
              >
                <polygon
                  points="50,0 100,25 100,75 50,100 0,75 0,25"
                  fill="#C6F6D5"
                  opacity="0.2"
                />
                <polygon
                  points="150,50 200,75 200,125 150,150 100,125 100,75"
                  fill="#A7F3D0"
                  opacity="0.15"
                />
                <polygon
                  points="250,0 300,25 300,75 250,100 200,75 200,25"
                  fill="#BBF7D0"
                  opacity="0.1"
                />
              </svg>
            </div>

            <h3 className="relative text-lg font-semibold text-gray-700 mb-6 z-10">
              Top 5 Cities by Issues
            </h3>
            <ul className="relative z-10 space-y-4">
              {topCities.map((city, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-purple-50 transition-colors duration-150"
                >
                  <span className="text-gray-700 font-medium">{city.name}</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {city.issues}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Recent Issues Overview */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white shadow-md rounded-2xl p-8 hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Recent Issues Overview
            </h3>
            <div className="space-y-6">
              {/* New Issues */}
              <div className="border-l-4 border-yellow-300 pl-4">
                <h4 className="font-medium text-yellow-700 mb-3">
                  New Issues ({issues.new.length})
                </h4>
                {issues.new.map((issue, i) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-yellow-50 p-4 rounded-lg mb-3 text-sm hover:bg-yellow-100 transition-colors duration-150"
                  >
                    <p className="font-medium text-gray-700">{issue.title}</p>
                    <p className="text-gray-600">{issue.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{issue.time}</p>
                  </motion.div>
                ))}
              </div>

              {/* Pending Issues */}
              <div className="border-l-4 border-orange-300 pl-4">
                <h4 className="font-medium text-orange-700 mb-3">
                  Pending Issues ({issues.pending.length})
                </h4>
                {issues.pending.slice(0, 2).map((issue, i) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-orange-50 p-4 rounded-lg mb-3 text-sm hover:bg-orange-100 transition-colors duration-150"
                  >
                    <p className="font-medium text-gray-700">{issue.title}</p>
                    <p className="text-gray-600">{issue.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{issue.time}</p>
                  </motion.div>
                ))}
                {issues.pending.length > 2 && (
                  <p className="text-xs text-gray-500">
                    +{issues.pending.length - 2} more
                  </p>
                )}
              </div>

              {/* Completed Issues */}
              <div className="border-l-4 border-green-300 pl-4">
                <h4 className="font-medium text-green-700 mb-3">
                  Completed Issues ({issues.completed.length})
                </h4>
                {issues.completed.slice(0, 2).map((issue, i) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-green-50 p-4 rounded-lg mb-3 text-sm hover:bg-green-100 transition-colors duration-150"
                  >
                    <p className="font-medium text-gray-700">{issue.title}</p>
                    <p className="text-gray-600">{issue.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{issue.time}</p>
                  </motion.div>
                ))}
                {issues.completed.length > 2 && (
                  <p className="text-xs text-gray-500">
                    +{issues.completed.length - 2} more
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
