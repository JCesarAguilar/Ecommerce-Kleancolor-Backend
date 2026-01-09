import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserRepository, UsersService, AuthService],
})
export class AuthModule {}
