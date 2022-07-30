import { ForbiddenException, Injectable } from "@nestjs/common";
import { ElectionsDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ElectionsService {
  constructor(private prisma: PrismaService) {}

  async createElections(dto: ElectionsDto, id: number) {
    try {
      const checkUser = await this.prisma.elections.findUnique({
        where: {
          user_id: id,
        },
      });

      const checkIsCrew = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          role_id: true,
        },
      });

      const checkIsCandidateFound = await this.prisma.candidate.findUnique({
        where: {
          id: dto.candidate_id,
        },
      });

      if (!checkIsCandidateFound) {
        throw new ForbiddenException("Candidate Not Found!.");
      }

      if (checkIsCrew.role_id == 2) {
        throw new ForbiddenException("Crew is Not Allowed To Voted!.");
      }

      if (checkUser) {
        throw new ForbiddenException("You Already Voted!.");
      }

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          is_chosen: true,
        },
      });

      await this.prisma.elections.create({
        data: {
          user_id: id,
          candidate_id: dto.candidate_id,
        },
      });

      return {
        code: 201,
        message: "Success Vote Candidate",
      };
    } catch (err: any) {
      throw new ForbiddenException(err);
    }
  }
}
