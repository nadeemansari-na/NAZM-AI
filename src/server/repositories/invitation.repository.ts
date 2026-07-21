import  prisma  from "@/lib/prisma";
import { InvitationStatus } from "@/db/generated/prisma";

interface CreateInvitationDTO {
  email: string;
  projectId: string;
  invitedById: string;
}

export class InvitationRepository {
  static async create(data: CreateInvitationDTO) {
    return prisma.invitation.create({
      data,
    });
  }

  static async findById(invitationId: string) {
    return prisma.invitation.findUnique({
      where: {
        id: invitationId,
      },
      include: {
        project: true,
        invitedBy: true,
      },
    });
  }

  static async findPending(projectId: string) {
    return prisma.invitation.findMany({
      where: {
        projectId,
        status: InvitationStatus.PENDING,
      },
      include: {
        invitedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async findByEmail(email: string) {
    return prisma.invitation.findMany({
      where: {
        email,
      },
      include: {
        project: true,
        invitedBy: true,
      },
    });
  }

  static async updateStatus(
    invitationId: string,
    status: InvitationStatus
  ) {
    return prisma.invitation.update({
      where: {
        id: invitationId,
      },
      data: {
        status,
      },
    });
  }

  static async delete(invitationId: string) {
    return prisma.invitation.delete({
      where: {
        id: invitationId,
      },
    });
  }

  static async exists(projectId: string, email: string) {
    return prisma.invitation.findFirst({
      where: {
        projectId,
        email,
        status: InvitationStatus.PENDING,
      },
    });
  }
}