import { z } from "zod";

export class AuthValidator {
  static register = z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters.")
      .max(50),

    email: z
      .string()
      .trim()
      .email("Invalid email address."),

    password: z
        .string()
        .min(8,"Password must be at least 8 character")
        .max(50),
  });

  static login = z.object({
    email: z
      .string()
      .trim()
      .email("Invalid email address."),

    password: z
      .string()
      .min(8),
  });

  static forgotPassword = z.object({
    email: z
      .string()
      .trim()
      .email("Invalid email address."),
  });

  static resetPassword = z.object({
    token: z.string(),

    password: z
      .string()
      .min(8)
      .max(50),
  });
}