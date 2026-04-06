import prisma from "@/lib/prisma";
import { RegisterInput } from "@/schema/auth.schema";

/* -------------------------------------------------------------------------- */
/*                             FIND USER BY EMAIL                             */
/* -------------------------------------------------------------------------- */

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                             CREATE USER                                    */
/* -------------------------------------------------------------------------- */

export async function createUser(data: RegisterInput) {
  return await prisma.user.create({
    data,
  });
}
