import { Router } from "express";

import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "@/controllers/auth.controller";

const router = Router();

/* ================================ Routes ================================= */
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

export default router;
