import { NextRequest, NextResponse } from "next/server";
import { MemberService } from "../services/member.service";
import { MemberValidator } from "../validators/member.validator";

export class MemberController {
  static async addMember(request: NextRequest) {
    try {
      const body = await request.json();

      const data = MemberValidator.addMember.parse(body);

      const member = await MemberService.addMember(data);

      return NextResponse.json(member, {
        status: 201,
      });
    } catch (error: any) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
  }

  static async getMembers(projectId: string) {
    const members = await MemberService.getMembers(projectId);

    return NextResponse.json(members);
  }

  static async updateRole(
    request: NextRequest,
    memberId: string
  ) {
    try {
      const body = await request.json();

      const { role } =
        MemberValidator.updateRole.parse(body);

      const member = await MemberService.updateRole(
        memberId,
        role
      );

      return NextResponse.json(member);
    } catch (error: any) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
  }

  static async removeMember(memberId: string) {
    await MemberService.removeMember(memberId);

    return NextResponse.json({
      success: true,
    });
  }
}