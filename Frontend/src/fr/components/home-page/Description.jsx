import React from "react";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <div className="w-full bg-white px-4 sm:px-6 md:px-20 lg:px-32 py-16 flex flex-col gap-12 sm:gap-16">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center max-w-6xl mx-auto"
      >
        Civic Issue Tracker – A Smarter Way to Fix Local Problems
      </motion.h2>

      {/* Main Description */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-justify max-w-6xl mx-auto space-y-3 sm:space-y-4"
      >
        <p>
          Everyday issues like potholes, overflowing garbage bins, damaged streetlights, or broken public infrastructure often go unnoticed or unaddressed for weeks. Even when people try to raise complaints, the process is usually complicated, slow, and lacks transparency. You register an issue, but then what? There’s no way to know who’s handling it or when it’ll be fixed.
        </p>
        <p>
          <strong>Civic Issue Tracker</strong> solves this problem by giving citizens an easy and transparent way to report local issues directly from their phones or computers. With the help of Google Maps API, users can pin the exact location of the problem, upload photos for better clarity, and submit a detailed description. Once submitted, the complaint moves through clear stages like: <strong>Pending → In Progress → Resolved</strong>, so you always know what’s happening.
        </p>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-50 p-4 sm:p-6 md:p-10 rounded-xl shadow-md max-w-6xl mx-auto flex flex-col gap-4 sm:gap-6"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">👥 How It Works:</h3>

        <div className="text-gray-700 leading-relaxed space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg">
          <div>
            <strong>Citizens can:</strong>
            <ul className="list-disc ml-5 sm:ml-6 mt-1 sm:mt-2 space-y-1">
              <li>Report issues with images, location (via map), and description.</li>
              <li>Track the status of their complaint in real-time.</li>
              <li>Receive notifications when their issue is updated or resolved.</li>
            </ul>
          </div>

          <div>
            <strong>Authorities/Administrators can:</strong>
            <ul className="list-disc ml-5 sm:ml-6 mt-1 sm:mt-2 space-y-1">
              <li>View all complaints categorized by area and priority.</li>
              <li>Update issue status, assign tasks to respective teams.</li>
              <li>Analyze trends—most reported issue types or affected areas.</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Extra Features */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-4 sm:p-6 md:p-10 rounded-xl shadow-md max-w-6xl mx-auto flex flex-col gap-3 sm:gap-4"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">🌟 Extra Features:</h3>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base md:text-lg">
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
        className="text-center text-gray-700 font-medium text-sm sm:text-base md:text-lg max-w-4xl mx-auto"
      >
        This platform creates a direct bridge between citizens and local authorities — ensuring issues are not just heard but acted upon. <strong>A simple step toward smarter cities and responsible governance.</strong>
      </motion.p>
    </div>
  );
};

export default Description;
