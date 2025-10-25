import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 sm:px-10 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Logo & About */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Civic Issue Tracker</h3>
          <p className="mt-3 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
            A smart platform connecting citizens with local authorities to report, track, and resolve civic issues faster and transparently.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-gray-300 text-sm sm:text-base md:text-lg">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/report" className="hover:text-blue-400">Report Issue</Link></li>
            <li><Link to="/track" className="hover:text-blue-400">Track Complaint</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400">Admin Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold">Follow Us</h4>
          <p className="mt-3 text-gray-400 text-sm sm:text-base md:text-lg">
            Stay connected for updates and announcements.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-xl sm:text-2xl">
            <Link to="#" className="hover:text-blue-500"><FaFacebookF /></Link>
            <Link to="#" className="hover:text-blue-400"><FaTwitter /></Link>
            <Link to="#" className="hover:text-pink-500"><FaInstagram /></Link>
            <Link to="#" className="hover:text-blue-600"><FaLinkedin /></Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center text-gray-500 text-xs sm:text-sm md:text-base mt-10 border-t border-gray-700 pt-4"
      >
        © {new Date().getFullYear()} Civic Issue Tracker. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
