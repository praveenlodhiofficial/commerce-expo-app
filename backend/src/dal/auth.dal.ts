import prisma from "@/lib/prisma";
import { SignUp } from "@/schema/auth.schema";

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

export async function createUser(data: SignUp) {
  return await prisma.user.create({
    data,
  });
}
