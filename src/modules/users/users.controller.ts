import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserResponseDto } from './dtos/user-response.dto';
import type { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<UserResponseDto[]> {
    return this.usersService.getAllUsers(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getById(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() userInfo: CreateUserDto) {
    return this.usersService.updateUser(id, userInfo);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
