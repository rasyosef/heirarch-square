import z from "zod";

export const UserSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must have at least 6 characters")
})