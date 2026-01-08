import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import type { CreateProductDto } from './dtos/create-product.dto';
import type { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async getAllProducts(page?: number, limit?: number): Promise<Product[]> {
    return this.productRepository.getAllProducts(page, limit);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.getProductById(id);
  }

  async createProduct(product: CreateProductDto): Promise<string> {
    return this.productRepository.createProduct(product);
  }

  async updateProduct(
    id: string,
    product: UpdateProductDto,
  ): Promise<string | undefined> {
    return this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<string | undefined> {
    return this.productRepository.deleteProduct(id);
  }

  async updateImgUrl(productId: string, imgUrl: string) {
    return this.productRepository.updateImgUrl(productId, imgUrl);
  }
}
