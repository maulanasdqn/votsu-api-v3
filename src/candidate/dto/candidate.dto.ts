import { IsNotEmpty, IsString } from 'class-validator';

export class CandidateDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  id: number;

  fullname: string;

  student_id: string;

  grade: string;

  departement: string;
}
