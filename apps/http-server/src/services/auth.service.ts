import { PrismaClient, User } from "@prisma/client";
import { getJWT, getPasswordHash, validatePassword } from "../utils/auth.utils";

const prisma = new PrismaClient();

export class AuthService {

  static async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const hashedPassword = await getPasswordHash(data.password);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      },
    });

    const token = await getJWT(user.id, user.email);

    return { user, token };
  }

  static async login(data: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isValidPassword = await validatePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const token = await getJWT(user.id, user.email);

    return { user, token };
  }
}
