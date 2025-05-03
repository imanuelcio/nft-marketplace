import { NextFunction, Request, Response } from "express";
import * as profileService from "../../services/profile.services";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { walletAddress } = req.params;
    const profile = await profileService.getProfileByWalletAddress(
      walletAddress
    );
    res.status(200).json({
      status: 200,
      message: "success",
      profile,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "error", error });
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await profileService.updateProfile(req.body);
    if (profile.error) {
      res.status(400).json({
        status: 400,
        message: "error",
        profile: profile.error,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "success",
        profile,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "error", error });
    next(error);
  }
};
