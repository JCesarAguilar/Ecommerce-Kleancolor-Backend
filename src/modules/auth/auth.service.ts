import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRepository } from '../users/repositories/users.repository';
import { SignInDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UserRepository) {}

  signin({ email, password }: SignInDto) {
    if (!email || !password) {
      throw new BadRequestException('Faltan credenciales');
    }

    const user = this.usersRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    return {
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
