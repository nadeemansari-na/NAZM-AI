import { NextRequest } from "next/server";
import { ProjectController } from "@/server/controllers/project.controller";

export async function GET(request: NextRequest) {
  return ProjectController.getRecentProjects(request);
}