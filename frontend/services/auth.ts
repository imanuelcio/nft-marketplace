import { axiosInstance } from "../libs/axios";
import { useAccount, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";

export const authService = () => {
  const { address, isConnected } = useAccount();

  const { signMessageAsync } = useSignMessage();

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (!address) throw new Error("Wallet not found");

      const nonceres = await axiosInstance.get(`/auth/nonce/${address}`);
      const nonce = nonceres.data.nonce;

      const signature = await signMessageAsync({
        message: `Login nonce ${nonce}`,
      });
      await axiosInstance.post("/auth/verify", {
        walletAddress: address,
        signature,
      });
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    address,
    isConnected,
  };
};
