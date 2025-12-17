import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(): User[] {
    return this.userRepository.findAll();
  }
}
