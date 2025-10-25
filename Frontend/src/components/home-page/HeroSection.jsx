import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const hexagons = [
    { size: 80, color: "rgba(147, 197, 253, 0.3)", top: "10%", right: "5%" },
    { size: 60, color: "rgba(196, 181, 253, 0.3)", top: "30%", right: "15%" },
    { size: 50, color: "rgba(249, 168, 212, 0.3)", top: "50%", right: "10%" },
    { size: 80, color: "rgba(253, 230, 138, 0.3)", top: "70%", right: "20%" },
    { size: 95, color: "rgba(134, 239, 172, 0.3)", top: "85%", right: "5%" },
  ]; // Only 5 hexagons initially for faster load

  const hexStyle = {
    clipPath:
      "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
    opacity: 0.25,
    position: "absolute",
    borderRadius: "30px",
  };

  return (
    <header className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-200 text-gray-900 px-4 sm:px-6 md:px-10 text-center relative overflow-hidden">
      {/* Hexagons */}
      {hexagons.map((hex, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4 + index * 0.3, ease: "linear" }}
          style={{
            ...hexStyle,
            width: `${hex.size}px`,
            height: `${hex.size}px`,
            top: hex.top,
            right: hex.right,
            left: hex.left,
            backgroundColor: hex.color,
          }}
        />
      ))}

      {/* Main Heading */}
      <motion.h1
        initial={false} // render immediately, no initial animation
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-snug text-center z-10 px-2 sm:px-0"
      >
        <span className="text-gray-700">Your City,</span>{" "}
        <span className="text-gray-600">Your Voice,</span>{" "}
        <span className="text-gray-500">Your Impact</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={false} // show immediately
        className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl z-10 px-2 sm:px-0"
      >
        Report, Track, and Monitor civic issues in your city with ease. Join
        your community in keeping your neighborhood safe and clean.
      </motion.p>

      {/* Call-to-Action Buttons */}
      <motion.div
        className="flex flex-row gap-4 sm:gap-6 md:gap-10 mt-6 sm:mt-8 z-10"
        initial={false} // render immediately
      >
        <Link
          to="/report"
          className="px-5 sm:px-6 py-2 sm:py-3 bg-[#704264] text-white font-semibold rounded-lg shadow-lg hover:bg-[#945884] transition-colors duration-300 text-sm sm:text-base"
        >
          Report Issue
        </Link>

        <Link
          to="/track"
          className="px-5 sm:px-6 py-2 sm:py-3 bg-[#DBAFA0] text-white font-semibold rounded-lg shadow-lg hover:bg-[#A87C7C] transition-colors duration-300 text-sm sm:text-base"
        >
          Track Status
        </Link>
      </motion.div>

      {/* Bottom torch-light curve */}
      <div
        className="absolute bottom-0 w-full h-48 sm:h-56 md:h-64 lg:h-70 overflow-hidden z-0"
        style={{
          background:
            "radial-gradient(circle at center bottom, rgba(255, 150, 120, 0.15) 10%, rgba(255, 150, 120, 0.1) 40%, rgba(255, 150, 120, 0) 80%)",
          borderRadius: "50% 50% 0 0",
          transform: "scaleX(1.5)",
        }}
      />
    </header>
  );
};

export default HeroSection;
