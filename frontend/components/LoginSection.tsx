"use client";
import React, { useState, useEffect } from "react";
import { useAuthService } from "../services/auth";

const LoginSection = () => {
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

  // Format address for display
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
    <div className="max-w-md w-full mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg p-6 text-white">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              Welcome to CIO NFT Marketplace
            </h2>
            <p className="text-blue-100">
              Connect your wallet before you explore
            </p>
          </div>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="bg-white p-6 rounded-b-lg shadow-md border border-gray-200 border-t-0">
        {!isConnected ? (
          <div className="flex flex-col items-center py-4">
            <p className="text-gray-600 mb-4 text-center">
              Connect your Ethereum wallet to browse and trade NFTs
            </p>
            <button
              onClick={handleConnect}
              disabled={isConnectLoading}
              className="px-6 py-3 bg-blue-500 text-white font-medium cursor-pointer rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors w-full"
            >
              {isConnectLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connecting...
                </span>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="font-mono text-sm text-gray-800">
                  {shortenedAddress}
                </span>
              </div>
              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Connected
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <p className="text-gray-600 text-sm">
                  Please sign the message with your wallet to authenticate
                </p>
                <button
                  onClick={handleLogin}
                  disabled={isLoginLoading}
                  className="px-4 py-3 bg-indigo-600 text-white cursor-pointer rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition-colors"
                >
                  {isLoginLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing...
                    </span>
                  ) : (
                    "Sign With Wallet"
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="text-green-600 text-sm font-medium py-3 px-4 bg-green-50 rounded-lg border border-green-200 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Authentication successful
                </div>

                <button
                  onClick={handleLogout}
                  disabled={isLogoutLoading}
                  className="px-4 py-2 bg-white text-red-500 border border-red-300 cursor-pointer rounded-lg disabled:opacity-50 hover:bg-red-50 transition-colors flex items-center justify-center"
                >
                  {isLogoutLoading ? (
                    "Disconnecting..."
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Disconnect Wallet
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {errorMessage && (
          <div className="text-red-500 text-sm mt-4 p-3 border border-red-300 bg-red-50 rounded-lg flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSection;
