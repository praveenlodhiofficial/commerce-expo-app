import { Request, Response } from "express";

import { SignInSchema, SignUpSchema } from "@/schema/auth.schema";
import { signinService, signupService } from "@/services/auth.service";
import { sendErrorResponse } from "@/utils/error-handler";

/* -------------------------------------------------------------------------- */
/*                            SIGN-UP CONTROLLER                              */
/* -------------------------------------------------------------------------- */

export async function signupController(req: Request, res: Response) {
  try {
    const parsed = SignUpSchema.parse(req.body);
    const user = await signupService(parsed);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

/* -------------------------------------------------------------------------- */
/*                            SIGN-IN CONTROLLER                              */
/* -------------------------------------------------------------------------- */

export async function signinController(req: Request, res: Response) {
  try {
    const parsed = SignInSchema.parse(req.body);
    const user = await signinService(parsed);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}
