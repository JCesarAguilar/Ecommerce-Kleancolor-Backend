import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { UpdateResult } from 'typeorm/browser';
import { UpdateUserDto } from './dtos/update-user.dto';

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
      select: [
        'id',
        'name',
        'email',
        'phone',
        'address',
        'country',
        'city',
        'role',
      ],
    });

    return users.map(
      ({ id, name, email, phone, address, country, city, role }) => ({
        id,
        name,
        email,
        phone,
        address,
        country,
        city,
        role,
      }),
    );
  }

  async getUserById(id: string): Promise<Omit<UserResponseDto, 'role'> | null> {
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

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.usersRepository.create(user);
      return this.usersRepository.save(newUser);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error creating User');
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
