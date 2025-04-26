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
    <div>
      {isConnected ? (
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Loading..." : "Login with Wallet"}
        </button>
      ) : (
        <p>Connect your wallet first!</p>
      )}
    </div>
  );
};

export default LoginSection;
