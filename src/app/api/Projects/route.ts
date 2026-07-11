import { NextRequest } from "next/server";
import { ProjectController } from "@/server/controllers/project.controller";

export async function GET(request: NextRequest) {
  return ProjectController.getProjects(request);
}

export async function POST(request: NextRequest) {
  return ProjectController.createProject(request);
}