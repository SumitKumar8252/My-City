import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

// Dark/Light toggle component
const DarkLightToggle = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`relative flex items-center w-16 h-8 p-1 rounded-full cursor-pointer ${
        darkMode ? "bg-gray-700" : "bg-yellow-300"
      }`}
      onClick={toggleMode}
    >
      <m.div
        className="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center z-10"
        animate={{ x: darkMode ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {darkMode ? (
          <FaMoon className="text-gray-800 text-xs" />
        ) : (
          <FaSun className="text-yellow-400 text-xs" />
        )}
      </m.div>

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

// Navbar component
const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Track Status", path: "/track" },
    { name: "Sign-In", path: "/sign-in" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <m.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-between items-center px-6 md:px-8 py-3 bg-gray-200 text-gray-800 shadow-lg fixed w-full z-50 backdrop-blur-lg border-b border-white/30"
    >
      {/* Logo + Brand Name */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
        <h2 className="text-[18px] md:text-[20px] font-semibold text-gray-600">
          CITI SAVER
        </h2>
      </Link>

      {/* Desktop Links + Toggle */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-8">
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer">
              <Link to={link.path}>
                <m.span
                  className="inline-block"
                  whileHover={{ scale: 1.1, color: "#CD2C58" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.name}
                </m.span>
              </Link>
            </li>
          ))}
        </ul>
        <DarkLightToggle />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <DarkLightToggle />
        <button onClick={toggleMenu} className="text-gray-800 text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <m.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 min-h-screen w-full flex flex-col items-center py-4 gap-4 md:hidden shadow-lg border-t border-gray-300"
          style={{
            background: `linear-gradient(
      135deg,
      rgba(200, 200, 230),
      rgba(220, 220, 220) 
    )`,
            backdropFilter: "blur(12px)",
          }}
        >
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer">
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-lg"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </m.ul>
      )}
    </m.nav>
  );
};

export default Navbar
