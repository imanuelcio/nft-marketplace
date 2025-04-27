"use client";
import React from "react";
import { authService } from "../services/auth";

const LoginSection = () => {
  const { login, isLoading, isConnected } = authService();

  const handleLogin = async () => {
    try {
      await login();
      alert("Login success");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleLogin}
        disabled={isLoading || !isConnected}
        className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded disabled:opacity-50"
      >
        {isConnected
          ? isLoading
            ? "Signing..."
            : "Login"
          : "Connect your wallet first!"}
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded disabled:opacity-50">
        Connect Wallet
      </button>
    </div>
  );
};

export default LoginSection;
