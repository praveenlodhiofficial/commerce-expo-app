import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
