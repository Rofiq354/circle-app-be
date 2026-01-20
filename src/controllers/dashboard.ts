import { NextFunction, Request, Response } from "express";
export const index = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "home page successfully" });
  } catch (error) {
    next(error);
  }
};
