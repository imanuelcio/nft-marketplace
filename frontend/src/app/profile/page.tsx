import React from "react";
import Navbar from "../../../screen/Navbar";
import ProfileSection from "../../../screen/profile/ProfileSection";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <ProfileSection />
    </div>
  );
};

export default ProfilePage;
