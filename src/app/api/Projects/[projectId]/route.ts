import { NextRequest } from "next/server";
import { ProjectController } from "@/server/controllers/project.controller";

interface Params {
  params: Promise<{
    projectId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { projectId } = await params;
  return ProjectController.getProject(request, projectId);
}

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  const { projectId } = await params;
  return ProjectController.updateProject(request, projectId);
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  const { projectId } = await params;
  return ProjectController.deleteProject(request, projectId);
}