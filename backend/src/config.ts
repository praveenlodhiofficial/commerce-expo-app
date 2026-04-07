export const config = {
  port: Number(process.env.PORT || 3000),
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",
  database: {
    url: process.env.DATABASE_URL || "",
    poolerUrl: process.env.DATABASE_URL_POOLER || "",
  },
  cors: {
    origins: (process.env.CORS_ORIGIN || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
    accessTokenTtlSeconds: Number(process.env.ACCESS_TOKEN_TTL_SECONDS || 15 * 60),
    refreshTokenTtlSeconds: Number(process.env.REFRESH_TOKEN_TTL_SECONDS || 7 * 24 * 60 * 60),
  },
};
