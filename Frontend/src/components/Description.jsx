import React from "react";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <div className="w-full bg-white px-6 md:px-20 py-12 flex flex-col gap-8 overflow-hidden">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-gray-800 text-center"
      >
        Civic Issue Tracker – A Smarter Way to Fix Local Problems
      </motion.h2>

      {/* Main Description */}
      <motion.p
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-lg text-gray-700 leading-relaxed text-justify"
      >
        Everyday issues like potholes, overflowing garbage bins, damaged streetlights, or broken public infrastructure often go unnoticed or unaddressed for weeks. 
        Even when people try to raise complaints, the process is usually complicated, slow, and lacks transparency. 
        You register an issue, but then what? There’s no way to know who’s handling it or when it’ll be fixed.
        <br /> <br />
        <strong>Civic Issue Tracker</strong> solves this problem by giving citizens an easy and transparent way to report local issues directly from their phones or computers.
        With the help of Google Maps API, users can pin the exact location of the problem, upload photos for better clarity, and submit a detailed description.
        Once submitted, the complaint moves through clear stages like:  
        <strong> Pending → In Progress → Resolved</strong>, so you always know what’s happening.
      </motion.p>

      {/* Section: How it Works */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-50 p-6 rounded-xl shadow-md"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">👥 How It Works:</h3>
        <p className="text-gray-700 leading-relaxed">
          <strong>Citizens can:</strong>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Report issues with images, location (via map), and description.</li>
            <li>Track the status of their complaint in real-time.</li>
            <li>Receive notifications when their issue is updated or resolved.</li>
          </ul>
          <br />
          <strong>Authorities/Administrators can:</strong>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>View all complaints categorized by area and priority.</li>
            <li>Update issue status, assign tasks to respective teams.</li>
            <li>Analyze trends—most reported issue types or affected areas.</li>
          </ul>
        </p>
      </motion.div>

      {/* Extra Features */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">🌟  Features:</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>AI Chatbot Support:</strong> Ask “What’s the status of my complaint?” and get instant replies.</li>
          <li><strong>Public Transparency Map:</strong> View all resolved issues—build trust and accountability.</li>
          <li><strong>Smart Filters & Search:</strong> Sort issues by category, location, status, or date.</li>
          <li><strong>Real-Time Notifications:</strong> Email, SMS, or in-app alerts when issue status changes.</li>
        </ul>
      </motion.div>

      {/* Closing Line */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-gray-700 font-medium mt-6"
      >
        This platform creates a direct bridge between citizens and local authorities — ensuring issues 
        are not just heard but acted upon.  
        <strong> A simple step toward smarter cities and responsible governance.</strong>
      </motion.p>
    </div>
  );
};

export default Description;
