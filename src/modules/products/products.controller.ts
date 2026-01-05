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
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import type { CreateProductDto } from './dtos/create-product.dto';
import type { UpdateProductDto } from './dtos/update-product.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Product[]> {
    return this.productsService.getAllProducts(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put('id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete('id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
