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

/* -------------------------------------------------------------------------- */
/*                           UPDATE PASSWORD SCHEMA                            */
/* -------------------------------------------------------------------------- */

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters long"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
  })
  .strict();

export type UpdatePasswordInput = z.input<typeof UpdatePasswordSchema>;
export type UpdatePassword = z.output<typeof UpdatePasswordSchema>;
