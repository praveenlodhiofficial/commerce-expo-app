import bcrypt from "bcrypt";

import { createUser, findUserByEmail, findUserById, updateUserPassword } from "@/dal/auth.dal";
import { revokeAllUserSessions } from "@/dal/session.dal";
import type { Login, Register, UpdatePassword } from "@/schema/auth.schema";
import { ApiError } from "@/utils/api-error";

/* ============================================================================= */
/*                               REGISTER SERVICE                               */
/* ============================================================================= */

export async function registerService(data: Register) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  // 4. Remove password before returning
  const { password, ...safeUser } = user;

  return safeUser;
}

/* ============================================================================= */
/*                                LOGIN SERVICE                                 */
/* ============================================================================= */

export async function loginService(data: Login) {
  const doesUserExist = await findUserByEmail(data.email);

  if (!doesUserExist) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(data.password, doesUserExist.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { password, ...safeUser } = doesUserExist;

  return safeUser;
}

/* ============================================================================= */
/*                           UPDATE PASSWORD SERVICE                             */
/* ============================================================================= */

export async function updatePasswordService(userId: string, payload: UpdatePassword) {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const currentPasswordValid = await bcrypt.compare(payload.currentPassword, user.password);
  if (!currentPasswordValid) {
    throw new ApiError(400, "Current password is incorrect");
  }

  const sameAsOld = await bcrypt.compare(payload.newPassword, user.password);
  if (sameAsOld) {
    throw new ApiError(400, "New password must be different from current password");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  await updateUserPassword(userId, hashedPassword);
  await revokeAllUserSessions(userId);

  return {
    success: true,
    message: "Password updated successfully. Please login again.",
  };
}
