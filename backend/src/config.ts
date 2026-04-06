export const config = {
  port: process.env.PORT || 3000,
  auth: {
    jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
    jwtTtlSeconds: Number(process.env.JWT_TTL_SECONDS || 60 * 60 * 24 * 7),
  },
};
