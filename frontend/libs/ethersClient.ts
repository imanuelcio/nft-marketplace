import { ethers } from "ethers";

export const getProvider = () => {
  if (typeof window === "undefined") {
    throw new Error("window is undefined");
  }
  const { ethereum } = window as any;
  if (!ethereum) {
    throw new Error("Ethereum provider not found");
  }

  const provider = new ethers.BrowserProvider(ethereum);
  return provider;
};

export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return signer;
};
