import type { Request, Response } from "express";
import { jwtVerify, SignJWT } from "jose";

/* ============================================================================= */
/*                              SESSION PAYLOAD                                  */
/* ============================================================================= */

export type SessionPayload = {
  userId: string;
  role: "USER" | "ADMIN";
};

/* ============================================================================= */
/*                              SESSION CONFIG                                   */
/* ============================================================================= */

export type SessionConfig = {
  secret: string;
  ttlSeconds: number; // Example: 7 days = 7 * 24 * 60 * 60
  cookieName?: string;

  /**
   * Cookie security:
   * - secure should be true in production HTTPS
   * - sameSite often "lax" for typical web apps
   */
  secure: boolean;
  sameSite?: "lax" | "strict" | "none";
  domain?: string;
};

function getEncodedKey(secret: string) {
  return new TextEncoder().encode(secret);
}

function cookieOptions(cfg: SessionConfig, expires: Date) {
  const sameSite: "lax" | "strict" | "none" = cfg.sameSite ?? "lax";

  return {
    httpOnly: true as const,
    secure: cfg.secure,
    sameSite,
    path: "/" as const,
    expires,
    domain: cfg.domain,
  };
}

/* ============================================================================= */
/*                        BEARER TOKEN (AUTH HEADER)                            */
/* ============================================================================= */

export function getBearerTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;

  return token;
}

/* ============================================================================= */
/*                           BEARER SESSION HELPERS                             */
/* ============================================================================= */

export async function getSessionFromBearerToken(
  req: Request,
  cfg: SessionConfig
): Promise<SessionPayload | null> {
  const token = getBearerTokenFromRequest(req);
  return verifySessionToken(token ?? undefined, cfg);
}

/* ============================================================================= */
/*                         ENCRYPT / SIGN SESSION                               */
/* ============================================================================= */

export async function signSession(payload: SessionPayload, cfg: SessionConfig) {
  const now = Date.now();
  const expiresAt = new Date(now + cfg.ttlSeconds * 1000);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getEncodedKey(cfg.secret));

  return { token, expiresAt, payload };
}

export async function signAccessToken(payload: SessionPayload, secret: string, ttlSeconds: number) {
  return signSession(payload, {
    secret,
    ttlSeconds,
    secure: false,
  });
}

export async function signRefreshToken(userId: string, secret: string, ttlSeconds: number) {
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

  const token = await new SignJWT({ userId, type: "refresh" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getEncodedKey(secret));

  return { token, expiresAt };
}

/* ============================================================================= */
/*                         DECRYPT / VERIFY SESSION                             */
/* ============================================================================= */

export async function verifySessionToken(
  token: string | undefined,
  cfg: SessionConfig
): Promise<SessionPayload | null> {
  try {
    if (!token) return null;

    const { payload } = await jwtVerify(token, getEncodedKey(cfg.secret), {
      algorithms: ["HS256"],
    });

    if (
      typeof payload !== "object" ||
      typeof payload.userId !== "string" ||
      (payload.role !== "USER" && payload.role !== "ADMIN")
    ) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/* ============================================================================= */
/*                        CREATE SESSION (SET COOKIE)                          */
/* ============================================================================= */

export async function createSessionCookie(
  res: Response,
  userId: string,
  role: "USER" | "ADMIN",
  cfg: SessionConfig
) {
  const { token, expiresAt } = await signSession({ userId, role }, cfg);
  const name = cfg.cookieName ?? "session";

  res.cookie(name, token, cookieOptions(cfg, expiresAt));
}

/* ============================================================================= */
/*                        READ SESSION (FROM COOKIE)                           */
/* ============================================================================= */

export async function getSessionFromRequest(
  req: Request,
  cfg: SessionConfig
): Promise<SessionPayload | null> {
  const name = cfg.cookieName ?? "session";
  const cookies = (req as Request & { cookies?: Record<string, string> }).cookies;
  const token = cookies?.[name];

  return verifySessionToken(token, cfg);
}

/* ============================================================================= */
/*                        REFRESH SESSION (SLIDING)                            */
/* ============================================================================= */

export async function refreshSessionCookie(req: Request, res: Response, cfg: SessionConfig) {
  const session = await getSessionFromRequest(req, cfg);
  if (!session) return null;

  await createSessionCookie(res, session.userId, session.role, cfg);
  return session;
}

/* ============================================================================= */
/*                              DELETE SESSION                                  */
/* ============================================================================= */

export function deleteSessionCookie(res: Response, cfg: SessionConfig) {
  const name = cfg.cookieName ?? "session";

  res.clearCookie(name, {
    path: "/",
    domain: cfg.domain,
  });
}
