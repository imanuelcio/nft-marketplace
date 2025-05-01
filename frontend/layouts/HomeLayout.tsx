import React from "react";
import Navbar from "../screen/Navbar";
import HomeSection from "../screen/HomeSection";
import Footer from "../screen/Footer";

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
