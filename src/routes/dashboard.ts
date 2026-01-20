import expres from "express";
import * as dashboardController from "../controllers/dashboard";
import { authenticate } from "../middlewares/auth";

const router = expres.Router();

router.get("/", authenticate, dashboardController.index);

export default router;
