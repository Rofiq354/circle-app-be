import express from "express";
import * as replyController from "../controllers/reply";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/reply", authenticate, replyController.getRepliesByThreadId);

export default router;
