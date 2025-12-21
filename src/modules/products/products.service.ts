import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { Product } from './entities/product.entity';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  getProducts(page?: number, limit?: number): Product[] {
    return this.productRepository.getProducts(page, limit);
  }

  getProductById(id: string): Product | null {
    return this.productRepository.getProductById(id);
  }

  createProduct(product: CreateProductDto) {
    return this.productRepository.createProduct(product);
  }

  updateProduct(id: string, product: UpdateProductDto) {
    return this.productRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
