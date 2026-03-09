import dotenv from "dotenv";
dotenv.config();

export const env = {
  post: process.env.PORT || 3000,
  frontEnd: process.env.FRONT_END_URL || "http://localhost:5173",
  jwtSecret: (process.env.JWT_SECRET as string) || "secret",
};
