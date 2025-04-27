// auth.ts
import { axiosInstance } from "../libs/axios";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

export const useAuthService = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const connectWalletMutation = useMutation({
    mutationFn: async () => {
      const injectedConnector = connectors.find(
        (c) => c.id === "injected" || c.name.toLowerCase().includes("metamask")
      );

      if (!injectedConnector) {
        throw new Error("No injected connector found (MetaMask or similar)");
      }

      const result = await connectAsync({ connector: injectedConnector });
      console.log("Connected wallet successfully:", result);
      return result;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (!address) throw new Error("Wallet not connected");

      try {
        console.log("Starting authentication process for address:", address);

        // Step 1: Get nonce from backend
        console.log(`Requesting nonce from /auth/nonce/${address}`);
        let nonceRes;
        try {
          nonceRes = await axiosInstance.get(`/auth/nonce/${address}`);
          console.log("Nonce response:", nonceRes.data);
        } catch (error) {
          console.error("Error fetching nonce:", error);
          throw new Error("Failed to get nonce from server");
        }

        const nonce = nonceRes.data.nonce;
        if (!nonce) {
          console.error("No nonce received in response:", nonceRes.data);
          throw new Error("Invalid nonce received from server");
        }

        // Step 2: Sign the message
        console.log(`Signing message: "Login nonce ${nonce}"`);
        let signature;
        try {
          signature = await signMessageAsync({
            message: `Login nonce ${nonce}`,
          });
          console.log("Signature generated:", signature);
        } catch (error) {
          console.error("Error signing message:", error);
          throw new Error("Failed to sign the message with wallet");
        }

        if (!signature) {
          console.error("No signature was returned");
          throw new Error("Failed to generate signature");
        }

        // Step 3: Verify signature on backend
        console.log("Sending verification request to /auth/verify");
        console.log("Payload:", { walletAddress: address, signature });

        let verifyRes;
        try {
          verifyRes = await axiosInstance.post("/auth/verify", {
            walletAddress: address,
            signature,
          });
          console.log("Verification response:", verifyRes.data);
        } catch (error: any) {
          console.error("Error during verification:", error);
          if (error.response) {
            console.error("Server response:", error.response.data);
            throw new Error(
              `Server verification failed: ${JSON.stringify(
                error.response.data
              )}`
            );
          }
          throw new Error("Failed to verify signature with server");
        }

        return verifyRes.data;
      } catch (error) {
        console.error("Authentication error:", error);
        throw error; // Rethrow the specific error to preserve the message
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
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
    login: loginMutation.mutateAsync,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error,

    connectWallet: connectWalletMutation.mutateAsync,
    isConnectLoading: connectWalletMutation.isPending,
    connectError: connectWalletMutation.error,

    logout: logoutMutation.mutateAsync,
    isLogoutLoading: logoutMutation.isPending,

    address,
    isConnected,
  };
};
