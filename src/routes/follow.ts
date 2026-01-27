import express from "express";
import * as followController from "../controllers/follow";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get(
  "/follows/:id/:type",
  authenticate,
  followController.getUserFollowers,
);
router.post(
  "/follows/:followingId",
  authenticate,
  followController.toggleFollow,
);

export default router;
