import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const signToken = (payload: object) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "1h" });
};

export const registerToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret);
};
