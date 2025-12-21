import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Mouse',
      description: 'Mouse gamer',
      price: 25,
      stock: true,
      imgUrl: 'https://example.com/mouse.png',
    },
    {
      id: 2,
      name: 'Keyboard',
      description: 'Teclado mecánico',
      price: 80,
      stock: false,
      imgUrl: 'https://example.com/keyboard.png',
    },
  ];

  getProducts(page = 1, limit = 5): Product[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.products.slice(start, end);
  }

  getProductById(id: number): Product | null {
    const product = this.products.find((product) => product.id === id);
    if (!product) return null;

    const { id: productId, name, description, price, stock, imgUrl } = product;
    return { id: productId, name, description, price, stock, imgUrl };
  }

  createProduct(product: CreateProductDto): number {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return id;
  }

  updateProduct(id: number, data: UpdateProductDto): number | undefined {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return undefined;

    this.products[index] = { ...this.products[index], ...data };
    return id;
  }

  deleteProduct(id: number): number | undefined {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return undefined;

    this.products.splice(index, 1);
    return id;
  }
}
