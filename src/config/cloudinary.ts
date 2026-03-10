import { env } from "./env";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.cloudinary_name,
  api_key: env.cloudinary_api_key,
  api_secret: env.cloudinary_api_secret,
});

export default cloudinary;
