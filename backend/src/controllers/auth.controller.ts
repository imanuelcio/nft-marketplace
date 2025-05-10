import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.services";
export const getNonce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { walletAddress } = req.params;
    const result = await authService.getNonce(walletAddress);
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const verifySignature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { walletAddress, signature } = req.body;

    const { token } = await authService.verifySignature(
      walletAddress,
      signature
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      // secure: process.env.NODE_ENV === "production", // hanya HTTPS kalau production :)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    res.json({ success: true, message: "Login success" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logout success" });
  } catch (error) {
    next(error);
  }
};
