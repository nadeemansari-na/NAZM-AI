import { MemberRole } from "@/db/generated/prisma/client";
import { MemberRepository } from "../repositories/member.repository";

export class MemberService {
  static async addMember(data: {
    projectId: string;
    userId: string;
    role?: MemberRole;
  }) {
    const existing = await MemberRepository.findMember(
      data.projectId,
      data.userId
    );

    if (existing) {
      throw new Error("User is already a member.");
    }

    return MemberRepository.addMember(data);
  }

  static async getMembers(projectId: string) {
    return MemberRepository.findByProject(projectId);
  }

  static async updateRole(
    memberId: string,
    role: MemberRole
  ) {
    return MemberRepository.updateRole(memberId, role);
  }

  static async removeMember(memberId: string) {
    return MemberRepository.removeMember(memberId);
  }
}