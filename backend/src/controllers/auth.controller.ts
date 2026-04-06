import { Request, Response } from "express";

import { config } from "@/config";
import { LoginSchema, RegisterSchema } from "@/schema/auth.schema";
import { loginService, registerService } from "@/services/auth.service";
import {
  loginAuthService,
  logoutAuthService,
  refreshAuthService,
} from "@/services/session.service";
import { ApiError } from "@/utils/api-error";
import { sendErrorResponse } from "@/utils/error-handler";

/* -------------------------------------------------------------------------- */
/*                            REGISTER CONTROLLER                              */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                            LOGIN CONTROLLER                                */
/* -------------------------------------------------------------------------- */

export async function loginController(req: Request, res: Response) {
  try {
    const parsed = LoginSchema.parse(req.body);
    const user = await loginService(parsed);
    const { accessToken, refreshToken, accessExpiresAt, refreshExpiresAt, tokenType } =
      await loginAuthService(user, config.auth);

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

/* -------------------------------------------------------------------------- */
/*                            REFRESH TOKEN CONTROLLER                         */
/* -------------------------------------------------------------------------- */

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
    } = await refreshAuthService(refreshToken, config.auth);

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

/* -------------------------------------------------------------------------- */
/*                              LOGOUT CONTROLLER                             */
/* -------------------------------------------------------------------------- */

export async function logoutController(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body as Record<string, unknown>;
    if (!refreshToken) {
      return res.status(200).json({
        success: true,
        message: "Logged out",
      });
    }

    await logoutAuthService(refreshToken as string);

    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}
