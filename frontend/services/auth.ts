// auth.ts
import { axiosInstance } from "../libs/axios";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

export const useAuthService = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync, isSuccess } = useSignMessage();

  // const connectWalletMutation = useMutation({
  //   mutationFn: async () => {
  //     const injectedConnector = connectors.find(
  //       (c) => c.id === "injected" || c.name.toLowerCase().includes("metamask")
  //     );

  //     if (!injectedConnector) {
  //       throw new Error("No injected connector found (MetaMask or similar)");
  //     }

  //     const result = await connectAsync({ connector: injectedConnector });
  //     console.log("Connected wallet successfully:", result);
  //     return result;
  //   },
  // });

  const connectAndLoginMutation = useMutation({
    mutationFn: async () => {
      try {
        console.log("Start Connecting wallet ...");

        const injectedConnector = connectors.find(
          (c) =>
            c.id === "injected" || c.name.toLowerCase().includes("metamask")
        );

        if (!injectedConnector)
          throw new Error("No injected connector found (MetaMask or similar)");

        const connectResult = await connectAsync({
          connector: injectedConnector,
        });

        const walletAddress = connectResult.accounts;
        console.log(walletAddress);
        if (!walletAddress) {
          throw new Error("Failed to get wallet address after connect");
        }

        // Step 1: Get nonce from backend
        console.log(`Requesting nonce from /auth/nonce/${walletAddress[0]}`);
        const nonceRes = await axiosInstance.get(
          `/auth/nonce/${walletAddress[0]}`
        );
        console.log("Nonce received:", nonceRes.data);

        const nonce = nonceRes.data.nonce;
        if (!nonce) {
          console.error("No nonce received in response:", nonceRes.data);
          throw new Error("Invalid nonce received from server");
        }

        console.log(`Signing message: "Login nonce ${nonce}"`);
        const signature = await signMessageAsync({
          message: `Login nonce ${nonce}`,
        });
        console.log("Signature:", signature);

        if (!signature) {
          console.error("No signature was returned");
          throw new Error("Failed to generate signature");
        }
        console.log("Sending verification request to /auth/verify");
        console.log("Payload:", { walletAddress: walletAddress[0], signature });

        const verifyRes = await axiosInstance.post(`/auth/verify`, {
          walletAddress: walletAddress[0],
          signature,
        });

        console.log("Verification result:", verifyRes.data);

        return {
          connectResult,
          authResult: verifyRes.data,
        };
      } catch (error) {
        console.error("Authentication error:", error);
        throw error; // Rethrow the specific error to preserve the message
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        console.log("Deleting cookie....");
        await axiosInstance.post("/auth/logout");
        console.log("Successfully deleted cookie");
        console.log("Disconnecting wallet");
        await disconnectAsync();
        console.log("Wallet disconnected successfully");
        return true;
      } catch (error) {
        console.error("Error during logout:", error);
        throw error;
      }
    },
  });

  return {
    // Fungsi utama yang digabungkan
    connectAndLogin: connectAndLoginMutation.mutateAsync,
    isAuthLoading: connectAndLoginMutation.isPending,
    authError: connectAndLoginMutation.error,
    authData: connectAndLoginMutation.data,

    // Tetap menyediakan fungsi logout
    logout: logoutMutation.mutateAsync,
    isLogoutLoading: logoutMutation.isPending,

    // Informasi status
    address,
    isConnected,
  };
};
