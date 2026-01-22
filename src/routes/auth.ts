import expres from "express";
import * as authController from "../controllers/auth";
import { authenticate } from "../middlewares/auth";

const router = expres.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
