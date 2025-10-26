import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const DarkLightToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`relative flex items-center w-16 h-8 p-1 rounded-full cursor-pointer ${
        darkMode ? "bg-gray-700" : "bg-yellow-300"
      }`}
      onClick={toggleTheme}
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center z-10"
        animate={{ x: darkMode ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {darkMode ? (
          <FaMoon className="text-gray-800 text-xs" />
        ) : (
          <FaSun className="text-yellow-400 text-xs" />
        )}
      </motion.div>

      <div className="flex justify-between w-full px-2 z-0">
        <FaSun
          className={`text-yellow-400 ${
            darkMode ? "opacity-50" : "opacity-100"
          } transition-opacity duration-300 text-[10px]`}
        />
        <FaMoon
          className={`text-gray-800 ${
            darkMode ? "opacity-100" : "opacity-50"
          } transition-opacity duration-300 text-[10px]`}
        />
      </div>
    </div>
  );
};

export default DarkLightToggle;
