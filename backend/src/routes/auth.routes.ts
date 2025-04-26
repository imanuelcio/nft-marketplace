import { Router } from "express";
import { getNonce, verifySignature } from "../controllers/auth/auth.controller";

const authRouter = Router();

authRouter.get("/nonce/:walletAddress", getNonce);
authRouter.post("/verify", verifySignature);
export default authRouter;
