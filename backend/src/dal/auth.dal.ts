import prisma from "@/lib/prisma";
import type { RegisterInput } from "@/schema/auth.schema";

/* ============================================================================= */
/*                             FIND USER BY EMAIL                               */
/* ============================================================================= */

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

/* ============================================================================= */
/*                              FIND USER BY ID                                 */
/* ============================================================================= */

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

/* ============================================================================= */
/*                               CREATE USER                                   */
/* ============================================================================= */

export async function createUser(data: RegisterInput) {
  return await prisma.user.create({
    data,
  });
}

/* ============================================================================= */
/*                           UPDATE USER PASSWORD                               */
/* ============================================================================= */

export async function updateUserPassword(userId: string, password: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
}
