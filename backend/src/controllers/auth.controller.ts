import { Request, Response } from "express";

import { config } from "@/config";
import { SignInSchema, SignUpSchema } from "@/schema/auth.schema";
import { signinService, signupService } from "@/services/auth.service";
import { sendErrorResponse } from "@/utils/error-handler";
import { signSession } from "@/utils/session-manager";

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

    // Create JWT and set cookie
    const { token, expiresAt } = await signSession(
      { userId: user.id, role: user.role },
      {
        secret: config.auth.jwtSecret,
        ttlSeconds: config.auth.jwtTtlSeconds,
        secure: process.env.NODE_ENV === "production",
      },
    );

    res.status(200).json({
      success: true,
      data: {
        user,
        token,
        tokenType: "Bearer",
        expiresAt: expiresAt.toISOString(),
      },
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}
