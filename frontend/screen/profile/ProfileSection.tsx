"use client";
import React from "react";
import { motion } from "framer-motion";
const ProfileSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  return (
    <>
      <motion.section
        className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8 "
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto ">
          <div className="rounded-lg shadow-md overflow-hidden mb-6 border-2 border-gray-500 h-[300px]  bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="p-4">
              <h3 className="text-center text-2xl font-semibold">Profile</h3>
              <form>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 w-20"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 p-2 border rounded-md w-full bg-gray-800"
                  />
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="mt-1 p-2 border rounded-md w-full bg-gray-800"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default ProfileSection;
