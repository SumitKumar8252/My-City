// Report.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {motion} from "framer-motion"
import MultiStepForm from "../components/report-form/MultiStepForm";

const Report = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="mt-20 flex-1 flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Page Title */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 text-center leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Report an Issue
        </motion.h1>

        {/* Page Description */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg text-gray-600 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl px-2 sm:px-0 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Fill out the form below to report a civic issue in your area. Your input helps us keep the community safe and clean.
        </motion.p>

        {/* Form Container */}
        <motion.div 
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MultiStepForm />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-auto w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Report;