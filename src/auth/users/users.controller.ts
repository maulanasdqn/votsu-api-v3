import { Body, Controller, Get, Param, Put, Delete } from "@nestjs/common";
import { UsersDto } from "../dto";
import { UsersService } from "./users.service";
import { getCurrentUserId } from "src/common/decorators";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@getCurrentUserId() id: any) {
    return this.usersService.getUsers(parseInt(id));
  }

  @Get("me")
  getUserByMe(@getCurrentUserId() id: any) {
    return this.usersService.getUserByMe(parseInt(id));
  }

  @Get(":id")
  getUserById(@getCurrentUserId() userId: any, @Param("id") id: any) {
    return this.usersService.getUserById(parseInt(id), parseInt(userId));
  }

  @Put("update/:id")
  updateUserById(
    @Body() dto: UsersDto,
    @Param("id") id: any,
    @getCurrentUserId() userId: any
  ) {
    return this.usersService.updateUserById(
      dto,
      parseInt(id),
      parseInt(userId)
    );
  }

  @Put("me")
  updateUserByMe(@Body() dto: UsersDto, @getCurrentUserId() id: any) {
    return this.usersService.updateUserByMe(dto, parseInt(id));
  }

  @Delete(":id")
  deleteUser(@Param("id") id: any, @getCurrentUserId() userId:any) {
    return this.usersService.deleteUser(parseInt(id), parseInt(userId));
  }
}
