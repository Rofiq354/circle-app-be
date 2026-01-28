import express from "express";
import * as userController from "../controllers/user";
import { authenticate } from "../middlewares/auth";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.get("/profile", authenticate, userController.getUserProfile);
router.patch(
  "/profile",
  authenticate,
  upload.fields([
    { name: "photo_profile", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
  ]),
  userController.updateUserProfile,
);
router.get(
  "/profile/:username",
  authenticate,
  userController.getUserProfileByUsername,
);
router.get("/users", authenticate, userController.getAllUser);
router.get("/users/search", authenticate, userController.searchUserByUsername);

export default router;
