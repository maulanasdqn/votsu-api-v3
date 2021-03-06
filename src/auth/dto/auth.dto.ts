import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  id: number;

  fullname: string;

  student_id: string;

  grade: string;

  role_id: number;

  departement: string;
}
