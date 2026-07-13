import { AuthRepository } from "../repositories/auth.repository";
import { hashPassword } from "@/lib/bcrypt";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  static async register(data: RegisterDTO) {
    const existingUser = await AuthRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await AuthRepository.create({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static async forgotPassword(email: string) {
    const user = await AuthRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    return "Password reset functionality will be implemented.";
  }

  static async resetPassword(
    token: string,
    password: string
  ) {
    return "Password reset functionality will be implemented.";
  }
}