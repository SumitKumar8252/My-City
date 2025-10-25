// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Report from "./page/Report";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default App;
