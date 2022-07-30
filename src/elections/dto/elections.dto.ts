import { IsNotEmpty, IsNumber } from "class-validator";

export class ElectionsDto {
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  candidate_id: number;
}
