import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Track Status", path: "/track" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-between items-center px-8 py-3 bg-gray-200 text-gray-800 shadow-lg fixed w-full z-50 backdrop-blur-lg border-b border-white/30"
    >
      {/* Logo + Brand Name */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-12 rounded-full" />
        <h2 className="text-[20px] font-semibold text-gray-600">CITI SAVER</h2>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-10">
        {navLinks.map((link, index) => (
          <li key={index} className="cursor-pointer">
            <Link to={link.path}>
              <motion.span
                className="inline-block "
                whileHover={{ scale: 1.1, color: "#CD2C58" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {link.name}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
