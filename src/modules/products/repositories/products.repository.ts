import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

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

  findAll(): Product[] {
    return this.products;
  }
}
