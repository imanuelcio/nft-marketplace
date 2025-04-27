"use client";
import React, { useState } from "react";
import { useAuthService } from "../services/auth";

const LoginSection = () => {
  const {
    login,
    isLoginLoading,
    loginError,
    connectWallet,
    isConnectLoading,
    connectError,
    logout,
    isLogoutLoading,
    address,
    isConnected,
  } = useAuthService();

  const [errorMessage, setErrorMessage] = useState("");

  const handleConnect = async () => {
    setErrorMessage("");
    try {
      await connectWallet();
      console.log("Wallet connected successfully");
    } catch (error) {
      console.error("Connection failed:", error);
      setErrorMessage(
        `Connect error: ${
          error instanceof Error ? error.message : "Unknown connection error"
        }`
      );
    }
  };

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const result = await login();
      console.log("Login successful:", result);
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(
        `Login error: ${
          error instanceof Error
            ? error.message
            : "Unknown authentication error"
        }`
      );
    }
  };

  const handleLogout = async () => {
    setErrorMessage("");
    try {
      await logout();
      console.log("Logged out successfully");
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      setErrorMessage(
        `Logout error: ${
          error instanceof Error ? error.message : "Unknown logout error"
        }`
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!isConnected ? (
        <button
          onClick={handleConnect}
          disabled={isConnectLoading}
          className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded disabled:opacity-50"
        >
          {isConnectLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <>
          <div className="text-sm text-gray-600">
            Connected:{" "}
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoginLoading}
            className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded disabled:opacity-50"
          >
            {isLoginLoading ? "Signing..." : "Sign Wallet"}
          </button>
          <button
            onClick={handleLogout}
            disabled={isLogoutLoading}
            className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded disabled:opacity-50"
          >
            {isLogoutLoading ? "Disconnecting..." : "Disconnect Wallet"}
          </button>
        </>
      )}

      {errorMessage && (
        <div className="text-red-500 text-sm mt-2 p-2 border border-red-300 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default LoginSection;
