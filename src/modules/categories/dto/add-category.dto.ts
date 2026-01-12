import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      'El nombre de la catergoría, debe tener como mínimo 3 caracteres y como máximo 80 caracteres',
    example: 'Teléfonos',
  })
  name: string;
}
