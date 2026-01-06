import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRepository } from '../users/users.repository';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UserRepository) {}

  async signin({ email, password }: LoginUserDto) {
    if (!email || !password)
      throw new BadRequestException('Faltan credenciales');

    const userFound = await this.usersRepository.findByEmail(email);

    if (!userFound || userFound.password !== password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    return {
      message: 'Login exitoso',
      user: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
      },
    };
  }
}
