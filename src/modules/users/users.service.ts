import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(page?: number, limit?: number): Promise<UserResponseDto[]> {
    return this.userRepository.getAllUsers(page, limit);
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    return this.userRepository.getUserById(id);
  }

  async createUser(user: CreateUserDto): Promise<string> {
    return this.userRepository.createUser(user);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User | null> {
    return this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<string> {
    return this.userRepository.deleteUser(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
