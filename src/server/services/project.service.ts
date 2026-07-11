import { ProjectRepository } from "../repositories/project.repository";

interface CreateProjectDTO {
  name: string;
  description?: string;
  isPrivate?: boolean;
  ownerId: string;
}

interface UpdateProjectDTO {
  name?: string;
  description?: string;
  isPrivate?: boolean;
}

export class ProjectService {
  static async createProject(data: CreateProjectDTO) {
    const project = await ProjectRepository.create(data);

    return {
      success: true,
      message: "Project created successfully",
      data: project,
    };
  }

  static async getProjects(ownerId: string) {
    const projects = await ProjectRepository.findByOwner(ownerId);

    return {
      success: true,
      data: projects,
    };
  }

  static async getProjectById(projectId: string) {
    const project = await ProjectRepository.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return {
      success: true,
      data: project,
    };
  }

  static async updateProject(
    projectId: string,
    data: UpdateProjectDTO
  ) {
    await this.getProjectById(projectId);

    const updatedProject = await ProjectRepository.update(
      projectId,
      data
    );

    return {
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    };
  }

  static async deleteProject(projectId: string) {
    await this.getProjectById(projectId);

    await ProjectRepository.delete(projectId);

    return {
      success: true,
      message: "Project deleted successfully",
    };
  }

  static async searchProjects(
    ownerId: string,
    query: string
  ) {
    const projects = await ProjectRepository.search(
      ownerId,
      query
    );

    return {
      success: true,
      data: projects,
    };
  }

  static async getRecentProjects(ownerId: string) {
    const projects = await ProjectRepository.getRecent(ownerId);

    return {
      success: true,
      data: projects,
    };
  }
}