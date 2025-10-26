
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Report from "./page/Report";
import TrackReport from "./page/TrackReport";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/track" element={<TrackReport/>}/>
    </Routes>
  );
};

export default App;