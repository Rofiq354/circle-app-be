import express from "express";
import * as followController from "../controllers/follow";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/follows", authenticate, followController.getUserFollowers);
router.post(
  "/follows/:followingId",
  authenticate,
  followController.toggleFollow,
);

export default router;
