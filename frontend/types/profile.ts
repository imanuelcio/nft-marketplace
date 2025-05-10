export interface IProfileData {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  wallet_address: string;
  username: string;
  email: string;
  avatar_url: any;
  banner_url: any;
  bio: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  nonce: string;
}
