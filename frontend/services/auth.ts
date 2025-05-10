import { axiosInstance } from "../libs/axios";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useSignMessage } from "wagmi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const useAuthService = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const connectAndLoginMutation = useMutation({
    mutationFn: async () => {
      try {
        if (!address) {
          throw new Error("No wallet address found");
        }

        console.log("Starting authentication process...");
        console.log("Wallet address:", address);
        console.log("Is connected:", isConnected);
        toast.loading("Authenticating...", { id: "auth" });

        // Step 1: Get nonce from backend
        const nonceRes = await axiosInstance.get(`/auth/nonce/${address}`);
        const nonce = nonceRes.data?.nonce;

        if (!nonce) {
          throw new Error("Failed to get nonce from server");
        }

        console.log("Got nonce:", nonce);

        // Step 2: Sign the nonce
        try {
          const message = `Login nonce ${nonce}`;
          console.log("Preparing to sign message:", message);

          // Direct signing with wagmi
          console.log("Initiating signing request...");
          const signature = await signMessageAsync({ message });
          console.log("Signature received:", signature);

          if (!signature) {
            throw new Error("No signature returned from wallet");
          }

          // Step 3: Verify signature with backend
          console.log("Sending signature to backend for verification...");
          const verifyRes = await axiosInstance.post("/auth/verify", {
            walletAddress: address,
            signature,
          });

          console.log("Authentication successful:", verifyRes.data);
          toast.success("Authentication successful!", { id: "auth" });

          //  set to session storage status login
          sessionStorage.setItem("loginStatus", "true");

          return {
            walletAddress: address,
            authResult: verifyRes.data,
          };
        } catch (signError: any) {
          console.error("Detailed signing error:", {
            error: signError,
            code: signError.code,
            message: signError.message,
            data: signError.data,
            stack: signError.stack,
          });

          if (signError.code === "ACTION_REJECTED") {
            throw new Error("Message signing was rejected by user");
          }
          if (signError.code === "UNSUPPORTED_OPERATION") {
            throw new Error("Your wallet does not support message signing");
          }
          throw new Error(`Failed to sign message: ${signError.message}`);
        }
      } catch (error: any) {
        console.error("Authentication error:", {
          error,
          code: error.code,
          message: error.message,
          stack: error.stack,
        });
        toast.error(error.message || "Authentication failed", { id: "auth" });
        throw error;
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        console.log("Logging out...");
        toast.loading("Logging out...", { id: "logout" });

        await axiosInstance.post("/auth/logout");

        toast.success("Logged out successfully", { id: "logout" });
        return true;
      } catch (error: any) {
        console.error("Logout error:", error);
        toast.error(error.message || "Logout failed", { id: "logout" });
        throw error;
      }
    },
  });

  // Handle wallet disconnection
  useEffect(() => {
    if (!isConnected) {
      logoutMutation.mutate();
    }
  }, [isConnected]);

  return {
    connectAndLogin: connectAndLoginMutation.mutateAsync,
    isAuthLoading: connectAndLoginMutation.isPending,
    authError: connectAndLoginMutation.error,
    authData: connectAndLoginMutation.data,
    logout: logoutMutation.mutateAsync,
    isLogoutLoading: logoutMutation.isPending,
    address,
    isConnected,
  };
};
