import express from "express";
import * as threadController from "../controllers/thread";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/thread", authenticate, threadController.getAllThreads);

export default router;
