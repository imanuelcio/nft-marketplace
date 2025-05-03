import { supabase } from "../database/connection";
import { ApiResponse, UserProfile } from "../types/profile.type";

export const getProfileByWalletAddress = async (
  walletAddress: string
): Promise<ApiResponse<UserProfile>> => {
  try {
    if (!walletAddress || !walletAddress.trim()) {
      return {
        data: null,
        error: new Error("Wallet address is required"),
        status: 400,
      };
    }
    const normalizedWalletAddress = walletAddress.toLowerCase();

    const { data: profile, error } = await supabase
      .from("users")
      .select(
        "id, wallet_address, email, username, email_verified, avatar_url, banner_url, bio, created_at, updated_at"
      )
      .eq("wallet_address", normalizedWalletAddress)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error("Error fetching user: " + error.message);
    }

    return {
      data: profile as UserProfile,
      error,
      status: 200,
    };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Unknown error occurred");
    console.error("Unexpected error in updateProfile:", error);

    return {
      data: null,
      error,
      status: 500,
    };
  }
};

export const updateProfile = async (
  profile: UserProfile
): Promise<ApiResponse<UserProfile>> => {
  try {
    if (!profile.wallet_address) {
      return {
        data: null,
        error: new Error("Wallet address is required"),
        status: 400,
      };
    }

    profile.wallet_address = profile.wallet_address.toLowerCase();

    const updateProfile = {
      ...profile,
      updated_at: new Date().toISOString(),
    };

    if (!profile.id) {
      updateProfile.created_at = updateProfile.updated_at;
    }

    const { data, error } = await supabase
      .from("users")
      .upsert([updateProfile]);

    if (error) {
      console.log("Database error when updating Profile", error);
      return {
        data: null,
        error: new Error(`Error update profile ${error.message}`),
        status: 500,
      };
    }
    return await getProfileByWalletAddress(profile.wallet_address);
  } catch (err) {
    const error =
      err instanceof Error
        ? err
        : new Error("Unknown error occurred in updateProfile");
    return {
      data: null,
      error,
      status: 500,
    };
  }
};
