import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import Report from "./page/Report";
import TrackReport from "./page/TrackReport";
import Dashboard from "./components/user-dashboard/Dashboard";
import YourIssue from "./components/user-dashboard/YourIssue";
import AllIssue from "./components/user-dashboard/AllIssue";
import UserDetails from "./components/user-dashboard/UserDetails";
import Auth from "./page/Auth";

const App = () => {
  return (
    <Routes>
      {/* Home and Report */}
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/sign-in" element={<Auth />} />

      {/* Track Report with nested routes */}
      <Route path="/track" element={<TrackReport />}>
        {/* Redirect /track to /track/dashboard */}
        <Route index element={<Navigate to="/track/dashboard" replace />} />

        {/* Nested track routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="your-issue" element={<YourIssue />} />
        <Route path="all-issues" element={<AllIssue />} />
        <Route path="user-details" element={<UserDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
