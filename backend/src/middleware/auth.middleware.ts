import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { AuthToken } from "../types/user.type";

interface CustomRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.startsWith("bearer")) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized token is missing",
        error: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized token is missing",
        error: "Unauthorized",
      });
    }

    const decoded = verifyJwt(token) as AuthToken;

    req.user = {
      userId: decoded.userId,
      walletAddress: decoded.walletAddress,
    };

    next();
  } catch (error: any) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
