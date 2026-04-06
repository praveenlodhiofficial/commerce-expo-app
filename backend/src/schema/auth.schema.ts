import { z } from "zod";

import { UserSchema } from "@/schema/user.schema";

/* -------------------------------------------------------------------------- */
/*                               REGISTER SCHEMA                              */
/* -------------------------------------------------------------------------- */

export const RegisterSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
}).strict();

export type RegisterInput = z.input<typeof RegisterSchema>;
export type Register = z.output<typeof RegisterSchema>;

/* -------------------------------------------------------------------------- */
/*                               LOGIN SCHEMA                                 */
/* -------------------------------------------------------------------------- */

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export type LoginInput = z.input<typeof LoginSchema>;
export type Login = z.output<typeof LoginSchema>;
