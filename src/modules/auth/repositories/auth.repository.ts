import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // plano por ahora
}

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      name: 'Julio Dev',
      email: 'julio@example.com',
      password: '123456', // plano por ahora
    },
    {
      id: 2,
      name: 'Ana Test',
      email: 'ana@example.com',
      password: 'test123',
    },
  ];

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
