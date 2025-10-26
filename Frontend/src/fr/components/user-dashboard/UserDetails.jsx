import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSave,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

// Dummy initial issues
const initialIssues = [
  { id: 1, status: "pending" },
  { id: 2, status: "resolved" },
  { id: 3, status: "pending" },
  { id: 4, status: "resolved" },
  { id: 5, status: "pending" },
];

const UserDetails = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "New York",
    pincode: "10001",
    dateOfJoining: "2023-01-15",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [issues, setIssues] = useState(initialIssues);

  const totalIssues = issues.length;
  const resolvedIssues = issues.filter((i) => i.status === "resolved").length;
  const pendingIssues = issues.filter((i) => i.status === "pending").length;

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
  };
  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start  p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dashboard Stats */}
      <motion.div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            label: "Total Issues",
            value: totalIssues,
            color: "text-gray-800",
            bg: "bg-white",
          },
          {
            label: "Resolved Issues",
            value: resolvedIssues,
            color: "text-green-600",
            bg: "bg-white",
          },
          {
            label: "Pending Issues",
            value: pendingIssues,
            color: "text-red-600",
            bg: "bg-white",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center ${stat.bg} hover:shadow-2xl transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-gray-500 font-semibold mb-2">{stat.label}</h3>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* User Profile */}
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md transition-all duration-200"
                  onClick={handleSave}
                >
                  <FaSave /> Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-md transition-all duration-200"
                  onClick={handleCancel}
                >
                  <FaTimes /> Cancel
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md transition-all duration-200"
                onClick={handleEdit}
              >
                <FaEdit /> Edit
              </motion.button>
            )}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          {[
            {
              label: "Name",
              icon: <FaUser size={24} />,
              name: "name",
              type: "text",
            },
            {
              label: "Email",
              icon: <FaEnvelope size={24} />,
              name: "email",
              type: "email",
            },
            {
              label: "Phone",
              icon: <FaPhone size={24} />,
              name: "phone",
              type: "tel",
            },
            {
              label: "Address",
              icon: <FaMapMarkerAlt size={24} />,
              name: "address",
              type: "text",
            },
            {
              label: "City",
              icon: <FaMapMarkerAlt size={24} />,
              name: "city",
              type: "text",
            },
            {
              label: "Pincode",
              icon: <FaMapMarkerAlt size={24} />,
              name: "pincode",
              type: "text",
            },
            {
              label: "Date of Joining",
              icon: <FaCalendarAlt size={24} />,
              name: "dateOfJoining",
              type: "date",
            },
          ].map((field, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-4  rounded-xl shadow-inner"
              variants={itemVariants}
            >
              <div className="text-gray-500 shrink-0">{field.icon}</div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-800">
                    {user[field.name]}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserDetails;
