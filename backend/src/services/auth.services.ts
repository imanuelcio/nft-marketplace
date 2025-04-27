import { randomBytes } from "crypto";
import User from "../models/user";
import { ethers } from "ethers";
import { signJwt } from "../utils/jwt";

export const getNonce = async (walletAddress: string) => {
  let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
  if (!user) {
    user = new User({
      walletAddress: walletAddress.toLowerCase(),
      nonce: randomBytes(16).toString("hex"),
    });
    await user.save();
  }

  return { nonce: user.nonce };
};

export const verifySignature = async (
  walletAddress: string,
  signature: string
) => {
  let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
  if (!user) {
    throw new Error("User not found");
  }

  const messageNonce = `Login nonce ${user.nonce}`;

  const recoveredAddress = ethers.verifyMessage(messageNonce, signature);
  console.log(recoveredAddress);
  if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
    throw new Error("Signature verification failed");
  }
  user.nonce = randomBytes(16).toString("hex");
  await user.save();
  const token = signJwt({
    walletAddress: walletAddress.toLowerCase(),
    userId: user._id,
  });
  return { token };
};
