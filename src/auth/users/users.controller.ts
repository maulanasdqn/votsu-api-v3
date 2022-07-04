import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersDto } from '../dto';
import { UsersService } from './users.service';
import { getCurrentUserId } from 'src/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('me')
  getUserById(@getCurrentUserId() id: any) {
    return this.usersService.getUserById(parseInt(id));
  }

  @Get('email/:email')
  getUserByEmail(@Param('email') email: any) {
    return this.usersService.getUserByEmail(email);
  }

  @Post(':id')
  updateUserById(@Body() dto: UsersDto, @Param('id') id: any) {
    return this.usersService.updateUserById(dto, parseInt(id));
  }
}
