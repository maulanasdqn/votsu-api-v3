import { ElectionsController } from "./elections.controller";
import { ElectionsService } from "./elections.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ElectionsController],
  providers: [ElectionsService],
})
export class ElectionsModule {}
