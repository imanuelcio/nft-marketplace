import { Router } from "express";
import { userController } from "../controllers/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  profileParamsValidation,
  profileUpdateValidation,
} from "../middleware/validator.middleware";
const profileRouter = Router();

profileRouter.get("/user/:idOrWallet", userController.getUserProfile);
profileRouter.put("/user/:id", userController.updateUserProfile);
export default profileRouter;
