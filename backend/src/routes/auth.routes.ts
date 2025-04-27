import { Router } from "express";
import {
  getNonce,
  verifySignature,
  logout,
} from "../controllers/auth/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const authRouter = Router();

authRouter.get("/auth/nonce/:walletAddress", getNonce);
authRouter.post("/auth/verify", verifySignature);
authRouter.post("/auth/logout", logout);

export default authRouter;
