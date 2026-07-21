import { z } from "zod";

export class InvitationValidator {
  static createInvitation = z.object({
    email: z
      .string()
      .trim()
      .email("Invalid email address."),

    projectId: z
      .string()
      .cuid("Invalid project ID."),

    invitedById: z
      .string()
      .cuid("Invalid user ID."),
  });

  static updateInvitation = z.object({
    action: z.enum(["accept", "reject"]),
  });

  static getInvitations = z.object({
    projectId: z
      .string()
      .cuid("Invalid project ID."),
  });

  static getInvitationsByEmail = z.object({
    email: z
      .string()
      .trim()
      .email("Invalid email address."),
  });

  static deleteInvitation = z.object({
    invitationId: z
      .string()
      .cuid("Invalid invitation ID."),
  });
}