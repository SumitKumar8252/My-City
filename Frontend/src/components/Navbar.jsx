import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="App" style={{ textAlign: "center", marginTop: "100px" }}>
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        🎉 Framer Motion Works!
      </motion.h1>

      <motion.button
        style={{
          marginTop: "50px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.2, backgroundColor: "#FFD700", color: "#000" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Hover Me
      </motion.button>
    </div>
  );
};

export default Navbar;
