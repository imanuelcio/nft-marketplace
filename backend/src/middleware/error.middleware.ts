import { Request, Response, NextFunction } from "express";

export const errorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).json({
    error: err.message || "Something went wrong",
  });
};
