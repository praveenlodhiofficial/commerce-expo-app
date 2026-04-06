import { Request, Response } from "express";

import { config } from "@/config";
import { LoginSchema, RegisterSchema } from "@/schema/auth.schema";
import { loginService, registerService } from "@/services/auth.service";
import {
  createRefreshSession,
  signAccessToken,
  signRefreshToken,
  verifyAndRotateRefreshToken,
  revokeRefreshTokenByToken,
} from "../services/token.service";
import { sendErrorResponse } from "@/utils/error-handler";
import { ApiError } from "@/utils/api-error";

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

    const { token: accessToken, expiresAt: accessExpiresAt } =
      await signAccessToken(
        {
          userId: user.id,
          role: user.role,
        },
        config.auth.jwtSecret,
        config.auth.accessTokenTtlSeconds,
      );

    const { token: refreshToken, expiresAt: refreshExpiresAt } =
      await signRefreshToken(
        user.id,
        config.auth.jwtSecret,
        config.auth.refreshTokenTtlSeconds,
      );

    await createRefreshSession(
      user.id,
      refreshToken,
      refreshExpiresAt,
    );

    res.status(200).json({
      success: true,
      data: {
        user,
        accessToken,
        refreshToken,
        tokenType: "Bearer",
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
    const refreshToken = (req.body as Record<string, unknown>)?.refreshToken as
      | string
      | undefined;
    if (!refreshToken) {
      throw new ApiError(400, "Refresh token is required");
    }

    const { newAccessToken, newRefreshToken, user } =
      await verifyAndRotateRefreshToken(
        refreshToken,
        config.auth.jwtSecret,
        config.auth.accessTokenTtlSeconds,
        config.auth.refreshTokenTtlSeconds,
      );

    res.status(200).json({
      success: true,
      data: {
        user,
        accessToken: newAccessToken.token,
        refreshToken: newRefreshToken.token,
        accessExpiresAt: newAccessToken.expiresAt.toISOString(),
        refreshExpiresAt: newRefreshToken.expiresAt.toISOString(),
      },
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}

/* -------------------------------------------------------------------------- */
/*                              LOGOUT CONTROLLER                              */
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

    await revokeRefreshTokenByToken(refreshToken as string);

    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
}
