// Report.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MultiStepForm from "../components/report-form/MultiStepForm";

const Report = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="mt-15 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Report an Issue
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-lg sm:max-w-xl lg:max-w-2xl">
          Fill out the form below to report a civic issue in your area. Your
          input helps us keep the community safe and clean.
        </p>

        {/* Form Container */}
        <div className="w-[900px] max-w-2xl min-h-[800px]">
          <MultiStepForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Report;