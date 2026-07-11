import { MemberRole } from "@/db/generated/prisma/client";
import { z } from "zod";

export class MemberValidator {
  static addMember = z.object({
    projectId: z.string().cuid(),
    userId: z.string().cuid(),
    role: z.nativeEnum(MemberRole).optional(),
  });

  static updateRole = z.object({
    role: z.nativeEnum(MemberRole),
  });
}