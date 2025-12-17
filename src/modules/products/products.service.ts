import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  getProducts(): Product[] {
    return this.productRepository.findAll();
  }
}
