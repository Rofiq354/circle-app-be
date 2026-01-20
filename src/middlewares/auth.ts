import { Request, Response, NextFunction } from "express";
import { registerToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Unauthorized", 401);

  try {
    const token = authHeader.split(" ")[1];
    const decoded = registerToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token", error });
  }
};
