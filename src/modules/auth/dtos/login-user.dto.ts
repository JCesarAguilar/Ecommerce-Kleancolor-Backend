import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
