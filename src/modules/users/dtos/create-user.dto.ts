import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Matches,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      'El nombre del usuario, debe tener como mínimo 3 caracteres y como máximo 80 caracteres',
    example: 'Julio César',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'El email debe ser un mail válido',
    example: 'admin@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
  )
  @ApiProperty({
    description:
      'El contraseña debe  tener mínimo 8 caracteres  y máximo 15, además debe ser robusta.',
    example: 'Pas$word1',
  })
  password: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Debe ser un número.',
    example: '9751132908',
  })
  phone?: number;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  @ApiProperty({
    description: 'El país es un string de mínimo 4 y máximo 20 caracteres.',
    example: 'Perú',
  })
  country?: string;

  @IsOptional()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      'La dirección es un string de mínimo 3 y máximo 80 caracteres.',
    example: 'Av Desconocida sin numero',
  })
  address?: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  @ApiProperty({
    description: 'La ciudad es un string de mínimo 3 y máximo 20 caracteres.',
    example: 'Lima',
  })
  city?: string;
}
