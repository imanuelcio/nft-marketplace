"use client";
import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-bold text-xl">N</span>
          </motion.div>
          <span className="font-bold text-xl">NFT Nexus</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className={`hover:text-purple-400 transition-colors ${
              activeCategory === "all" ? "text-purple-400" : ""
            }`}
            onClick={() => setActiveCategory("all")}
          >
            Explore
          </a>
          <a
            href="#"
            className={`hover:text-purple-400 transition-colors ${
              activeCategory === "collections" ? "text-purple-400" : ""
            }`}
            onClick={() => setActiveCategory("collections")}
          >
            Collections
          </a>
          <a
            href="#"
            className={`hover:text-purple-400 transition-colors ${
              activeCategory === "artists" ? "text-purple-400" : ""
            }`}
            onClick={() => setActiveCategory("artists")}
          >
            Artists
          </a>
          <a
            href="#"
            className={`hover:text-purple-400 transition-colors ${
              activeCategory === "community" ? "text-purple-400" : ""
            }`}
            onClick={() => setActiveCategory("community")}
          >
            Community
          </a>
        </div>

        <div className="hidden md:flex relative mx-4 flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className={`w-full bg-gray-800/50 text-white border ${
              searchFocus ? "border-purple-500" : "border-gray-700"
            } rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Search NFTs, collections, artists..."
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
        </div>

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
            Connect Wallet
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

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 border-t border-gray-800 md:hidden"
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
      </nav>
    </header>
  );
};

export default Navbar;
