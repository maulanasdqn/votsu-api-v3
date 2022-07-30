import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { UsersDto } from "../dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(id: number) {
    try {
      const isCrew = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          role_id: true,
        },
      });
      if (isCrew.role_id == 1)
        throw new UnauthorizedException(
          "Only Crew is Allowed to Get All Users."
        );
      const user = await this.prisma.user.findMany({
        take: 25,
        include: {
          Elections: {
            select: {
              candidate: true,
            },
          },
        },
      });
      if (!user) throw new ForbiddenException("Access Denied.");
      user.map((x) => {
        return {
          id: x.id,
          fullname: x.fullname,
          email: x.email,
          grade: x.grade,
          departement: x.departement,
          role: x.role_id,
          is_chosen: x.is_chosen,
          candidate: x.Elections.map((x) => x.candidate)[0] || {},
        };
      });
      return user
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  }

  async getUserById(id: number, userId: number) {
    try {
      const isCrew = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          role_id: true,
        },
      });

      if (isCrew.role_id == 1)
        throw new UnauthorizedException("Only Crew is Allowed to Show Users.");

      const isUserAvaible = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!isUserAvaible) {
        throw new NotFoundException("User Not Found");
      }

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
      if (!user) throw new NotFoundException("User Not Found.");
      const data = [];
      data.push(user);
      return data.map((x) => {
        return {
          id: x.id,
          fullname: x.fullname,
          email: x.email,
          grade: x.grade,
          departement: x.departement,
          role: x.role_id,
          is_chosen: x.is_chosen,
          candidate: x.Elections.map((x: any) => x.candidate)[0] || {},
        };
      });
    } catch (err: any) {
      throw new NotFoundException(err);
    }
  }

  async getUserByMe(id: number) {
    try {
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
      const data = [];
      data.push(user);
      return data.map((x) => {
        return {
          id: x.id,
          fullname: x.fullname,
          email: x.email,
          grade: x.grade,
          departement: x.departement,
          role: x.role_id,
          is_chosen: x.is_chosen,
          candidate: x.Elections.map((x: any) => x.candidate)[0] || {},
        };
      });
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateUserById(dto: UsersDto, id: number, userId: number) {
    try {
      const isCrew = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          role_id: true,
        },
      });
      if (isCrew.role_id == 1)
        throw new UnauthorizedException("Only Crew is Allowed to Edit Users.");
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

      const isUserAvaible = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!isUserAvaible) {
        throw new NotFoundException("User Not Found");
      }

      if (!user) throw new ForbiddenException("Access Denied.");

      return {
        code: 200,
        message: "Success Update User Data",
      };
    } catch (err: any) {
      throw new NotFoundException(err);
    }
  }

  async updateUserByMe(dto: UsersDto, id: number) {
    try {
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
      return {
        code: 201,
        message: "Success Update User",
      };
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteUser(id: number, userId: number) {
    try {
      const isUserAvailable = this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      const isCrew = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          role_id: true,
        },
      });

      const isCrewCanBeDeleted = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          role_id: true,
        },
      });

      if (!isUserAvailable) throw new NotFoundException("User Not Found");

      if (isCrew.role_id == 1)
        throw new ForbiddenException("Only Crew can Delete Users!.");

      if (isCrewCanBeDeleted.role_id == 2)
        throw new ForbiddenException("Crew Cant be Deleted!.");

      await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return {
        message: "Success Delete",
      };
    } catch (err: any) {
      throw new NotFoundException(err);
    }
  }
}
