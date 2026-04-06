import { signAccessToken, signRefreshToken } from "@/utils/session-manager";
import {
  createRefreshSession,
  findRefreshSession,
  revokeRefreshSession,
} from "@/dal/refresh-session.dal";
import { ApiError } from "@/utils/api-error";

function getEncodedKey(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function verifyAndRotateRefreshToken(
  refreshToken: string,
  secret: string,
  accessTokenTtl: number,
  refreshTokenTtl: number,
) {
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
      secret,
      accessTokenTtl,
    );

    const newRefreshTokenData = await signRefreshToken(
      session.userId,
      secret,
      refreshTokenTtl,
    );

    await revokeRefreshSession(session.id);

    await createRefreshSession(
      session.userId,
      newRefreshTokenData.token,
      newRefreshTokenData.expiresAt,
    );

    return {
      newAccessToken,
      newRefreshToken: newRefreshTokenData,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      },
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid refresh token");
  }
}

export async function revokeRefreshTokenByToken(token: string) {
  const session = await findRefreshSession(token);
  if (session) {
    await revokeRefreshSession(session.id);
  }
}

export { signAccessToken, signRefreshToken, createRefreshSession };
