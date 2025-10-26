import React from "react";

import HeroSection from "../components/HeroSection";
import LiveLocationWeather from "../components/LiveLocationWeather";

import Footer from "../components/Footer";
import Navbar from "../Components/Navbar";
import Description from "../Components/Description";

const Home = () => {
  return (
    <div className="min-h-screen ">
      <Navbar/>
      <HeroSection />
      <LiveLocationWeather/>
      <Description/>
      <Footer/>
    </div>
  );
};

export default Home;
