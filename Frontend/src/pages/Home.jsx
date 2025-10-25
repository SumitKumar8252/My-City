import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LiveLocationWeather from "../components/LiveLocationWeather";
import Description from "../components/Description";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <HeroSection />
      <LiveLocationWeather/>
      <Description/>
      <Footer/>
    </div>
  );
};

export default Home;
