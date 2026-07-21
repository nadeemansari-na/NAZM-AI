import { InvitationController } from "@/server/controllers/invitation.controller";
import { NextRequest } from "next/server";



export async function GET(request:NextRequest){
    const email=request.nextUrl.searchParams.get("email");

    if(email){
        return InvitationController.getInvitationsByEmail(request);
    }

    return InvitationController.getInvitations(request)
}

export async function POST(request:NextRequest){
    return InvitationController.createInvitation(request)
}