import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsUrl()
  imgUrl: string;
}
