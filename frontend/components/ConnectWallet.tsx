"use client";
import React, { useState } from "react";
import { useAuthService } from "../services/auth";
import { Search, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const ConnectWallet = () => {
  const {
    login,
    isLoginLoading,
    loginError,
    connectWallet,
    isConnectLoading,
    logout,
    isLogoutLoading,
    address,
    isConnected,
  } = useAuthService();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shortenedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const handleConnect = async () => {
    setErrorMessage("");
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection failed:", error);
      setErrorMessage(
        `Connection failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      await login();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setErrorMessage(
        `Login failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleLogout = async () => {
    setErrorMessage("");
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setErrorMessage(
        `Logout failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors relative">
            <User size={20} />
          </button>
          <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-purple-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        <motion.button
          className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {!isConnected ? (
            <span onClick={handleConnect}>Connects Wallet</span>
          ) : (
            <span onClick={handleLogout}>Logout</span>
          )}
        </motion.button>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 border-t border-gray-800 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Search NFTs, collections, artists..."
                />
              </div>

              <nav className="space-y-3">
                <a
                  href="#"
                  className="block py-2 text-lg hover:text-purple-400 transition-colors"
                >
                  Explore
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg hover:text-purple-400 transition-colors"
                >
                  Collections
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg hover:text-purple-400 transition-colors"
                >
                  Artists
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg hover:text-purple-400 transition-colors"
                >
                  Community
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg hover:text-purple-400 transition-colors"
                >
                  My Profile
                </a>
              </nav>

              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium">
                Connect Wallet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectWallet;
