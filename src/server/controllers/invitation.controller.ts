import { NextRequest, NextResponse } from "next/server";
import { InvitationService } from "../services/invitation.service";
import { InvitationValidator } from "../validators/invitation.validator";

export class InvitationController {
  static async createInvitation(request: NextRequest) {
    try {
      const body = await request.json();

      const validatedData =
        InvitationValidator.createInvitation.parse(body);

      const invitation = await InvitationService.createInvitation(
        validatedData
      );

      return NextResponse.json(invitation, {
        status: 201,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }

  static async getInvitations(request: NextRequest) {
    try {
      const projectId =
        request.nextUrl.searchParams.get("projectId");

      if (!projectId) {
        throw new Error("Project ID is required.");
      }

      const invitations =
        await InvitationService.getInvitations(projectId);

      return NextResponse.json(invitations);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }

  static async getInvitationsByEmail(request: NextRequest) {
    try {
      const email =
        request.nextUrl.searchParams.get("email");

      if (!email) {
        throw new Error("Email is required.");
      }

      const invitations =
        await InvitationService.getInvitationsByEmail(email);

      return NextResponse.json(invitations);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }

  static async acceptInvitation(invitationId: string) {
    try {
      const invitation =
        await InvitationService.acceptInvitation(invitationId);

      return NextResponse.json(invitation);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }

  static async rejectInvitation(invitationId: string) {
    try {
      const invitation =
        await InvitationService.rejectInvitation(invitationId);

      return NextResponse.json(invitation);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }

  static async cancelInvitation(invitationId: string) {
    try {
      const result =
        await InvitationService.cancelInvitation(invitationId);

      return NextResponse.json(result);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}