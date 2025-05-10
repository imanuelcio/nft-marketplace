"use client";
import React from "react";
import { motion } from "framer-motion";
import { Camera, User, Mail, Edit2 } from "lucide-react";
import { useAccount } from "wagmi";
const ProfileSection = () => {
  const { address } = useAccount();
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="relative rounded-2xl overflow-visible mb-8">
          <div className="h-56 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-24 bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Wallet Address
                </label>
                <div className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300">
                  {address}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Member Since
                </label>
                <div className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300">
                  March 2024
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium transition-all transform hover:scale-105">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileSection;
