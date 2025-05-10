import React, { useState } from "react";
import { useAuthService } from "../services/auth";
import { toast } from "react-hot-toast";
import { Search, ShoppingBag, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const LoginPage = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={() => router.push("/profile")}
          className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-colors relative cursor-pointer border border-gray-700/50"
        >
          <User size={20} className="text-gray-300" />
        </button>
        <button className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-colors relative border border-gray-700/50">
          <ShoppingBag size={20} className="text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-purple-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>
      </div>

      {/* Connect Button with Custom Styling */}
      <div className="hidden md:block">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            return (
              <div
                {...(!mounted && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!mounted || !account || !chain) {
                    return (
                      <motion.button
                        onClick={openConnectModal}
                        className="px-4 cursor-pointer py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity text-white shadow-lg shadow-purple-500/20"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Connect Wallet
                      </motion.button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <motion.button
                        onClick={openChainModal}
                        className="px-4 py-2 bg-red-500 rounded-full font-medium hover:opacity-90 transition-opacity text-white"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Wrong network
                      </motion.button>
                    );
                  }

                  return (
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={openChainModal}
                        className="flex  cursor-pointer items-center space-x-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-colors border border-gray-700/50"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {chain.hasIcon && (
                          <div className="w-5 h-5">
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                className="w-5 h-5"
                              />
                            )}
                          </div>
                        )}
                        <span className="text-gray-300">{chain.name}</span>
                      </motion.button>

                      <motion.button
                        onClick={openAccountModal}
                        className="px-4 py-2 cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-colors border border-gray-700/50 text-gray-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {account.displayName}
                      </motion.button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-300"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 border-t border-gray-800 md:hidden"
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
                  className="w-full bg-gray-800/50 text-white border border-gray-700/50 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Search NFTs, collections, artists..."
                />
              </div>

              <nav className="space-y-3">
                <a
                  href="#"
                  className="block py-2 text-lg text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Explore
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Collections
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Artists
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Community
                </a>
                <a
                  href="#"
                  className="block py-2 text-lg text-gray-300 hover:text-purple-400 transition-colors"
                >
                  My Profile
                </a>
              </nav>

              {/* Mobile Connect Button */}
              <div className="pt-4">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    return (
                      <div
                        {...(!mounted && {
                          "aria-hidden": true,
                          style: {
                            opacity: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                          },
                        })}
                      >
                        {(() => {
                          if (!mounted || !account || !chain) {
                            return (
                              <motion.button
                                onClick={openConnectModal}
                                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity text-white shadow-lg shadow-purple-500/20"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Connect Wallet
                              </motion.button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <motion.button
                                onClick={openChainModal}
                                className="w-full px-4 py-2 bg-red-500 rounded-full font-medium hover:opacity-90 transition-opacity text-white"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Wrong network
                              </motion.button>
                            );
                          }

                          return (
                            <div className="space-y-2">
                              <motion.button
                                onClick={openChainModal}
                                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-colors border border-gray-700/50"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {chain.hasIcon && (
                                  <div className="w-5 h-5">
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? "Chain icon"}
                                        src={chain.iconUrl}
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                )}
                                <span className="text-gray-300">
                                  {chain.name}
                                </span>
                              </motion.button>

                              <motion.button
                                onClick={openAccountModal}
                                className="w-full px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-colors border border-gray-700/50 text-gray-300"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {account.displayName}
                              </motion.button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
