import { Router } from "express";
import {
  logoutController,
  refreshController,
  loginController,
  registerController,
} from "@/controllers/auth.controller";

const router = Router();

/* ================================ Routes ================================= */
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

export default router;