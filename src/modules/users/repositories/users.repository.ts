import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'julio@mail.com',
      name: 'Julio',
      password: '1234',
      address: 'Calle 1',
      phone: '123456',
      country: 'Colombia',
      city: 'Bogotá',
    },
    {
      id: 2,
      email: 'ana@mail.com',
      name: 'Ana',
      password: 'abcd',
      address: 'Calle 2',
      phone: '987654',
    },
  ];

  findAll(): User[] {
    return this.users;
  }
}
