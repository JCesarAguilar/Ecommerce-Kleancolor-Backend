import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserResponseDto } from './dto/user-response.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): UserResponseDto[] {
    return this.usersService.getAllUsers(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getById(@Param('id', ParseIntPipe) id: number): UserResponseDto | null {
    return this.usersService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
