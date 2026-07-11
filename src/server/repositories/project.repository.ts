import prisma from "@/lib/prisma";

export class ProjectRepository {
  static async create(data: {
    name: string;
    description?: string;
    ownerId: string;
  }) {
    return prisma.project.create({
      data,
    });
  }

  static async findById(projectId: string) {
    return prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        owner: true,
        members: true,
        files: true,
      },
    });
  }

  static async findByOwner(ownerId: string) {
    return prisma.project.findMany({
      where: {
        ownerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async update(
    projectId: string,
    data: {
      name?: string;
      description?: string;
      isPrivate?: boolean;
    }
  ) {
    return prisma.project.update({
      where: {
        id: projectId,
      },
      data,
    });
  }

  static async delete(projectId: string) {
    return prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  }

  static async search(ownerId: string, query: string) {
    return prisma.project.findMany({
      where: {
        ownerId,
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  static async getRecent(ownerId: string) {
    return prisma.project.findMany({
      where: {
        ownerId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });
  }
}