import { Router } from "express";
import { getNonce, verifySignature } from "../controllers/auth/auth.controller";

const authRouter = Router();

authRouter.get("/auth/nonce/:walletAddress", getNonce);
authRouter.post("/auth/verify", verifySignature);
export default authRouter;
