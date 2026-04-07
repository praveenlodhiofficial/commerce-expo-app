import { Router } from "express";

import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  updatePasswordController,
} from "@/controllers/auth.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = Router();

/* ================================ Routes ================================= */
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);
router.patch("/update-password", authMiddleware, updatePasswordController);

export default router;
