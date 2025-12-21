import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

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
    {
      id: 3,
      email: 'julio@mail.com',
      name: 'Julio',
      password: '1234',
      address: 'Calle 1',
      phone: '123456',
      country: 'Colombia',
      city: 'Bogotá',
    },
    {
      id: 4,
      email: 'ana@mail.com',
      name: 'Ana',
      password: 'abcd',
      address: 'Calle 2',
      phone: '987654',
    },
    {
      id: 5,
      email: 'julio@mail.com',
      name: 'Julio',
      password: '1234',
      address: 'Calle 1',
      phone: '123456',
      country: 'Colombia',
      city: 'Bogotá',
    },
    {
      id: 6,
      email: 'ana@mail.com',
      name: 'Ana',
      password: 'abcd',
      address: 'Calle 2',
      phone: '987654',
    },
    {
      id: 7,
      email: 'julio@mail.com',
      name: 'Julio',
      password: '1234',
      address: 'Calle 1',
      phone: '123456',
      country: 'Colombia',
      city: 'Bogotá',
    },
    {
      id: 8,
      email: 'ana@mail.com',
      name: 'Ana',
      password: 'abcd',
      address: 'Calle 2',
      phone: '987654',
    },
  ];

  getAllUsers(page = 1, limit = 5): UserResponseDto[] {
    const start = (page - 1) * limit;
    const end = start + limit;

    return this.users
      .map(({ id, name, email, phone, address, country, city }) => ({
        id,
        name,
        email,
        phone,
        address,
        country,
        city,
      }))
      .slice(start, end);
  }

  getUserById(id: number): UserResponseDto | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;

    const { id: userId, name, email, phone, address, country, city } = user;
    return { id: userId, name, email, phone, address, country, city };
  }

  createUser(user: CreateUserDto): number {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return id;
  }

  updateUser(id: number, data: UpdateUserDto): number | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    this.users[index] = { ...this.users[index], ...data };
    return id;
  }

  deleteUser(id: number): number | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    this.users.splice(index, 1);
    return id;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
