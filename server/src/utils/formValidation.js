import { z } from "zod";

export const validateSignUpSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one upper case letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lower case letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export const validateLoginUserSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters long",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});