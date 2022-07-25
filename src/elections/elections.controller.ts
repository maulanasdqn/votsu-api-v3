import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { ElectionsDto } from "./dto";
import { ElectionsService } from "./elections.service";
import { getCurrentUserId } from 'src/common/decorators';

@Controller("elections")
export class ElectionsController {
  constructor(private electionsService: ElectionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createElections(@Body() dto: ElectionsDto, @getCurrentUserId() id: any) {
    return this.electionsService.createElections(dto, parseInt(id));
  }
}
