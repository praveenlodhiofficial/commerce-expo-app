import { Router } from "express";
import {
  logoutController,
  refreshController,
  signinController,
  signupController,
} from "@/controllers/auth.controller";

const router = Router();

/* ================================ Routes ================================= */
router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

export default router;