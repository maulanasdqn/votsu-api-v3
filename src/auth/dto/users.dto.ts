import { IsString } from 'class-validator';

export class UsersDto {
  id: number;

  fullname: string;

  student_id: string;

  grade: string;

  role_id: number;

  departement: string;
}
