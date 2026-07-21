import { NextRequest, NextResponse } from "next/server";
import { Next_Auth } from "@/lib/auth";
import NextAuth from "next-auth";
import { ProjectService } from "../services/project.service";
import { ProjectValidator } from "../validators/project.validator";

export class ProjectController {
  static async createProject(request: NextRequest) {
    try {
      const session = await NextAuth(Next_Auth);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const body = await request.json();

      const validatedData =
        ProjectValidator.createProject.parse(body);
      console.log("project body:",body)
      const project = await ProjectService.createProject({
        ...validatedData,
        ownerId: session.user.id,
      });

      return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
  }

  static async getProjects(request: NextRequest) {
    try {
      const session = await NextAuth(Next_Auth);
      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const projects = await ProjectService.getProjects(
        session.user.id
      );

      return NextResponse.json(projects);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }

  static async getProject(
    request: NextRequest,
    projectId: string
  ) {
    try {
      const project = await ProjectService.getProjectById(projectId);

      return NextResponse.json(project);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 404 }
      );
    }
  }

  static async updateProject(
    request: NextRequest,
    projectId: string
  ) {
    try {
      const body = await request.json();

      const validatedData =
        ProjectValidator.updateProject.parse(body);

      const project = await ProjectService.updateProject(
        projectId,
        validatedData
      );

      return NextResponse.json(project);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
  }

  static async deleteProject(
    request: NextRequest,
    projectId: string
  ) {
    try {
      await ProjectService.deleteProject(projectId);

      return NextResponse.json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
  }

  static async searchProjects(request: NextRequest) {
    try {
      const session = await NextAuth(Next_Auth);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const { searchParams } = new URL(request.url);

      const validatedQuery =
        ProjectValidator.searchProject.parse({
          query: searchParams.get("query"),
        });

      const projects = await ProjectService.searchProjects(
        session.user.id,
        validatedQuery.query
      );

      return NextResponse.json(projects);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }

  static async getRecentProjects(request: NextRequest) {
    try {
      const session = await NextAuth(Next_Auth);

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const projects = await ProjectService.getRecentProjects(
        session.user.id
      );

      return NextResponse.json(projects);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }
}