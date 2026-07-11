import { z } from "zod";

export class ProjectValidator {
  static createProject = z.object({
    name: z
      .string()
      .trim()
      .min(3, "Project name must be at least 3 characters.")
      .max(100, "Project name cannot exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),

    isPrivate: z.boolean().optional(),
  });

  static updateProject = z.object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    isPrivate: z.boolean().optional(),
  });

  static searchProject = z.object({
    query: z
      .string()
      .trim()
      .min(1, "Search query is required.")
      .max(100),
  });
}