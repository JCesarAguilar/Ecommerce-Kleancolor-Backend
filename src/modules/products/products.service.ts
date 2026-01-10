import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async getAllProducts(page?: number, limit?: number): Promise<Product[]> {
    return this.productRepository.getAllProducts(page, limit);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.getProductById(id);
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(product);
  }

  async updateProduct(
    id: string,
    product: UpdateProductDto,
  ): Promise<{ statusCode: number; message: string }> {
    const result = await this.productRepository.updateProduct(id, product);

    if (!result.affected && result.affected === 0)
      throw new NotFoundException(`Product with ${id} not found.`);

    return { statusCode: 200, message: `Product with id: ${id} updated` };
  }

  async deleteProduct(
    id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const result = await this.productRepository.deleteProduct(id);

    if (!result.affected && result.affected === 0)
      throw new NotFoundException(`Product with ${id} not found`);

    return { statusCode: 200, message: `Product with id: ${id} deleted` };
  }

  async updateImgUrl(productId: string, imgUrl: string) {
    return this.productRepository.updateImgUrl(productId, imgUrl);
  }
}
