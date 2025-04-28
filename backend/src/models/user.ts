import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  walletAddress: string;
  nonce: string;
  username?: string;
  email?: string;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    walletAddress: { type: String, required: true, unique: true },
    nonce: { type: String, required: true },
    username: { type: String, default: "" },
    email: { type: String, default: "" },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
