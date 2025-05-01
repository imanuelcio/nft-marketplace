import React from "react";
import HomeSection from "../components/HomeSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <HomeSection />
      <Footer />
    </div>
  );
};

export default HomeLayout;
