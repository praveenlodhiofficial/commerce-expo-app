import { Router } from "express";
import { signinController, signupController } from "@/controllers/auth.controller";

const router = Router();

/* ================================ Routes ================================= */
router.post("/signup", signupController);
router.post("/signin", signinController);

export default router;