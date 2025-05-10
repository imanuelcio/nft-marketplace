import { axiosInstance } from "../libs/axios";
import { useMutation } from "@tanstack/react-query";
import { getSigner } from "../libs/ethersClient";

export const useAuthService = () => {
  const connectAndLoginMutation = useMutation({
    mutationFn: async () => {
      try {
        console.log("Start Connecting wallet ...");

        const signer = await getSigner();
        const walletAddress = await signer.getAddress();
        console.log("Wallet address:", walletAddress);

        // Step 1: Get nonce
        const nonceRes = await axiosInstance.get(
          `/auth/nonce/${walletAddress}`
        );
        const nonce = nonceRes.data?.nonce;
        if (!nonce) throw new Error("Invalid nonce received");

        // Step 2: Sign nonce
        const message = `Login nonce ${nonce}`;
        const signature = await signer.signMessage(message);
        if (!signature) throw new Error("No signature returned");

        console.log("Signature:", signature);

        // Step 3: Send to backend for verification
        const verifyRes = await axiosInstance.post(`/auth/verify`, {
          walletAddress,
          signature,
        });

        return {
          walletAddress,
          authResult: verifyRes.data,
        };
      } catch (err) {
        console.error("Authentication error:", err);
        throw err;
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        console.log("Deleting session and disconnecting wallet...");
        await axiosInstance.post("/auth/logout");

        // Optionally, clear any frontend state if you track wallet address
        console.log("Logout successful");
        return true;
      } catch (err) {
        console.error("Logout error:", err);
        throw err;
      }
    },
  });

  return {
    connectAndLogin: connectAndLoginMutation.mutateAsync,
    isAuthLoading: connectAndLoginMutation.isPending,
    authError: connectAndLoginMutation.error,
    authData: connectAndLoginMutation.data,

    logout: logoutMutation.mutateAsync,
    isLogoutLoading: logoutMutation.isPending,
  };
};
