import { ForbiddenException, Injectable } from "@nestjs/common";
import { UsersDto } from "../dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const user = await this.prisma.user.findMany({
      include: {
        Elections: {
          select: {
            candidate: true,
          },
        },
      },
    });
    if (!user) throw new ForbiddenException("Access Denied.");
    return user;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Elections: {
          select: {
            candidate: true,
          },
        },
      },
    });
    if (!user) throw new ForbiddenException("Access Denied.");
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new ForbiddenException("Access Denied.");
    return user;
  }

  async updateUserById(dto: UsersDto, id: number) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        fullname: dto.fullname,
        departement: dto.departement,
        grade: dto.grade,
      },
    });
    if (!user) throw new ForbiddenException("Access Denied.");
    return user;
  }
}
