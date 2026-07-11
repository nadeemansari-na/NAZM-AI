import { NextRequest } from "next/server";
import { MemberController } from "@/server/controllers/memer.controller"

interface Props{
    params:Promise<{
        memberId:string;
    }>;
}

export async function PUT(
    request: NextRequest,
    {params} :Props
) {
    const {memberId} =await params
    return MemberController.updateRole(
        request,
        memberId
    );
}

export async function DELETE(
    request: NextRequest,
    {params}:Props
) {
    const {memberId }=await params
    return MemberController.removeMember(memberId)
}