import  prisma  from "@/lib/prisma";
import { MemberRole } from "@/db/generated/prisma/client";

export class MemberRepository {
  static async addMember(data: {
    projectId: string;
    userId: string;
    role?: MemberRole;
  }) {
    return prisma.projectMember.create({
      data: {
        projectId: data.projectId,
        userId: data.userId,
        role: data.role ?? MemberRole.MEMBER,
      },
    });
  }

  static async findByProject(projectId: string) {
    return prisma.projectMember.findMany({
      where: { projectId },
      include: {
        user: true,
      },
    });
  }

  static async findById(memberId: string) {
    return prisma.projectMember.findUnique({
      where: { id: memberId },
      include: {
        user: true,
        project: true,
      },
    });
  }

  static async findMember(projectId: string, userId: string) {
    return prisma.projectMember.findFirst({
      where: {
        projectId,
        userId,
      },
    });
  }

  static async updateRole(
    memberId: string,
    role: MemberRole
  ) {
    return prisma.projectMember.update({
      where: { id: memberId },
      data: { role },
    });
  }

  static async removeMember(memberId: string) {
    return prisma.projectMember.delete({
      where: {
        id: memberId,
      },
    });
  }
}