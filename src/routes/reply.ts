import express from "express";
import * as replyController from "../controllers/reply";
import { authenticate } from "../middlewares/auth";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.get("/reply", authenticate, replyController.getRepliesByThreadId);
router.post(
  "/reply",
  authenticate,
  upload.single("image"),
  replyController.createReplyByThreadId,
);

export default router;
