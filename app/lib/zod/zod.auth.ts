import z from "zod";

export const zodLogin = z.object({
  email: z.email("Invalid email"),
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
});

export type loginSchema = z.output<typeof zodLogin>;
