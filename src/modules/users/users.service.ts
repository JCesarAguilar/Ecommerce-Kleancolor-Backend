import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  getAllUsers(page?: number, limit?: number): UserResponseDto[] {
    return this.userRepository.getAllUsers(page, limit);
  }

  getUserById(id: number): UserResponseDto | null {
    return this.userRepository.getUserById(id);
  }

  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
