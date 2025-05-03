"use client";
// LoginPage.tsx
import React from "react";
import { useAuthService } from "../services/auth";
import { toast } from "react-hot-toast";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Web3 Wallet Login</h1>

      {isConnected ? (
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-md">
          <p className="text-lg">Terhubung dengan alamat:</p>
          <p className="font-mono bg-gray-100 p-2 rounded">{address}</p>

          <button
            onClick={handleLogout}
            disabled={isLogoutLoading}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLogoutLoading ? "Logging Out..." : "Logout"}
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          disabled={isAuthLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {isAuthLoading ? "Processing..." : "Connect Wallet & Login"}
        </button>
      )}

      {authError && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg max-w-md">
          <p className="font-semibold">Error:</p>
          <p>{authError.message}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
