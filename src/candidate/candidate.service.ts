import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
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
    return candidate.map((x) => {
      return {
        id: x.id,
        fullname: x.fullname,
        grade: x.grade,
        department: x.departement,
        student_id: x.student_id,
        image: x.image,
        vision: x.vision,
        mission: x.mission,
        voted: x._count.Elections,
      };
    });
  }

  async getCandidateById(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            Elections: true,
          },
        },
      },
    });
    if (!candidate) throw new NotFoundException("Candidate Not Found.");
    const data = [];
    data.push(candidate);
    return data.map((x) => {
      return {
        id: x.id,
        fullname: x.fullname,
        grade: x.grade,
        department: x.departement,
        student_id: x.student_id,
        image: x.image,
        vision: x.vision,
        mission: x.mission,
        voted: x._count.Elections,
      };
    });
  }

  async updateCandidateById(dto: CandidateDto, id: number, userId: number) {
    const isCrew = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role_id: true,
      },
    });
    if (isCrew.role_id == 1)
      throw new UnauthorizedException(
        "Only Crew is Allowed to Edit Candidate."
      );
    const candidate = await this.prisma.candidate.update({
      where: {
        id,
      },
      data: {
        fullname: dto.fullname,
        departement: dto.departement,
        grade: dto.grade,
        image: dto.image,
      },
    });
    if (!candidate) throw new ForbiddenException("Access Denied.");
    return {
      data: {
        code: 201,
        message: "Success Update Candidate",
        candidate,
      },
    };
  }

  async createCandidate(dto: CandidateDto, userId: number) {
    const isCrew = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role_id: true,
      },
    });
    if (isCrew.role_id == 1)
      throw new UnauthorizedException(
        "Only Crew is Allowed to Create Candidate."
      );
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

    await this.prisma.candidate.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        student_id: dto.student_id,
        grade: dto.grade,
        departement: dto.departement,
      },
    });

    return {
      code: 200,
      message: "Success Create Candidate",
    };
  }
}
