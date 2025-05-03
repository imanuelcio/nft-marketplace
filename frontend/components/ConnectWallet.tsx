"use client";
// LoginPage.tsx
import React, { useState } from "react";
import { useAuthService } from "../services/auth";
import { toast } from "react-hot-toast";
import { Search, ShoppingBag, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const {
    connectAndLogin,
    isAuthLoading,
    authError,
    isConnected,
    address,
    logout,
    isLogoutLoading,
  } = useAuthService();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogin = async () => {
    try {
      toast.loading("Menghubungkan dompet dan login...", { id: "auth" });

      const result = await connectAndLogin();

      toast.success(
        `Login berhasil! Terhubung dengan alamat ${result.connectResult.accounts}`,
        { id: "auth" }
      );
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(`Login gagal: ${error.message || "Terjadi kesalahan"}`, {
        id: "auth",
      });
    }
  };

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...", { id: "logout" });
      await logout();
      toast.success("Berhasil logout", { id: "logout" });
    } catch (error: any) {
      toast.error(`Logout gagal: ${error.message}`, { id: "logout" });
    }
  };

  return (
    <>
      {isConnected && (
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => router.push("/profile")}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors relative cursor-pointer"
            >
              <User size={20} />
            </button>
            <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      )}

      {!isConnected ? (
        <motion.button
          className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={isAuthLoading}
        >
          {isAuthLoading ? "Loading..." : "Connect Wallet"}
        </motion.button>
      ) : (
        <motion.button
          className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
        >
          {address?.slice(0, 6) + "..." + address?.slice(-4)}
        </motion.button>
      )}

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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-25 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 border-t border-gray-800 md:hidden"
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

                {!isConnected ? (
                  <button
                    className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity"
                    onClick={handleLogin}
                    disabled={isAuthLoading}
                  >
                    {isAuthLoading ? "Loading..." : "Connect Wallet"}
                  </button>
                ) : (
                  <button
                    className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity"
                    onClick={handleLogout}
                  >
                    {address?.slice(0, 6) + "..." + address?.slice(-4)}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
};

export default LoginPage;
