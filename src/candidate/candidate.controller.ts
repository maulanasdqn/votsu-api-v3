import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CandidateDto } from "./dto";
import { CandidateService } from "./candidate.service";

@Controller("candidate")
export class CandidateController {
  constructor(private candidateService: CandidateService) {}

  @Get()
  getCandidate() {
    return this.candidateService.getCandidate();
  }

  @Get(":id")
  getCandidateById(@Param("id") id: any) {
    return this.candidateService.getCandidateById(parseInt(id));
  }

  @Put(":id")
  updateCandidateById(@Body() dto: CandidateDto, @Param("id") id: any) {
    return this.candidateService.updateCandidateById(dto, parseInt(id));
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createCandidate(@Body() dto: CandidateDto) {
    return this.candidateService.createCandidate(dto);
  }
}
