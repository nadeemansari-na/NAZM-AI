import  prisma  from "@/lib/prisma";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class AuthRepository {
  static async findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async create(data: CreateUserDTO) {
    return prisma.user.create({
      data,
    });
  }

  static async updatePassword(
    userId: string,
    password: string
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  static async delete(userId: string) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}