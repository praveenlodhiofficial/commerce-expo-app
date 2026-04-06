import prisma from "@/lib/prisma";

/* ============================================================================= */
/*                            CREATE REFRESH SESSION                            */
/* ============================================================================= */

export async function createRefreshSession(userId: string, token: string, expiresAt: Date) {
  return prisma.refreshSession.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
}

/* ============================================================================= */
/*                             FIND REFRESH SESSION                             */
/* ============================================================================= */

export async function findRefreshSession(token: string) {
  return prisma.refreshSession.findUnique({
    where: { token },
    include: { user: true },
  });
}

/* ============================================================================= */
/*                            REVOKE REFRESH SESSION                            */
/* ============================================================================= */

export async function revokeRefreshSession(sessionId: string) {
  return prisma.refreshSession.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() },
  });
}

/* ============================================================================= */
/*                            REVOKE ALL USER SESSIONS                          */
/* ============================================================================= */

export async function revokeAllUserSessions(userId: string) {
  return prisma.refreshSession.updateMany({
    where: { userId },
    data: { revokedAt: new Date() },
  });
}
