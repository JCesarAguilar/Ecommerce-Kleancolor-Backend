import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/users.repository';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/roles.enum';
import { UserResponseDto } from '../users/dtos/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(newUserInfo: CreateUserDto): Promise<UserResponseDto> {
    const userFounded = await this.usersRepository.getUserByEmail(
      newUserInfo.email,
    );
    if (userFounded) throw new BadRequestException('Email already exist');

    const hashedPassword: string = await bcrypt.hash(newUserInfo.password, 10);
    if (!hashedPassword)
      throw new BadRequestException('password could not be hashed');

    const newUser = await this.usersRepository.createUser({
      ...newUserInfo,
      password: hashedPassword,
    });

    const { password: _password, role: _role, ...safeUser } = newUser;
    void _password;
    void _role;

    return safeUser;
  }

  async signIn(credentials: LoginUserDto): Promise<{ token: string }> {
    const userFounded = await this.usersRepository.getUserByEmail(
      credentials.email,
    );

    const invalid =
      !userFounded ||
      !(await bcrypt.compare(credentials.password, userFounded.password));
    if (invalid) throw new UnauthorizedException('Incorrect credentials');

    const role = userFounded.role?.includes(Role.ADMIN)
      ? Role.ADMIN
      : Role.USER;

    const payload = {
      sub: userFounded.id,
      id: userFounded.id,
      email: userFounded.email,
      role: role,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
