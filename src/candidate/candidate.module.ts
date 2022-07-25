import { CandidateController } from "./candidate.controller";
import { CandidateService } from "./candidate.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
