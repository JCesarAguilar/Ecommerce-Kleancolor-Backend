import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  getAllUsers(): UserResponseDto[] {
    return this.userRepository.getAllUsers();
  }

  getUserById(id: number): UserResponseDto | null {
    return this.userRepository.getById(id);
  }

  createUser(user: Omit<User, 'id'>) {
    return this.userRepository.createUser(user);
  }

  updateUser(id: number, user: Partial<User>) {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
