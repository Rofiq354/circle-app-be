import express from "express";
import * as likeController from "../controllers/like";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/like", authenticate, likeController.toggleLike);

export default router;
