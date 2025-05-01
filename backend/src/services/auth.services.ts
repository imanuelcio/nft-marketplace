import { randomBytes } from "crypto";
import { supabase } from "../database/connection";
import { ethers } from "ethers";
import { signJwt } from "../utils/jwt";

export const getNonce = async (walletAddress: string) => {
  const lowerWallet = walletAddress.toLowerCase();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, nonce") // hanya ambil yang dibutuhkan
    .eq("wallet_address", lowerWallet)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Error fetching user: " + error.message);
  }

  let nonce = user?.nonce;

  if (!user) {
    nonce = randomBytes(16).toString("hex");
    const { error: insertError } = await supabase.from("users").insert([
      {
        wallet_address: lowerWallet,
        nonce: nonce,
      },
    ]);
    if (insertError) {
      throw new Error("Error creating user: " + insertError.message);
    }
  } else if (!nonce) {
    // Kalau user sudah ada tapi belum punya nonce
    nonce = randomBytes(16).toString("hex");
    await supabase
      .from("users")
      .update({ nonce })
      .eq("wallet_address", lowerWallet);
  }

  return { nonce };
};

export const verifySignature = async (
  walletAddress: string,
  signature: string
) => {
  const lowerWallet = walletAddress.toLowerCase();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, nonce")
    .eq("wallet_address", lowerWallet)
    .single();

  if (error || !user) {
    throw new Error("User not found");
  }

  const messageNonce = `Login nonce ${user.nonce}`;
  const recoveredAddress = ethers.verifyMessage(messageNonce, signature);

  if (recoveredAddress.toLowerCase() !== lowerWallet) {
    throw new Error("Signature verification failed");
  }

  const newNonce = randomBytes(16).toString("hex");
  const { error: updateError } = await supabase
    .from("users")
    .update({ nonce: newNonce, last_login_at: new Date().toISOString() })
    .eq("wallet_address", lowerWallet);

  if (updateError) {
    throw new Error("Error updating nonce: " + updateError.message);
  }

  const token = signJwt({
    walletAddress: lowerWallet,
    userId: user.id,
  });

  return { token };
};
