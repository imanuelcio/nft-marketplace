import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const profileRouter = Router();

profileRouter.get("/profile/:walletAddress", getProfile);
profileRouter.post("/update/profile", updateProfile);

export default profileRouter;
