import { createRefreshSession, findRefreshSession, revokeRefreshSession } from "@/dal/session.dal";
import { ApiError } from "@/utils/api-error";
import { signAccessToken, signRefreshToken } from "@/utils/session";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

type AuthConfig = {
  jwtSecret: string;
  accessTokenTtlSeconds: number;
  refreshTokenTtlSeconds: number;
};

export async function loginAuthService(user: AuthUser, config: AuthConfig) {
  const { token: accessToken, expiresAt: accessExpiresAt } = await signAccessToken(
    {
      userId: user.id,
      role: user.role,
    },
    config.jwtSecret,
    config.accessTokenTtlSeconds
  );

  const { token: refreshToken, expiresAt: refreshExpiresAt } = await signRefreshToken(
    user.id,
    config.jwtSecret,
    config.refreshTokenTtlSeconds
  );

  await createRefreshSession(user.id, refreshToken, refreshExpiresAt);

  return {
    user,
    accessToken,
    refreshToken,
    accessExpiresAt,
    refreshExpiresAt,
    tokenType: "Bearer" as const,
  };
}

export async function refreshAuthService(refreshToken: string, config: AuthConfig) {
  try {
    const session = await findRefreshSession(refreshToken);

    if (!session || session.revokedAt) {
      throw new ApiError(401, "Refresh token is invalid or revoked");
    }

    if (new Date() > session.expiresAt) {
      throw new ApiError(401, "Refresh token has expired");
    }

    const newAccessToken = await signAccessToken(
      {
        userId: session.userId,
        role: session.user.role,
      },
      config.jwtSecret,
      config.accessTokenTtlSeconds
    );

    const newRefreshToken = await signRefreshToken(
      session.userId,
      config.jwtSecret,
      config.refreshTokenTtlSeconds
    );

    await revokeRefreshSession(session.id);

    await createRefreshSession(session.userId, newRefreshToken.token, newRefreshToken.expiresAt);

    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      },
      accessToken: newAccessToken.token,
      refreshToken: newRefreshToken.token,
      accessExpiresAt: newAccessToken.expiresAt,
      refreshExpiresAt: newRefreshToken.expiresAt,
      tokenType: "Bearer" as const,
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid refresh token");
  }
}

export async function logoutAuthService(refreshToken: string) {
  const session = await findRefreshSession(refreshToken);

  if (session) {
    await revokeRefreshSession(session.id);
  }

  return { success: true, message: "Logged out" };
}
