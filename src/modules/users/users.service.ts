import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserResponseDto } from './dtos/user-response.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<{ statusCode: number; message: string }> {
    const result = await this.userRepository.updateUser(id, data);

    if (!result.affected && result.affected === 0)
      throw new NotFoundException(`User with id: ${id} not found`);

    return { statusCode: 200, message: `User with id: ${id} updated` };
  }

  async deleteUser(
    id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const result = await this.userRepository.deleteUser(id);

    if (!result.affected && result.affected === 0)
      throw new NotFoundException(`User with id: ${id} not found`);

    return { statusCode: 200, message: `User with id: ${id} deleted` };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }
}
