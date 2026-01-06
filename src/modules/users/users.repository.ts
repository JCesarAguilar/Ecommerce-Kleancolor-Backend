import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAllUsers(page = 1, limit = 5): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'name', 'email', 'phone', 'address', 'country', 'city'],
    });

    return users.map(({ id, name, email, phone, address, country, city }) => ({
      id,
      name,
      email,
      phone,
      address,
      country,
      city,
    }));
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    const userFounded = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
      select: ['id', 'name', 'email', 'phone', 'address', 'country', 'city'],
    });

    if (!userFounded) return null;

    return {
      id: userFounded.id,
      name: userFounded.name,
      email: userFounded.email,
      phone: userFounded.phone ?? undefined,
      address: userFounded.address ?? undefined,
      country: userFounded.country ?? undefined,
      city: userFounded.city ?? undefined,
      orders: userFounded.orders?.map((order) => ({
        id: order.id,
        date: order.date,
      })),
    };
  }

  async createUser(user: CreateUserDto): Promise<string> {
    const newUser = this.usersRepository.create({
      id: uuid(),
      ...user,
    });
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser.id;
  }

  async updateUser(id: string, data: CreateUserDto): Promise<User | null> {
    await this.usersRepository.update(id, data);
    return this.usersRepository.findOneBy({ id });
  }

  async deleteUser(id: string): Promise<string> {
    const result = await this.usersRepository.delete(id);
    return result.affected
      ? `User with id ${id} deleted.`
      : `User with id ${id} not found.`;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
