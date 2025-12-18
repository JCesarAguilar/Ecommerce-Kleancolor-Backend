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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  getAll(): UserResponseDto[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', ParseIntPipe) id: number): UserResponseDto | null {
    return this.usersService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<User>,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
