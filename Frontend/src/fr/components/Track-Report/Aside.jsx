import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUserAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

const Aside = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: <FaTachometerAlt /> },
    { name: "Your Issue", path: "your-issue", icon: <FaMapMarkedAlt /> },
    { name: "All Issues", path: "all-issues", icon: <FaClipboardList /> },
    { name: "User Details", path: "user-details", icon: <FaUserAlt /> },
  ];

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="flex flex-col justify-between h-full p-4">
      {/* Menu Items */}
      <m.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="space-y-6 mt-4"
      >
        {menuItems.map((item, index) => {
          const isActive = location.pathname.endsWith(item.path);
          return (
            <m.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </m.li>
          );
        })}
      </m.ul>

      {/* Logout */}
      <m.button
        onClick={handleLogout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        className="flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded text-sm font-medium transition-colors duration-200"
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </m.button>

      {/* Logout Animation Fullscreen */}
      {isLoggingOut && (
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-linear-to-b from-purple-100 to-red-100 z-50 flex items-center justify-center"
        >
          <span className="text-gray-800 text-2xl font-semibold tracking-wide">
            Logging Out...
          </span>
        </m.div>
      )}
    </div>
  );
};

export default Aside;
