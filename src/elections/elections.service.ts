import { ForbiddenException, Injectable } from "@nestjs/common";
import { ElectionsDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ElectionsService {
  constructor(private prisma: PrismaService) {}

  async createElections(dto: ElectionsDto, id:number) {
    const checkUser = await this.prisma.elections.findUnique({
      where: {
        user_id: id,
      },
    });

    if (checkUser) {
      throw new ForbiddenException("You Already Voted!.");
    }

    const newElections = await this.prisma.elections.create({
      data: {
        user_id: id,
        candidate_id: dto.candidate_id,
      },
    });

    return newElections;
  }
}
