import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';
import type { Response } from 'express';
import type { SignInDto } from './dto/login-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post('/signin')
  async signin(@Body() body: SignInDto, @Res() response: Response) {
    const { email, password } = body;
    const userFound: User | null = await this.userRepository.findByEmail(email);

    if (!userFound || userFound.password !== password) {
      response.status(401).json({ message: 'Email o password incorrectos' });
    }
  }
}
