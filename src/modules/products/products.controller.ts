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
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Product[] {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', ParseIntPipe) id: number): Product | null {
    return this.productsService.getProductById(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put('id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete('id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
