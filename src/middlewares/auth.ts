import { Request, Response, NextFunction } from "express";
import { registerToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;
  if (!token) throw new AppError("Unauthorized", 401);

  try {
    const decoded = registerToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token", error });
  }
};
