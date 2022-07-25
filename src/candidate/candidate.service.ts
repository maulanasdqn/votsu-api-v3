import { ForbiddenException, Injectable } from "@nestjs/common";
import { CandidateDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async getCandidate() {
    const candidate = await this.prisma.candidate.findMany({
      include: {
        _count: {
          select: { Elections: true },
        },
      },
    });
    if (!candidate) throw new ForbiddenException("Access Denied.");
    if (!candidate) throw new ForbiddenException("Access Denied.");
    return candidate;
  }

  async getCandidateById(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: {
        id,
      },
    });
    if (!candidate) throw new ForbiddenException("Access Denied.");
    return candidate;
  }

  async updateCandidateById(dto: CandidateDto, id: number) {
    const candidate = await this.prisma.candidate.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        student_id: dto.student_id,
        fullname: dto.fullname,
        departement: dto.departement,
        grade: dto.grade,
      },
    });
    if (!candidate) throw new ForbiddenException("Access Denied.");
    return candidate;
  }

  async createCandidate(dto: CandidateDto) {
    const candidateEmail = await this.prisma.candidate.findUnique({
      where: {
        email: dto.email,
      },
    });

    const candidateStudentId = await this.prisma.candidate.findUnique({
      where: {
        student_id: dto.student_id,
      },
    });

    if (candidateStudentId && candidateEmail) {
      throw new ForbiddenException("Email and Student Id Already Exist.");
    } else if (candidateEmail) {
      throw new ForbiddenException("Email Already Exist.");
    } else if (candidateStudentId) {
      throw new ForbiddenException("Student Id Already Exist.");
    }

    const newCandidate = await this.prisma.candidate.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        student_id: dto.student_id,
        grade: dto.grade,
        departement: dto.departement,
      },
    });

    return newCandidate;
  }
}
