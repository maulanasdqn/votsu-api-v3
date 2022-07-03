import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersDto } from '../dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: any) {
    return this.usersService.getUserById(parseInt(id));
  }

  @Post(':id')
  updateUserById(@Body() dto: UsersDto, @Param('id') id: any) {
    return this.usersService.updateUserById(dto, parseInt(id));
  }
}
