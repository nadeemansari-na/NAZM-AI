import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "../services/auth.service";
import { AuthValidator } from "../validators/auth.validator";

export class AuthController {
  static async register(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedData =
        AuthValidator.register.parse(body);
        console.log("body")
      const user = await AuthService.register(validatedData);
      return NextResponse.json(
        {
          success: true,
          message: "User registered successfully.",
          data: user,
        },
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }
  }

  static async forgotPassword(request: NextRequest) {
    try {
      const body = await request.json();

      const result = await AuthService.forgotPassword(body.email);

      return NextResponse.json({
        success: true,
        message: result,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }
  }

  static async resetPassword(request: NextRequest) {
    try {
      const body = await request.json();

      const result = await AuthService.resetPassword(
        body.token,
        body.password
      );

      return NextResponse.json({
        success: true,
        message: result,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }
  }
}