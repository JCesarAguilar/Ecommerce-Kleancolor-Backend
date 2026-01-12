import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @ApiProperty({
    description:
      'El nombre del usuario, debe tener como mínimo 3 caracteres y como máximo 80 caracteres',
    example: 'Iphone X',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  @ApiProperty({
    description:
      'La descripciôn del producto, debe tener como mínimo 10 caracteres y como máximo 200 caracteres',
    example: 'Iphne X es un producto de tales caracteríticas',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'El precio debe ser un número ',
    example: '3000',
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'El stock debe ser un número ',
    example: '50',
  })
  stock: number;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'La imagen debe ser un url válido ',
    example: 'https://urldeimagen.jpeg',
  })
  imgUrl: string;
}
