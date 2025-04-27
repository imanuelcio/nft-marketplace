import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

interface CustomRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        error: "Unauthorized. Token not found",
      });
    }

    const payload = verifyJwt(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized. Token invalid" });
  }
};
