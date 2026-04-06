export const config = {
  port: process.env.PORT || 3000,
  auth: {
    jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
    accessTokenTtlSeconds: Number(process.env.ACCESS_TOKEN_TTL_SECONDS || 15 * 60),
    refreshTokenTtlSeconds: Number(
      process.env.REFRESH_TOKEN_TTL_SECONDS || 7 * 24 * 60 * 60,
    ),
  },
};
