import bcrypt from "bcrypt";
import type { SignIn, SignUp } from "@/schema/auth.schema";
import { createUser, findUserByEmail } from "@/dal/auth.dal";
import { ApiError } from "@/utils/api-error";

/* -------------------------------------------------------------------------- */
/*                               SIGN-UP SERVICE                              */
/* -------------------------------------------------------------------------- */

export async function signupService(data: SignUp) {
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

/* -------------------------------------------------------------------------- */
/*                               SIGN-IN SERVICE                              */
/* -------------------------------------------------------------------------- */

export async function signinService(data: SignIn) {
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