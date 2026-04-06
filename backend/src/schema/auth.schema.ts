import { z } from "zod";

import { UserSchema } from "@/schema/user.schema";

/* -------------------------------------------------------------------------- */
/*                               SIGN-UP SCHEMA                               */
/* -------------------------------------------------------------------------- */

export const SignUpSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

export type SignUpInput = z.input<typeof SignUpSchema>;
export type SignUp = z.output<typeof SignUpSchema>;

/* -------------------------------------------------------------------------- */
/*                               SIGN-IN SCHEMA                               */
/* -------------------------------------------------------------------------- */

export const SignInSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type SignInInput = z.input<typeof SignInSchema>;
export type SignIn = z.output<typeof SignInSchema>;