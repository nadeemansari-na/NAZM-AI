import { InvitationStatus } from "@/db/generated/prisma"; 
import { InvitationRepository } from "../repositories/invitation.repository";

interface CreateInvitationDTO {
  email: string;
  projectId: string;
  invitedById: string;
}

export class InvitationService {
   static async createInvitation(data: CreateInvitationDTO) {
    const existing = await InvitationRepository.exists(
      data.projectId,
      data.email
    );

    if (existing) {
      throw new Error("Invitation already sent.");
    }

    const invitation = await InvitationRepository.create(data);

    return {
      success: true,
      message: "Invitation sent successfully.",
      data: invitation,
    };
  }

  static async getInvitations(projectId: string) {
    const invitations = await InvitationRepository.findPending(projectId);

    return {
      success: true,
      data: invitations,
    };
  }

  static async getInvitationsByEmail(email: string) {
    const invitations = await InvitationRepository.findByEmail(email);

    return {
      success: true,
      data: invitations,
    };
  }

  static async acceptInvitation(invitationId: string) {
    const invitation = await InvitationRepository.findById(invitationId);

    if (!invitation) {
      throw new Error("Invitation not found.");
    }

    if (invitation.status !== InvitationStatus.PENDING) {
      throw new Error("Invitation already processed.");
    }

    const updated = await InvitationRepository.updateStatus(
      invitationId,
      InvitationStatus.ACCEPTED
    );

    return {
      success: true,
      message: "Invitation accepted.",
      data: updated,
    };
  }

  static async rejectInvitation(invitationId: string) {
    const invitation = await InvitationRepository.findById(invitationId);

    if (!invitation) {
      throw new Error("Invitation not found.");
    }

    if (invitation.status !== InvitationStatus.PENDING) {
      throw new Error("Invitation already processed.");
    }

    const updated = await InvitationRepository.updateStatus(
      invitationId,
      InvitationStatus.REJECTED
    );

    return {
      success: true,
      message: "Invitation rejected.",
      data: updated,
    };
  }

  static async cancelInvitation(invitationId: string) {
    await InvitationRepository.delete(invitationId);

    return {
      success: true,
      message: "Invitation cancelled successfully.",
    };
  }
}