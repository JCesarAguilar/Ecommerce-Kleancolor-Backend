import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from '../users/repositories/users.repository';

@Module({
  controllers: [AuthController],
  providers: [UserRepository],
})
export class AuthModule {}
