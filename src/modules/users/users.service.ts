import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(page?: number, limit?: number): Promise<UserResponseDto[]> {
    return this.userRepository.getAllUsers(page, limit);
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException('User not Found');
    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    try {
      const userFounded = await this.userRepository.findByEmail(user.email);
      if (userFounded) {
        throw new ConflictException({
          message: 'Email is already exist',
          error: 'Conflict',
        });
      }

      const newUser = await this.userRepository.createUser(user);
      const { password, ...userWithOutPassword } = newUser;
      return userWithOutPassword;
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      const message =
        error instanceof Error ? error.message : 'Error creating user';
      throw new InternalServerErrorException(message);
    }
  }

  async updateUser(id: string, user: CreateUserDto): Promise<User | null> {
    return this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<string> {
    return this.userRepository.deleteUser(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
