import React, { useState } from "react";
import { motion as m } from "framer-motion";
import Navbar from "../components/Navbar";
import Aside from "../components/Track-Report/Aside";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";

const TrackReport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const location = useLocation(); // Get current route

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <m.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Navbar />
      </m.div>

      {/* Main Layout */}
      <div className="flex pt-16 w-full">
        {/* Sidebar */}
        <m.div
          initial={{ x: -300, opacity: 0 }}
          animate={{
            x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -300,
            opacity: isSidebarOpen || window.innerWidth >= 1024 ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
            w-56 lg:w-64 bg-white shadow-sm z-40 transform transition-transform duration-300
            ${isSidebarOpen ? "block" : "hidden lg:block"}`}
        >
          <Aside isSidebarOpen={isSidebarOpen} />
        </m.div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black z-30"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Content Area */}
        <div
          className="flex-1 min-h-screen transition-all duration-300 ml-0 lg:ml-64 p-6 sm:p-8 lg:p-10
                bg-linear-to-br from-red-50 to-purple-100"
        >
          <m.div
            key={location.pathname} // re-mount motion div whenever route changes
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </m.div>
        </div>

        {/* Mobile toggle button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-20 left-4 z-50 p-2.5 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
    </div>
  );
};

export default TrackReport;
