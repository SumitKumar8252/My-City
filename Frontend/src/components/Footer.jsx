import React from "react";
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} // Prevents re-animation on scroll
        >
          <h3 className="text-2xl font-bold">Civic Issue Tracker</h3>
          <p className="mt-3 text-gray-400 text-sm md:text-base leading-relaxed">
            A smart platform that connects citizens with local authorities to report, track, and resolve civic issues faster and transparently.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/report" className="hover:text-blue-400 transition-colors">
                Report Issue
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-blue-400 transition-colors">
                Track Complaint
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold">Follow Us</h4>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
            Stay connected for updates and announcements.
          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <Link to="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
              <FaFacebookF />
            </Link>
            <Link to="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </Link>
            <Link to="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </Link>
            <Link to="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
              <FaLinkedin />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4"
      >
        © {new Date().getFullYear()} Civic Issue Tracker. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

// Optional: Add PropTypes if using prop-types package
// import PropTypes from 'prop-types';
// Footer.propTypes = {
//   // Add props if needed
// };

export default Footer;