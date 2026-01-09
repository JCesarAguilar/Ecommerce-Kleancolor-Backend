import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/users.repository';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserResponseDto } from '../users/dtos/user-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(newUserInfo: CreateUserDto): Promise<UserResponseDto> {
    const userExist = await this.usersRepository.getUserByEmail(
      newUserInfo.email,
    );
    if (userExist) throw new BadRequestException('Email already exist');

    const hashedPassword: string = await bcrypt.hash(newUserInfo.password, 10);
    if (!hashedPassword)
      throw new BadRequestException('password could not be hashed');

    const newUser = await this.usersRepository.createUser({
      ...newUserInfo,
      password: hashedPassword,
    });
    const { password, ...userWithOutPassword } = newUser;
    return userWithOutPassword;
  }

  async signIn(credentials: LoginUserDto) {
    const userExist = await this.usersRepository.getUserByEmail(
      credentials.email,
    );

    const invalid =
      !userExist ||
      !(await bcrypt.compare(credentials.password, userExist.password));
    if (invalid) throw new UnauthorizedException('Incorrect credentials');

    const userPayload = {
      sub: userExist.id,
      id: userExist.id,
      email: userExist.email,
    };

    const token = this.jwtService.sign(userPayload);

    return { token };
  }
}
