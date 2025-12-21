import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [];

  getProducts(page = 1, limit = 5): Product[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.products.slice(start, end);
  }

  getProductById(id: string): Product | null {
    const product = this.products.find((product) => product.id === id);
    if (!product) return null;

    return product;
  }

  createProduct(product: CreateProductDto): string {
    const id = uuid();
    this.products = [...this.products, { id, ...product }];
    return id;
  }

  updateProduct(id: string, data: UpdateProductDto): string | undefined {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return undefined;

    this.products[index] = { ...this.products[index], ...data };
    return id;
  }

  deleteProduct(id: string): string | undefined {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return undefined;

    this.products.splice(index, 1);
    return id;
  }
}
