import { NextRequest } from "next/server";
import { MemberController } from "@/server/controllers/member.controller";

export async function GET(request: NextRequest) {
  const projectId =
    request.nextUrl.searchParams.get("projectId")!;

  return MemberController.getMembers(projectId);
}

export async function POST(request: NextRequest) {
  return MemberController.addMember(request);
}