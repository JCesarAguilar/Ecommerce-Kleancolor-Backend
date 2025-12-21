import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository {
  private users: User[] = [
    {
      id: '1A',
      email: 'julio@mail.com',
      name: 'Julio',
      password: '1234',
      address: 'Calle 1',
      phone: 123456,
      country: 'Colombia',
      city: 'Bogotá',
    },
    {
      id: '2A',
      email: 'ana@mail.com',
      name: 'Ana',
      password: 'abcd',
      address: 'Calle 2',
      phone: 987654,
      country: 'Peru',
      city: 'lima',
    },
    {
      id: '3A',
      email: 'julio@mail.com',
      name: 'Julio',
      password: '1234',
      address: 'Calle 1',
      phone: 987654,
      country: 'Peru',
      city: 'lima',
    },
    {
      id: '4A',
      email: 'ana@mail.com',
      name: 'Ana',
      password: 'abcd',
      address: 'Calle 2',
      phone: 987654,
      country: 'Peru',
      city: 'lima',
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

  getUserById(id: string): UserResponseDto | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;

    const { id: userId, name, email, phone, address, country, city } = user;
    return { id: userId, name, email, phone, address, country, city };
  }

  createUser(user: CreateUserDto): string {
    const id = uuid();

    const newUser: User = {
      id,
      ...user,
    };

    this.users = [...this.users, newUser];
    return id;
  }

  updateUser(id: string, data: UpdateUserDto): string | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    this.users[index] = { ...this.users[index], ...data };
    return id;
  }

  deleteUser(id: string): string | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    this.users.splice(index, 1);
    return id;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
