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
import { Public } from "src/common/decorators";
import { getCurrentUserId } from "src/common/decorators";

@Controller("candidate")
export class CandidateController {
  constructor(private candidateService: CandidateService) {}

  @Public()
  @Get()
  getCandidate() {
    return this.candidateService.getCandidate();
  }

  @Public()
  @Get(":id")
  getCandidateById(@Param("id") id: any) {
    return this.candidateService.getCandidateById(parseInt(id));
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  updateCandidateById(
    @Body() dto: CandidateDto,
    @Param("id") id: any,
    @getCurrentUserId() userId: any
  ) {
    return this.candidateService.updateCandidateById(
      dto,
      parseInt(id),
      parseInt(userId)
    );
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  createCandidate(@Body() dto: CandidateDto, @getCurrentUserId() id: any) {
    return this.candidateService.createCandidate(dto, parseInt(id));
  }
}
