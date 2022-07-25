import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { RtGuard } from "src/common/guards";
import {
  getCurrentUser,
  getCurrentUserId,
  Public,
} from "src/common/decorators";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("local/register")
  @HttpCode(HttpStatus.CREATED)
  registerLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.registerLocal(dto);
  }

  @Public()
  @Post("local/login")
  @HttpCode(HttpStatus.OK)
  loginLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.loginLocal(dto);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@getCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @getCurrentUser("refreshToken") refreshToken: string,
    @getCurrentUserId() userId: number
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
