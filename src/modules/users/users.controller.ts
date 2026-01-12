import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Role } from '../auth/enums/roles.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @HttpCode(200)
  @Auth(Role.ADMIN)
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<UserResponseDto[]> {
    return this.usersService.getAllUsers(page, limit);
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserResponseDto | null> {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() userInfo: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, userInfo);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.usersService.deleteUser(id);
  }
}
