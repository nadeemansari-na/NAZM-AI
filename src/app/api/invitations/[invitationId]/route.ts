import { NextRequest } from "next/server";
import { InvitationController } from "@/server/controllers/invitation.controller";

interface Props {
  params: Promise<{
    invitationId: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: Props
) {
  const { invitationId } = await params;

  const body = await request.json();

  if (body.action === "accept") {
    return InvitationController.acceptInvitation(invitationId);
  }

  if (body.action === "reject") {
    return InvitationController.rejectInvitation(invitationId);
  }

  throw new Error("Invalid action");
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  const { invitationId } = await params;

  return InvitationController.cancelInvitation(invitationId);
}