"use client";
import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectWallet from "../components/ConnectWallet";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [searchFocus, setSearchFocus] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <motion.div
            onClick={() => router.push("/")}
            className="w-10 h-10 bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-bold text-xl">C</span>
          </motion.div>
          <span className="font-bold text-xl">NFT Ciao</span>
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

        <ConnectWallet />
      </nav>
    </header>
  );
};

export default Navbar;
