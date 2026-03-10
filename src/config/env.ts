import dotenv from "dotenv";
dotenv.config();

export const env = {
  post: process.env.PORT || 3000,
  frontEnd: process.env.FRONT_END_URL || "http://localhost:5173",
  jwtSecret: (process.env.JWT_SECRET as string) || "secret",
  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME!,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY!,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET!,
};
