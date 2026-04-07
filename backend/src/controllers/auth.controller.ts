import { Request, Response } from "express";

import { LoginSchema, RegisterSchema, UpdatePasswordSchema } from "@/schema/auth.schema";
import { loginService, registerService, updatePasswordService } from "@/services/auth.service";
import { createSession, refreshSession, revokeSession } from "@/services/session.service";
import { ApiError } from "@/utils/api-error";
import { sendErrorResponse } from "@/utils/error-handler";
import { config } from "@/config";

/* ============================================================================= */
/*                            REGISTER CONTROLLER                                */
/* ============================================================================= */

export async function registerController(req: Request, res: Response) {
  try {
    const parsed = RegisterSchema.parse(req.body);
    const user = await registerService(parsed);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

/* ============================================================================= */
/*                             LOGIN CONTROLLER                                 */
/* ============================================================================= */

export async function loginController(req: Request, res: Response) {
  try {
    const parsed = LoginSchema.parse(req.body);
    const user = await loginService(parsed);
    const { accessToken, refreshToken, accessExpiresAt, refreshExpiresAt, tokenType } =
      await createSession(user, config.auth);

    res.status(200).json({
      success: true,
      data: {
        user,
        accessToken,
        refreshToken,
        tokenType,
        accessExpiresAt: accessExpiresAt.toISOString(),
        refreshExpiresAt: refreshExpiresAt.toISOString(),
      },
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

/* ============================================================================= */
/*                               REFRESH CONTROLLER                              */
/* ============================================================================= */

export async function refreshController(req: Request, res: Response) {
  try {
    const refreshToken = (req.body as Record<string, unknown>)?.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new ApiError(400, "Refresh token is required");
    }

    const {
      accessToken,
      refreshToken: newRefreshToken,
      accessExpiresAt,
      refreshExpiresAt,
      user,
      tokenType,
    } = await refreshSession(refreshToken, config.auth);

    res.status(200).json({
      success: true,
      data: {
        user,
        accessToken,
        refreshToken: newRefreshToken,
        tokenType,
        accessExpiresAt: accessExpiresAt.toISOString(),
        refreshExpiresAt: refreshExpiresAt.toISOString(),
      },
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

/* ============================================================================= */
/*                              LOGOUT CONTROLLER                               */
/* ============================================================================= */

export async function logoutController(req: Request, res: Response) {
  try {
    const refreshToken = (req.body as Record<string, unknown> | undefined)?.refreshToken;
    if (!refreshToken) {
      return res.status(200).json({
        success: true,
        message: "Logged out",
      });
    }

    await revokeSession(refreshToken as string);

    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

/* ============================================================================= */
/*                           UPDATE PASSWORD CONTROLLER                          */
/* ============================================================================= */

export async function updatePasswordController(req: Request, res: Response) {
  try {
    const parsed = UpdatePasswordSchema.parse(req.body);
    const session = req.authUser;

    if (!session?.userId) {
      throw new ApiError(401, "Unauthorized");
    }

    const result = await updatePasswordService(session.userId, parsed);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}
