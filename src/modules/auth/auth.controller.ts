import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() newUserInfo: CreateUserDto) {
    return this.authService.signUp(newUserInfo);
  }

  @Post('/signin')
  @HttpCode(201)
  async signIn(@Body() Credentials: LoginUserDto) {
    return this.authService.signIn(Credentials);
  }
}
