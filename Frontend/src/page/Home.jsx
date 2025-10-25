// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/home-page/HeroSection";
import LiveLocationWeather from "../components/home-page/LiveLocationWeather";
import Description from "../components/home-page/Description";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Navbar - Sticky at the top with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white shadow-md w-full"
      >
        <Navbar />
      </motion.div>

      {/* Hero Section with slide-up */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <HeroSection />
      </motion.div>

      {/* Live Location Weather Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full mt-12 px-4 md:px-8"
      >
        <LiveLocationWeather />
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full mt-16 px-4 md:px-8"
      >
        <Description />
      </motion.div>

      {/* Footer Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full mt-12"
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;