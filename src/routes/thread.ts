import express from "express";
import * as threadController from "../controllers/thread";
import { authenticate } from "../middlewares/auth";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.get("/thread", authenticate, threadController.getAllThreads);
router.post(
  "/thread",
  authenticate,
  upload.single("image"),
  threadController.createThread,
);
router.get("/thread/:threadId", authenticate, threadController.getThreadById);

export default router;
